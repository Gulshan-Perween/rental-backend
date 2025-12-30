import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";

export const createBooking = async (req, res) => {
  const booking = await Booking.create({
    customer: req.user._id,
    ...req.body,
    status: "CONFIRMED",
  });

  await Vehicle.findByIdAndUpdate(req.body.vehicle, { isAvailable: false });

  res.json(booking);
};

export const confirmBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = "CONFIRMED";
  await booking.save();

  await Vehicle.findByIdAndUpdate(booking.vehicle, {
    isAvailable: false,
  });

  res.json(booking);
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = "CANCELLED";
  await booking.save();

  await Vehicle.findByIdAndUpdate(booking.vehicle, {
    isAvailable: true,
  });

  res.json(booking);
};
export const myBookings = async (req, res) => {
  const bookings = await Booking.find({ customer: req.user._id })
    .populate("vehicle");
  res.json(bookings);
};

export const allBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("customer vehicle");
  res.json(bookings);
};

export const ownerBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate({
      path: "vehicle",
      match: { owner: req.user._id },
    });

  res.json(bookings.filter(b => b.vehicle));
};
