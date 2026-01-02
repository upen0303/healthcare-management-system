import express from "express";
import {
  upsertPatientProfile,
  getMyPatientProfile,
  getPatientProfileByDoctor,
} from "../controllers/patientProfileController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/*
  PATIENT ROUTES
*/

// Create or update patient profile
router.post(
  "/",
  protect,
  authorizeRoles("patient"),
  upsertPatientProfile
);

// Patient views own profile
router.get(
  "/me",
  protect,
  authorizeRoles("patient"),
  getMyPatientProfile
);

/*
  DOCTOR ROUTES
*/

// Doctor views patient profile
router.get(
  "/:patientId",
  protect,
  authorizeRoles("doctor"),
  getPatientProfileByDoctor
);

export default router;
