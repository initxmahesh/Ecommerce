import { Router } from "express";
import {
  register,
  login,
  logout,
  refresh,
  verifyEmail,
  resendVerification,
  getMe,
} from "../controllers/auth/auth.controller.js";
import { authenticate, loadUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/verify-email", verifyEmail);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.get("/me", authenticate, loadUser, getMe);

export default router;
