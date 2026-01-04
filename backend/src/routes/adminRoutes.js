import express from "express";
import {
  getAdminStats,
  getAllAppointmentsAdmin,
  getAllPatientsAdmin,
  getAllDoctorsAdmin,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/*
  ADMIN DASHBOARD ROUTES (READ-ONLY)
*/

// Dashboard statistics
router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getAdminStats
);

// View all appointments
router.get(
  "/appointments",
  protect,
  authorizeRoles("admin"),
  getAllAppointmentsAdmin
);

// View all patients
router.get(
  "/patients",
  protect,
  authorizeRoles("admin"),
  getAllPatientsAdmin
);

// View all doctors
router.get(
  "/doctors",
  protect,
  authorizeRoles("admin"),
  getAllDoctorsAdmin
);

export default router;
