import express from 'express';
import auth from "../middleware/auth";
import is_verified from '../middleware/is_verified';

const apiRouter = express.Router();

apiRouter.use('/auth', require('./routes/auth'));

apiRouter.use(auth);
apiRouter.use('/user', require('./routes/user'));

apiRouter.use(is_verified);
apiRouter.use('/upload', require('./routes/upload'));

module.exports = apiRouter;
