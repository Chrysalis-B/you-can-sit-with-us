import express from 'express';
import { MongoClient } from 'mongodb';

const port = 3001;
const app = express();
const databaseUrl = 'mongodb://localhost:27017/groupDiscountManager';

MongoClient.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    app.locals.db = client.db('groupDiscountManager');

  })
  .catch(() => console.error('Failed to connect to the database')
);



app.get("/", (req, res) => res.send('Hello World'));

app.listen(port, () => console.log('App is listening on port ' + port));

const larp = async () => {
  return 0;
};
