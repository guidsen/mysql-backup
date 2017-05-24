const spawn = require('child_process').spawn;
const moment = require('moment');
const streamToS3 = require('../utils/stream-to-s3');

module.exports = (config) => {
  const dumpProcess = spawn('mysqldump', [
    '--single-transaction',
    '--quick',
    '-h', config.connection.host,
    '-u', config.connection.user,
    `-p${config.connection.password}`,
    config.connection.database,
  ]);

  const fileName = 'mysql-backup-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.sql';

  streamToS3(`${config.backupDirectory}/${fileName}`, dumpProcess.stdout);
};
