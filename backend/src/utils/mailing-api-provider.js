export const mailingApi = {
  sendInitialCampaignMail: async data => {
    try {
      const response = await (data => new Promise(resolve));
      console.log("data about Campaing sent to email provider", response);
    } catch (err) {
      console.error(err);
    }
  },
  addStudentToEmailList: async data => {
    try {
      const response = await (data => new Promise(resolve));
      console.log("data about new Student sent to email provider", response);
    } catch (err) {
      console.error(err);
    }
  },
  sendReminder: async campaignId => {
    try {
      const response = await (campaignId => new Promise(resolve));
      console.log("data about Reminder sent to email provider", response);
    } catch (err) {
      console.error(err);
    }
  }
};
