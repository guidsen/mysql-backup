const moment = require('moment');
const createS3Client = require('./s3-client');
const config = require('../../config');

module.exports = (destination, fileStream) => {
  const params = {
    Bucket: config.s3.bucket,
    Key: destination,
    Body: fileStream,
  };

  createS3Client().upload(params).promise()
    .then((data) => {
      console.log('Amazon S3 response', { response: data });
    })
    .catch((err) => {
      console.error('Error while uploading to Amazon S3', { err });
    });
};
