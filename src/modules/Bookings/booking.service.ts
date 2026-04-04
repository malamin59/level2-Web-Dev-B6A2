
import { Booking, Vehicle } from "./booking.model";

const createBooking = async (payload: any) => {
  const { vehicleId, startDate, endDate, userId } = payload;

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) throw new Error("Vehicle not found");

  if (vehicle.status !== "available") {
    throw new Error("Vehicle not available");
  }

  // duration in days
  const start = new Date(startDate);
  const end = new Date(endDate);

  const duration =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;

  const totalPrice = duration * vehicle.dailyRate;

  const booking = await Booking.create({
    userId,
    vehicleId,
    startDate,
    endDate,
    totalPrice,
  });

  // update vehicle
  vehicle.status = "booked";
  await vehicle.save();

  return booking;
};

const getBookings = async (user: any) => {
  if (user.role === "admin") {
    return await Booking.find();
  } else {
    return await Booking.find({ userId: user.userId });
  }
};

const updateBooking = async (bookingId: string, user: any) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error("Booking not found");

  // CUSTOMER → cancel
  if (user.role === "customer") {
    const now = new Date();
    if (new Date(booking.startDate) <= now) {
      throw new Error("Cannot cancel after start date");
    }

    booking.status = "cancelled";

    // vehicle back available
    await Vehicle.findByIdAndUpdate(booking.vehicleId, {
      status: "available",
    });
  }

  // ADMIN → returned
  if (user.role === "admin") {
    booking.status = "returned";

    await Vehicle.findByIdAndUpdate(booking.vehicleId, {
      status: "available",
    });
  }

  await booking.save();
  return booking;
};

// AUTO RETURN (cron/system use)
const autoReturnBookings = async () => {
  const now = new Date();

  const bookings = await Booking.find({
    endDate: { $lt: now },
    status: "booked",
  });

  for (const booking of bookings) {
    booking.status = "returned";

    await Vehicle.findByIdAndUpdate(booking.vehicleId, {
      status: "available",
    });

    await booking.save();
  }
};

export const bookingService = {
  createBooking,
  getBookings,
  updateBooking,
  autoReturnBookings,
};