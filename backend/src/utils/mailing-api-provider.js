export const mailingApi = {
  sendInitialCampaignMail: async data => {
    try {
      const response = await (data => new Promise(resolve));
      console.log("data about Campaign sent to email provider");
    } catch (err) {
      console.error(err);
    }
  },
  addStudentToEmailList: async data => {
    try {
      const response = await (data => new Promise(resolve));
      console.log("data about new Student sent to email provider");
    } catch (err) {
      console.error(err);
    }
  },
  sendReminder: async campaignId => {
    try {
      const response = await (campaignId => new Promise(resolve));
      console.log("data about Reminder sent to email provider");
    } catch (err) {
      console.error(err);
    }
  },
  sendCampaignEndedInfo: async data => {
    try {
      const response = await (data => newPromise(resolve));
      console.log("Data about ended campaign sent to email provider");
    } catch (err) {
      console.error(err);
    }
  }
};
