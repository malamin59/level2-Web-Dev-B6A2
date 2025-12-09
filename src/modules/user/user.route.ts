import {Router } from "express";
import { userController } from "./user.controller";
import verify from "../../middleware/verify";

const router = Router()
router.post('/' , userController.createUser )
router.get('/',userController.getAllUser )


export const userRoute = router