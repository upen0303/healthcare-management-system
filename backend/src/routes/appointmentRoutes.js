import express from "express";
import {
  bookAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
  getPatientAppointments,
} from "../controllers/appointmentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/*
  PATIENT ROUTES
*/

// Patient books appointment
router.post(
  "/book",
  protect,
  authorizeRoles("patient"),
  bookAppointment
);

// Patient views their appointments
router.get(
  "/patient",
  protect,
  authorizeRoles("patient"),
  getPatientAppointments
);

/*
  DOCTOR ROUTES
*/

// Doctor views their appointments
router.get(
  "/doctor",
  protect,
  authorizeRoles("doctor"),
  getDoctorAppointments
);

// Doctor updates appointment status (approve / reject / complete)
router.put(
  "/update-status/:id",
  protect,
  authorizeRoles("doctor"),
  updateAppointmentStatus
);

export default router;
