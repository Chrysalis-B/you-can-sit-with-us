export const mailingApi = {
    sendInitialCampaignMail: async (data) => {
        try {
            console.log("hello?");
            const response = await (() => new Promise (resolve)); 
            console.log("data sent to email provider", response);
        }
        catch {
            console.error;
        }
    }
} 