module.exports = {
  backupDirectory: 'my_mysql_backups',
  retentionInDays: 7,
  s3: {
    key: '[S3 Access Key]',
    secret: '[S3 Secret Key]',
    region: '[S3 Region]',
    bucket: '[S3 Bucket]'
  },
  connection: {
    database: 'my_database',
    user: 'root',
    password: '1337',
  },
};
