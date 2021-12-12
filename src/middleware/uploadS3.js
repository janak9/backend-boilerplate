import fs from "fs";
import multer from "multer";
import { S3 } from "../helper/aws";
import {
  MaxFileSizeKB,
  AllowedImageTypes,
  AllowedImageExts,
  AllowedVideoTypes,
  AllowedVideoExts,
} from "../helper/constants";
import { RequestInputError, ValidationError } from "../helper/errors";
import { logging } from "../helper/logging";
import { ErrorResponseHandler } from "../helper/response";

const upload = multer({
  dest: "src/temp/",
  limits: {
    fieldSize: MaxFileSizeKB,
  },
});

const validator = (file, method = "single", optional = true) => {
  return async function (req, res, next) {
    try {
      if (method === "single") {
        upload.single(file)(req, res, function (err) {
          try {
            if (!req.file && !optional) {
              throw new ValidationError("Please select an file to upload");
            } else if (err) {
              throw new ValidationError(err.message);
            } else if (
              file === "image" &&
              !AllowedImageTypes.includes(req.file.mimetype)
            ) {
              throw new ValidationError(`Only ${AllowedImageExts.join(", ")} formats are allowed!`);
            } else if (
              file === "video" &&
              !AllowedVideoTypes.includes(req.file.mimetype)
            ) {
              throw new ValidationError(`Only ${AllowedVideoExts.join(", ")} formats are allowed!`);
            }
            return next();
          } catch (error) {
            return ErrorResponseHandler(res, error, `multer upload - ${file} - ${method} - ${optional}`);
          }
        });
      } else {
        logging.error(`Error occured: multer upload - Invalid method - ${file} - ${method} - ${optional}`);
        throw new RequestInputError(`multer upload - Invalid method - ${file} - ${method} - ${optional}`);
      }
    } catch (error) {
      return ErrorResponseHandler(res, error, `multer upload - ${file} - ${method} - ${optional}`);
    }
  };
};

const uploadS3 = (file, method, optional) => {
  return [
    validator(file, method, optional),
    async (req, res, next) => {
      try {
        const uploaded_file = req.file;

        let file_path = `${process.env.AWS_S3_FOLDER}/`;
        file_path += file === "video" ? "videos/" : "images/";
        const extension = uploaded_file.originalname.slice((Math.max(0, uploaded_file.originalname.lastIndexOf(".")) || Infinity) + 1);
        const file_name = `${new Date().getTime().toString()}.${extension || "jpg"}`;
        file_path += `${req.user._id}/${file_name}`;

        const params = {
          ACL: "public-read",
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: fs.createReadStream(uploaded_file.path),
          Key: file_path,
          ContentType: uploaded_file.mimetype,
        };

        S3.upload(params, (err, data) => {
          try {
            if (err) {
              logging.error(`Error occured: while trying to upload to S3 bucket - ${err.stack}`);
              throw new ValidationError("Error occured while trying to upload file, Please try again");
            }
            if (data) {
              fs.unlinkSync(uploaded_file.path); // clear temp folder
              req.file.cloudFrontLocationUrl = process.env.AWS_CLOUD_FRONT_URL
                ? process.env.AWS_CLOUD_FRONT_URL + "/" + data.Key.replace(`${process.env.AWS_S3_FOLDER}/`, "")
                : data.Location;
              req.file.s3LocationUrl = data.Location;
            }
            return next();
          } catch (error) {
            return ErrorResponseHandler(res, error, `upload to S3`);
          }
        });
      } catch (error) {
        return ErrorResponseHandler(res, error, `upload to S3`);
      }
    },
  ];
};

export default uploadS3;
