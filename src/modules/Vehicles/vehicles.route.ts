import { Router } from "express";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";
import { vehiclesController } from "./vehicles.controller";

const router = Router();

router.post('/', auth(Roles.admin), vehiclesController.createVehicles);
router.get('/', auth(Roles.admin, Roles.customer), vehiclesController.getAllVehicles);
router.get('/:vehicleId', auth(Roles.admin, Roles.customer), vehiclesController.getSpecificVehicle);
router.put('/:vehicleId', auth(Roles.admin) , vehiclesController.updateVehicles);





export const VehiclesRoute = router; // <-- fix the typo