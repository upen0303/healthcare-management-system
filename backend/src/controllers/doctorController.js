import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

// Get logged-in doctor's profile
export const getMyDoctorProfile = async (req, res) => {
  const doctor = await Doctor.findOne({ userId: req.user._id });

  if (!doctor) {
    return res.status(404).json({ message: "Doctor profile not found" });
  }

  res.json({ doctor });
};

// Admin adds a new doctor
export const addDoctor = async (req, res) => {
  const { specialization, experience, phone, fees, timings } = req.body;

  const user = await User.findById(req.user._id); // ✅ use token user
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const doctorExists = await Doctor.findOne({ userId: user._id });
  if (doctorExists) {
    return res.status(400).json({ message: "Profile already exists" });
  }

  const doctor = await Doctor.create({
    userId: user._id,
    specialization,
    experience,
    phone,
    fees,
    timings,
    status: "pending",
  });

  res.status(201).json({
    message: "Profile submitted for approval",
    doctor,
  });
};


// Admin approves doctor
export const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.status = "approved";
    await doctor.save();

    res.json({ message: "Doctor approved successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin rejects doctor
export const rejectDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.status = "rejected";
    await doctor.save();

    res.json({ message: "Doctor rejected successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all doctors (for admin)
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email role");
    res.json({ total: doctors.length, doctors });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get approved doctors (for patients)
export const getApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" }).populate(
      "userId",
      "name email"
    );

    res.json({ total: doctors.length, doctors });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//get pending doctors
export const getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "pending" }).populate(
      "userId",
      "name email"
    );

    res.json({ total: doctors.length, doctors });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//get rejected doctors
export const getRejectedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "rejected" }).populate(
      "userId",
      "name email"
    );
    res.json({ total: doctors.length, doctors });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


