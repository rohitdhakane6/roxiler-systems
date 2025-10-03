import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { requireAuth } from "@/middleware/auth.middleware";

export const router: Router = Router();

// All user routes require authentication and USER role
router.use(requireAuth(["USER"]));

// Stores
router.get("/stores", userController.getAllStores);

// Ratings
router.put("/ratings/:storeId", userController.updateRating);
