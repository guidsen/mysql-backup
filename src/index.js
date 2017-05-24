const Joi = require('joi');

const config = Joi.attempt(require('../config'), {
  backupDirectory: Joi.required(),
  retentionInDays: Joi.number().default(3),
  s3: {
    key: Joi.required(),
    secret: Joi.required(),
    region: Joi.required(),
    bucket: Joi.required(),
  },
  connection: {
    database: Joi.required(),
    user: Joi.required(),
    password: Joi.required(),
  }
});

require('./tasks/delete-old-objects')(config);
require('./tasks/dump-sql-file')(config);
