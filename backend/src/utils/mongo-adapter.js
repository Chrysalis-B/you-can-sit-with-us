export const mongoAdapter = {
    registerCampaign: (db, collectionName, form) => {
        const collection = db.collection(collectionName);
        return collection
          .insertOne(form)
          .then(result => {
            return result.ops[0];
          })
          .catch(console.error);
    },
    getCampaign: (db, collectionName, id) => {
      const collection = db.collection(collectionName);
      return collection.findOne({campaignId : id}).then(result => {
        return result;
      }).catch(console.error);
    }    
} 
