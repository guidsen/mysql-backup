const AWS = require('aws-sdk');
const config = require('../../config');

module.exports = () => {
  AWS.config.setPromisesDependency(Promise);

  return new AWS.S3({
    accessKeyId: config.s3.key,
    secretAccessKey: config.s3.secret,
    region: config.s3.region,
  });
};
