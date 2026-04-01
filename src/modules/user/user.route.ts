import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";

const router = Router();

// Public route
router.post("/", userController.createUser);

// Protected routes
router.get("/", auth(Roles.admin), userController.getAllUser);
router.get("/singleUser", auth(Roles.customer), userController.getSingleUser);
router.get(
  "/singleUserById/:id",
  auth(Roles.customer),
  userController.getSingleUserById,
);      
router.put(
  "/:userId",
  auth(Roles.admin, Roles.customer),
  userController.updateUser,
);

export const userRoute = router;
