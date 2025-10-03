import { Router } from "express";
import { router as authRoutes } from "./auth.routes";
import { router as adminRoutes } from "./admin.routes";
import { router as storeRoutes } from "./store.routes";
import { router as userRoutes } from "./user.routes";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/store", storeRoutes);
router.use("/user", userRoutes);

export default router;
