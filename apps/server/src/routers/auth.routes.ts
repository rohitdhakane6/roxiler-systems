import { Router } from "express";
import * as authController from "@/controllers/auth.controller";
import { requireAuth } from "@/middleware/auth.middleware";

export const router: Router = Router();

// --- Signup ---
router.post("/signup", authController.signup);

// --- Login ---
router.post("/login", authController.login);

// --- Update Password ---
router.post(
  "/update-password",
  requireAuth(["USER", "STORE_OWNER", "ADMIN"]),
  authController.updatePassword
);
