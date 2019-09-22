import cron from "node-cron";
import { mongoAdapter} from "./mongo-adapter";
import { mailingApi } from "./mailing-api-provider";

// The cron scheduler runs once a day, for more info see https://www.npmjs.com/package/node-cron
export const scheduler = (db) => {
  cron.schedule("0 0 0 * * *", () => {
    const collectionName = "campaigns";
    mongoAdapter
      .findEndedCampaigs(db, collectionName)
      .then(result => {
        mailingApi.sendCampaignEndedInfo(result);
      })
      .catch(err => {
        console.error(err);
      });
  });
};
