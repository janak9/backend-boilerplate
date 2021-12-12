
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from "swagger-ui-express";
import apiRoutes from './api/index';
import gqlRoutes from './gql/index';
import { logging } from './helper/logging';
import { MaxFileSizeMB } from './helper/constants';
import io from './socket/io';

const app = express();

exports.start_server = async () => {
  try {
    morgan.token('body', (req, res) => JSON.stringify(req.body));
    app.use(morgan('[:date[clf]] :remote-addr - :method :url :status :response-time ms - :body'));

    app.use(express.json({ limit: MaxFileSizeMB }));
    app.use(express.urlencoded({ limit: MaxFileSizeMB, extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(cors());

    // swagger configurations
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require('./swagger.js'), {swaggerOptions: {
      authAction :{ authorization: {name: "authorization", schema: {type: "apiKey", in: "header", name: "authorization", description: ""}, value: ""} }
    }}));

    app.use('/api', apiRoutes);
    app.use('/gql', gqlRoutes);

    app.get('/health', function (req, res) {
      return res.send('Ok, Working fine.');
    });
    
    const server = app.listen(process.env.PORT || 5000, function (error) {
      if (error) {
        logging.error('An error occured while staring node app', error);
        return;
      }
      logging.info('Server started on ' + process.env.SITE_URL);
    });

    io.attach(server);

  } catch (error) {
    logging.error(`Error Occured! - start_server - ${error}`);
    logging.error(`Error stack - start_server - ${error.stack}`);
  }
};
