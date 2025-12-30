import express from "express";
import {
  createBooking,
  myBookings,
  allBookings,
  ownerBookings,
  confirmBooking,
  cancelBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// CUSTOMER
router.post("/", protect, allowRoles("CUSTOMER"), createBooking);
router.get("/me", protect, allowRoles("CUSTOMER"), myBookings);

// OWNER
router.get("/owner", protect, allowRoles("OWNER"), ownerBookings);

// ADMIN / MANAGER
router.get("/all", protect, allowRoles("ADMIN", "MANAGER"), allBookings);
router.put("/:id/confirm", protect, allowRoles("ADMIN"), confirmBooking);
router.put("/:id/cancel", protect, allowRoles("ADMIN"), cancelBooking);

export default router;
