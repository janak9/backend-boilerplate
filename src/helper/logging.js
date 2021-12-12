import chalk from 'chalk';
import fs from 'fs';
import util from 'util';
import path from 'path';
const logs_folder_path = path.join(__basedir, 'public', 'logs');
if (!fs.existsSync(logs_folder_path)) {
    fs.mkdirSync(logs_folder_path, { recursive: true });
}
const error_log_file = fs.createWriteStream(path.join(logs_folder_path, 'error.log'), { flags : 'a' });

const info = chalk.bold.blue;
const debug = chalk.green;
const db = chalk.cyan;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

const logging = {
    log: (...messages) => console.log(...messages),
    info: (...messages) => console.log(info(...messages)),
    debug: (...messages) => console.log(debug(...messages)),
    db: (...messages) => console.log(db(...messages)),
    error: (...messages) => {
        error_log_file.write(util.format(new Date()) + ' ');
        error_log_file.write(util.format(...messages) + '\n');
        console.log(error(...messages))
    },
    warning: (...messages) => {
        error_log_file.write(util.format(new Date()) + ' ');
        error_log_file.write(util.format(...messages) + '\n');
        console.log(warning(...messages));
    }
}

export {
    chalk,
    logging
}