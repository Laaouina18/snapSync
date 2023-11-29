import express from "express";
import PostRoutes from "../routes/PostRoutes.js";
import AuthRoutes from "../routes/AuthRoutes.js";
const router = express.Router();

router.use("/post", PostRoutes);
router.use("/auth", AuthRoutes);

export default router;
