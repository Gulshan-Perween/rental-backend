// import express from "express";
// import {
//   addVehicle,
//   updateVehicle,
//   deleteVehicle,
//   approveVehicle,
//   getVehicles,
//   ownerVehicles,
//   getVehicleById,
// } from "../controllers/vehicleController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { allowRoles } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// // Public
// router.get("/", getVehicles);
// router.get("/:id", getVehicleById);

// // Add vehicle
// router.post("/", protect, allowRoles("ADMIN", "OWNER"), addVehicle);

// // Update vehicle
// router.put("/:id", protect, allowRoles("ADMIN", "OWNER"), updateVehicle);

// // Delete vehicle
// router.delete("/:id", protect, allowRoles("ADMIN", "OWNER"), deleteVehicle);

// // Approve vehicle
// router.put("/approve/:id", protect, allowRoles("ADMIN"), approveVehicle);

// // Owner vehicles
// router.get("/owner", protect, allowRoles("OWNER"), ownerVehicles);

// export default router;

import express from "express";
import {
  addVehicle,
  updateVehicle,
  deleteVehicle,
  approveVehicle,
  getVehicles,
  ownerVehicles,
  getVehicleById,
} from "../controllers/vehicleController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public
router.get("/", getVehicles);

// ✅ Owner vehicles (MOVE THIS UP)
router.get("/owner", protect, allowRoles("OWNER"), ownerVehicles);

// Approve vehicle
router.put("/approve/:id", protect, allowRoles("ADMIN"), approveVehicle);

// Get single vehicle (KEEP AFTER fixed routes)
router.get("/:id", getVehicleById);

// Add vehicle
router.post("/", protect, allowRoles("ADMIN", "OWNER"), addVehicle);

// Update vehicle
router.put("/:id", protect, allowRoles("ADMIN", "OWNER"), updateVehicle);

// Delete vehicle
router.delete("/:id", protect, allowRoles("ADMIN", "OWNER"), deleteVehicle);

export default router;
