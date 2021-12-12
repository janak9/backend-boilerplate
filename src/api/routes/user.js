import express from 'express';
import is_verified from '../../middleware/is_verified';
import user from "../controllers/user";
import allowedTo from "../../middleware/allowed_to";
import { ADMIN, MONITOR } from '../../helper/constants';

const router = express.Router();

router.get("/", user.fetch);
router.post("/send_otp", user.send_otp);
router.post("/verify_otp", user.verify_otp);

router.use(is_verified);
router.put("/", user.edit);

router.get("/by_id/:userId", allowedTo([ADMIN, MONITOR]), user.fetch_user_by_id);
router.put("/edit_user/:userId", allowedTo([ADMIN]), user.edit_by_admin);

module.exports = router;
