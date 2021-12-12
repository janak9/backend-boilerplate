
// set basedir
global.__basedir = __dirname;

// import configs
require('./config/environment');
require('./config/mongoose');

// start express api server
const { start_server } = require('./server');
start_server();

