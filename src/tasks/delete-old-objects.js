const moment = require('moment');
const createS3Client = require('../utils/s3-client');

module.exports = (config) => {
  const s3Client = createS3Client();

  s3Client.listObjects({
    Bucket: config.s3.bucket,
    Prefix: config.backupDirectory,
  }, (err, data) => {
    if (err) console.log(err);

    const objectsToDelete = data.Contents.filter((object) => {
      const offsetInDays = moment().diff(moment(object.LastModified), 'days');

      return offsetInDays >= 1;
    });

    if (objectsToDelete.length === 0) {
      console.log('No objects deleted');
      return;
    }

    s3Client.deleteObjects({
      Bucket: config.s3.bucket,
      Delete: {
        Objects: objectsToDelete.map((object) => ({ Key: object.Key })),
      },
    }, (err, data) => {
      if (err) throw err;

      if (data.Deleted && data.Deleted.length) {
        console.log(`${data.Deleted.length} objects deleted`);
      }
    });
  });
};
