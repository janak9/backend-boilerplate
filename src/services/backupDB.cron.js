import cron from 'node-cron';
import fs from "fs";
import path from "path";
import shell from 'shelljs';
import { get_files_recursively, remove_multiple_s3_objects, S3 } from '../helper/aws';
import { logging } from '../helper/logging';
import { MAX_BACKUP_DAY_LIMIT } from '../helper/constants';

let backupDBCron;

const delete_old_backup = (now) => {
  try {
    logging.db('delete old DB backup started');
    now = new Date(now);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: process.env.AWS_S3_BACKUP_FOLDER
    };

    const delete_old_backup_cb = (files) => {
      const min_backup_date = new Date(now.setDate(now.getDate() - MAX_BACKUP_DAY_LIMIT));
      const old_backup_files = [];
      files.forEach((file) => {
        if (new Date(file.LastModified) < min_backup_date) {
          old_backup_files.push({ Key: file.Key });
        }
      });
      remove_multiple_s3_objects(old_backup_files).then((response) => {
        logging.db(`deleted backup files: ${JSON.stringify(response)}`);
        logging.db('delete old DB backup finished');
      });
    };
    get_files_recursively(params, delete_old_backup_cb);
  } catch (error) {
    logging.error(`Error occured: while trying to delete old DB backup from S3 bucket - ${error.stack}`);
  }
};

export const start = () => {
  const backupFolderPath = path.join(__basedir, "backup");
  if (!fs.existsSync(backupFolderPath)) {
    fs.mkdirSync(backupFolderPath, { recursive: true });
  }

  backupDBCron = cron.schedule('59 23 * * *', () => {
    logging.db('DB backup started');
    const now = new Date();
    const fileName = `${now.toISOString()}.archive`;
    const backupFilePath = `${backupFolderPath}/${now.toISOString()}.archive`;
    let mongoDBURI = new URL(process.env.MONGODB);
    mongoDBURI = mongoDBURI.href.replace(mongoDBURI.search, "");
    const mongodumpCmd = `mongodump --uri=${mongoDBURI} --archive=${backupFilePath}`;
    logging.db(`mongodump started...`);

    shell.exec(mongodumpCmd, { silent: true },  function(code, stdout, stderr) {
      if (code !== 0) {
        logging.error("Error occured while exporting data from DB");
        logging.error(`stdout: ${stdout}`);
        logging.error(`stderr: ${stderr}`);
      }
      else {
        logging.db('mongodump successfully completed');
        let filePath = `${process.env.AWS_S3_BACKUP_FOLDER}/${fileName}`;
        logging.db(`saving DB to S3 ${filePath}`);

        const params = {
          ACL: "public-read",
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: fs.createReadStream(backupFilePath),
          Key: filePath,
        };

        S3.upload(params, (err, data) => {
          try {
            if (err) {
              logging.error(`Error occured: while trying to upload DB backup to S3 bucket - ${err.stack}`);
            }
            if (data) {
              fs.unlinkSync(backupFilePath); // clear backup folder
              logging.db('DB backup successfully saved');
              delete_old_backup(now);
            }
          } catch (error) {
            logging.error(`Error occured: while trying to upload DB backup to S3 bucket - ${err.stack}`);
          }
        });
      }
    });
  },
  {
    scheduled: false,
  });

  backupDBCron.start();
};
