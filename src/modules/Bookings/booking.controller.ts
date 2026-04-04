import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const payload = {
      ...req.body,
      userId: user!.userId,
    };

    const result = await bookingService.createBooking(payload);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getBookings(req.user);

    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;

    const result = await bookingService.updateBooking(
      bookingId as string,
      req.user
    );

    res.json({
      success: true,
      message: "Booking updated",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  updateBooking,
};