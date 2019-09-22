export const mongoAdapter = {
  registerCampaign: (db, collectionName, values) => {
    const collection = db.collection(collectionName);
    return collection
      .insertOne(values)
      .then(result => {
        return result.ops[0];
      })
      .catch(err => console.error(err));
  },
  getCampaign: (db, collectionName, id) => {
    const collection = db.collection(collectionName);
    return collection
      .findOne({ campaignId: id })
      .then(result => {
        return result;
      })
      .catch(err => console.error(err));
  },
  updateCampaign: (db, collectionName, values) => {
    const collection = db.collection(collectionName);
    return collection
      .findOneAndUpdate(
        { campaignId: values.campaignId },
        {
          $inc: { studentsTotal: 1 },
          $push: { students: values.studentId },
        },
        { returnOriginal: false }
      )
      .then(result => {
        return result;
      })
      .catch(err => console.error(err));
  },
  addStudent: (db, collectionName, values) => {
    const collection = db.collection(collectionName);
    return collection
      .insertOne(values)
      .then(result => {
        return result.ops[0];
      })
      .catch(err => console.error(err));
  }
};
