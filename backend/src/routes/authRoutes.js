import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get(
  "/protected",
  protect,
  authorizeRoles("patient", "doctor", "admin"),
  (req, res) => {
    res.json({ message: "Access granted", user: req.user });
  }
);

export default router;
