import {Router } from "express";
import { authController } from "./auth.controller";
import { userController } from "../user/user.controller";


const router = Router()
router.post("/signup", userController.createUser);
router.post('/signin', authController.loginUser)
export const    authRoute = router