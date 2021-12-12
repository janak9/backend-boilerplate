import express from 'express';
import public_schema from "./public_schema";
import private_schema from "./private_schema";

const apiRouter = express.Router();
apiRouter.use("/public", public_schema);
apiRouter.use("/private", private_schema);
  
module.exports = apiRouter;
