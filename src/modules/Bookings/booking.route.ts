import { Router } from "express";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";
import { bookingController } from "./booking.controller";

const router = Router();

// CREATE
router.post(
  "/",
  auth(Roles.admin, Roles.customer),
  bookingController.createBooking
);

// GET
router.get(
  "/",
  auth(Roles.admin, Roles.customer),
  bookingController.getBookings
);

// UPDATE (cancel / return)
router.put(
  "/:bookingId",
  auth(Roles.admin, Roles.customer),
  bookingController.updateBooking
);

export const bookingRoutes = router;