import mongoose from "mongoose";
import Vehicle from "../models/Vehicle.js";

/**
 * ADD VEHICLE
 * ADMIN → auto APPROVED
 * OWNER → PENDING
 */
export const addVehicle = async (req, res) => {
  try {
    console.log("ADD VEHICLE BODY 👉", req.body);

    const vehicle = await Vehicle.create({
      name: req.body.name,
      brand: req.body.brand,
      type: req.body.type,
      city: req.body.city,
      pricePerDay: req.body.pricePerDay,

      images: req.body.imageUrl ? [req.body.imageUrl] : [],

      description: req.body.description,

      fuelType: req.body.fuelType,
      transmission: req.body.transmission,
      seats: req.body.seats,
      mileage: req.body.mileage,
      year: req.body.year,

      features: req.body.features,
      pickupLocation: req.body.pickupLocation,

      owner: req.user._id,
      status: req.user.role === "ADMIN" ? "APPROVED" : "PENDING",
      isAvailable: true,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    console.error("ADD VEHICLE ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};


/**
 * GET VEHICLE BY ID
 */
export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (error) {
    console.error("GET VEHICLE ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE VEHICLE
 */
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (
      req.user.role === "OWNER" &&
      vehicle.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You can update only your own vehicle" });
    }

    Object.assign(vehicle, req.body);
    await vehicle.save();

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE VEHICLE
 */
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (
      req.user.role === "OWNER" &&
      vehicle.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You can delete only your own vehicle" });
    }

    await vehicle.deleteOne();
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * APPROVE VEHICLE (ADMIN)
 */
export const approveVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { status: "APPROVED" },
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET APPROVED VEHICLES (PUBLIC)
 */
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      status: "APPROVED",
      isAvailable: true,
    });

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET OWNER VEHICLES
 */
export const ownerVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.user._id });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
