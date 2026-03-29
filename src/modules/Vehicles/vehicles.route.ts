import { Router } from "express";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";
import { vehiclesController } from "./vehicles.controller";

const router = Router();

router.post('/', auth(Roles.admin), vehiclesController.createVehicles);

export const VehiclesRoute = router; // <-- fix the typo