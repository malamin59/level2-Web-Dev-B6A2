import { Schema, model } from "mongoose";

export interface IBooking {
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: "booked" | "cancelled" | "returned";
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: { type: String, required: true },
    vehicleId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["booked", "cancelled", "returned"],
      default: "booked",
    },
  },
  { timestamps: true }
);


export interface IVehicle {
  name: string;
  brand: string;
  dailyRate: number;
  status: "available" | "booked";
}

const vehicleSchema = new Schema<IVehicle>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    dailyRate: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  { timestamps: true }
);

export const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);

export const Booking = model<IBooking>("Booking", bookingSchema);