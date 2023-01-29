import { Router } from "express";
import { UserController } from "./users.controller.js";
import authenticate from "../middleware/authMiddleware.js";

const userRoutes = Router();

userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);


export default userRoutes;