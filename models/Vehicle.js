import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },

    type: {
      type: String,
      enum: ["car", "bike"],
      required: true,
    },

    city: { type: String, required: true },

    pricePerDay: { type: Number, required: true },

    images: [{ type: String }],

    description: { type: String },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric"],
    },

    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
    },

    seats: { type: Number },
    mileage: { type: String },
    year: { type: Number },

    features: [{ type: String }],

    pickupLocation: { type: String },

    isAvailable: { type: Boolean, default: true },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED"],
      default: "PENDING",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);
