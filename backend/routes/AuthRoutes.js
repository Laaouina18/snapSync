import { Router } from "express";
import { CreateUser, Login } from "../controllers/Auth/AuthController.js";

const router = Router();

/**
 * @POST
 * @desc // create a new User
 * @access User
 */
router.post("/inscription", CreateUser);
router.post("/login", Login);
export default router;