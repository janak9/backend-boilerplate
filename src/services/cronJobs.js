import * as backupDB from './backupDB.cron.js';

exports.cronJobs = () => {
  try {
    const start = () => {
      if (process.env.NODE_ENV === 'production') {
        backupDB.start();
      }
    };

    return {
      start,
    }

  } catch (error) {
    logging.error(`Error Occured! - cronJobs - ${error}`);
    logging.error(`Error stack - cronJobs - ${error.stack}`);
  }
};
