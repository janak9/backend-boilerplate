import express from 'express';
import uploadS3 from "../../middleware/uploadS3";
import upload from "../controllers/upload";

const router = express.Router();

router.post("/image", uploadS3('image', 'single', false), upload.upload_image);
router.post("/video", uploadS3('video', 'single', false), upload.upload_video);

module.exports = router;
