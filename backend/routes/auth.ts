import express = require("express");
import {
  CheckResetToken,
  ForgotPassword,
  Register,
  ResetPassword,
  Verify,
  getUserInfoFromToken,
  login,
  logout,
} from "../controllers/AuthController";
import { verifyUser } from "../middleware/verifyToken";

const router = express.Router();

router.post("/login", login);
router.post("/register", Register);
router.get("/logout", logout);
router.get("/verify/:emailToken", Verify);
router.post("/changepassword/:emailToken", ResetPassword);
router.post("/forgotpassword", ForgotPassword);
router.get("/session", verifyUser, getUserInfoFromToken);
router.get("/checkToken/:emailToken", CheckResetToken);
export default router;
