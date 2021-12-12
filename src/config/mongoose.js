import mongoose from "mongoose";
import { logging } from "../helper/logging";

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
  logger: logging.db,
});

mongoose.connection.on("connected", function () {
  logging.db("connection establish successfully");
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  logging.error("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logging.db("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logging.db(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
