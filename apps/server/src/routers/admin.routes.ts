import { Router } from "express";
import * as adminController from "@/controllers/admin.controller";
import { requireAuth } from "@/middleware/auth.middleware";
export const router: Router = Router();

router.use(requireAuth(["ADMIN"]));

// Admin dashboard
router.get("/dashboard", adminController.getDashboard);

// Users management
router.get("/users", adminController.getAllUsers);
router.post("/users", adminController.createUser);

// Stores management
router.get("/stores", adminController.getAllStores);
router.post("/stores", adminController.createStore);
