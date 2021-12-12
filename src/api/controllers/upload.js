import { ValidationError } from "../../helper/errors";
import { ErrorResponseHandler } from "../../helper/response";

const upload_image = async (req, res) => {
  try {
    if (!req.file.s3LocationUrl) throw new ValidationError("Image not uploaded");

    return res.json({ 
      success: true, 
      url: req.file.cloudFrontLocationUrl,
      s3_url: req.file.s3LocationUrl,
    });
  } catch (error) {
    return ErrorResponseHandler(res, error, "upload image");
  }
};

const upload_video = async (req, res) => {
  try {
    if (!req.file.s3LocationUrl) throw new ValidationError("video not uploaded");

    return res.json({ 
      success: true,
      url: req.file.cloudFrontLocationUrl,
      s3_url: req.file.s3LocationUrl,
    });
  } catch (error) {
    return ErrorResponseHandler(res, error, "upload video");
  }
};

export default {
  upload_image,
  upload_video,
};
