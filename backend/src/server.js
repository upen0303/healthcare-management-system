import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import createAdminUser from "./config/createAdmin.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import patientProfileRoutes from "./routes/patientProfileRoutes.js";

// Load environment variables
dotenv.config();

// Connect to database mongoDB
connectDB();

// Create admin user if not exists
createAdminUser();

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic route to test
app.get("/", (req, res) => {
  res.send("Healthcare Management Backend Running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patient-profile", patientProfileRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
