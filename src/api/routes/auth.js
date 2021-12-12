import express from 'express';
import authentication from "../../middleware/auth";
import auth from "../controllers/auth";

const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);

router.use(authentication);
router.post("/logout_user", auth.logout_user);


module.exports = router;
