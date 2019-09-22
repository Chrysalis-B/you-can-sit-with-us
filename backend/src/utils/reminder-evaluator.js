import { mailingApi } from "./mailing-api-provider";

export const reminderEvaluator = {
    evaluate(data) {
        data.discounts.map( discount => {
            if(discount.minPeople - data.studentsTotal === 5) {
                mailingApi.sendReminder(data.campaignId);
            }
        })
    }
}