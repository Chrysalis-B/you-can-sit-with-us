import { mailingApi } from "./mailing-api-provider";

export const reminderEvaluator = {
    evaluate(data) {
        console.log(data.studentsTotal);
        data.discounts.map( discount => {
            if(discount.minPeople - data.studentsTotal === 5) {
                mailingApi.sendReminder(data.campaignId);
            }
        })
    }
}