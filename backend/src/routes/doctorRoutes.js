import express from "express";
import {
  addDoctor,
  approveDoctor,
  rejectDoctor,
  getMyDoctorProfile,
  getAllDoctors,
  getPendingDoctors,
  getApprovedDoctors,
  getRejectedDoctors
} from "../controllers/doctorController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin adds doctor
router.post(
  "/add-doctor",
  protect,
  authorizeRoles("admin"),
  addDoctor
);

// Admin approves doctor
router.put(
  "/approve-doctor/:id",
  protect,
  authorizeRoles("admin"),
  approveDoctor
);

// Admin rejects doctor
router.put(
  "/reject-doctor/:id",
  protect,
  authorizeRoles("admin"),
  rejectDoctor
);

// Get all doctors
router.get("/all", protect, authorizeRoles("admin"), getAllDoctors);

// Get pending doctors
router.get("/pending", protect, authorizeRoles("admin"), getPendingDoctors);

// Get approved doctors
router.get("/approved", protect, authorizeRoles("admin", "patient"), getApprovedDoctors);

// Get rejected doctors
router.get("/rejected", protect, authorizeRoles("admin"), getRejectedDoctors);

router.get("/my-profile", protect, authorizeRoles("doctor"), getMyDoctorProfile);

// Doctor creates own profile
router.post(
  "/create-profile",
  protect,
  authorizeRoles("doctor"),
  addDoctor
);

export default router;