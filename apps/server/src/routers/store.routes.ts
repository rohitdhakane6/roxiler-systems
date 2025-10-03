import { Router } from "express";
import * as storeController from "@/controllers/storeOwner.controller";
import { requireAuth } from "@/middleware/auth.middleware";

export const router: Router = Router();

router.use(requireAuth(["STORE_OWNER"]));

router.get("/", storeController.getMyStore);
router.post("/", storeController.createStore);
router.get("/ratings", storeController.getMyStoreRatings);
