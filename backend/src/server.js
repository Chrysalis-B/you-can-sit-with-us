import express from "express";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import nanoid from "nanoid";
import universities from "../data/universities.json";
import { scheduler } from "./utils/cron-scheduler";
import { mongoAdapter } from "./utils/mongo-adapter";
import { mailingApi } from "./utils/mailing-api-provider";
import { urlProvider } from "./utils/url-provider";
import { reminderEvaluator } from "./utils/reminder-evaluator";

const port = 3001;
const app = express();
const databaseUrl = "mongodb://localhost:27017/groupDiscountManager";

const getCampaignSchema = values => {
  return {
    campaignId: nanoid(8),
    universityId: values.universityId,
    startDate: Date.parse(values.startDate),
    endDate: Date.parse(values.endDate),
    discounts: values.discounts,
    students: [],
    studentsTotal: 0
  };
};

const getStudentSchema = values => {
  return {
    studentId: nanoid(8),
    campaignId: values.campaignId,
    name: values.name,
    email: values.email
  };
};

MongoClient.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(client => {
    app.locals.db = client.db("groupDiscountManager");
    scheduler(client.db("groupDiscountManager"));
  })
  .catch(() => console.error("Failed to connect to the database"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("public"));

app.use(bodyParser.json());

app.get("/", (req, res) => res.redirect("/campaigns"));

app.get("/campaigns/create", (req, res) => {
  res.json(universities);
});

app.post("/campaigns/create", (req, res) => {
  const { db } = req.app.locals;
  const collectionName = "campaigns";
  const data = getCampaignSchema(req.body);
  mongoAdapter
    .registerCampaign(db, collectionName, data)
    .then(data => {
      mailingApi.sendInitialCampaignMail(data);
      const campaignUrl = urlProvider.generateCampaignUrl(data.campaignId);
      return res.json({
        campaignUrl: campaignUrl
      });
    })
    .catch(err => {
      console.error(err);
    });
});

app.get("/campaigns", (req, res) => {
  const { db } = req.app.locals;
  const collectionName = "campaigns";
  mongoAdapter
    .getAllCampaigns(db, collectionName)
    .then(results => {
      const data = results.map(result => {
        const university = universities.find(
          university => university.id === result.universityId
        );
        return { universityName: university ? university.name : "", ...result };
      });
      res.json(data);
    })
    .catch(err => {
      console.error(err);
    });
});

app.get("/campaigns/:id", (req, res) => {
  const id = req.params.id;
  const { db } = req.app.locals;
  const collectionName = "campaigns";
  mongoAdapter
    .getCampaign(db, collectionName, id)
    .then(result => {
      const university = universities.find(
        university => university.id === result.universityId
      );
      const response = {
        universityName: university ? university.name : "",
        ...result
      };
      res.json(response);
    })
    .catch(err => {
      console.error(err);
    });
});

app.post("/campaigns/:id", (req, res) => {
  const id = req.params.id;
  const { db } = req.app.locals;
  const collectionName = "students";
  const data = getStudentSchema({ ...req.body, campaignId: id });
  mongoAdapter
    .addStudent(db, collectionName, data)
    .then(data => {
      mailingApi.addStudentToEmailList(data);
      mongoAdapter
        .updateCampaign(db, "campaigns", data)
        .then(result => {
          reminderEvaluator.evaluate(result.value);
          res.json({
            success: true
          });
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

app.listen(port, () => console.log("App is listening on port " + port));

const larp = async () => {
  return 0;
};
