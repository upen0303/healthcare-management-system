import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import PatientProfile from "../models/PatientProfile.js";

// Admin dashboard statistics
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalDoctorsUsers = await User.countDocuments({ role: "doctor" });

    const totalDoctors = await Doctor.countDocuments();
    const approvedDoctors = await Doctor.countDocuments({ status: "approved" });
    const pendingDoctors = await Doctor.countDocuments({ status: "pending" });
    const rejectedDoctors = await Doctor.countDocuments({ status: "rejected" });

    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({
      status: "pending",
    });
    const approvedAppointments = await Appointment.countDocuments({
      status: "approved",
    });
    const completedAppointments = await Appointment.countDocuments({
      status: "completed",
    });
    const rejectedAppointments = await Appointment.countDocuments({
      status: "rejected",
    });

    res.json({
      users: {
        total: totalUsers,
        patients: totalPatients,
        doctors: totalDoctorsUsers,
      },
      doctors: {
        total: totalDoctors,
        approved: approvedDoctors,
        pending: pendingDoctors,
        rejected: rejectedDoctors,
      },
      appointments: {
        total: totalAppointments,
        pending: pendingAppointments,
        approved: approvedAppointments,
        completed: completedAppointments,
        rejected: rejectedAppointments,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Admin views all appointments
export const getAllAppointmentsAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate({
        path: "doctor",
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    res.json({
      total: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Admin views all patients
export const getAllPatientsAdmin = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select(
      "-password"
    );

    res.json({
      total: patients.length,
      patients,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Admin views all doctors
export const getAllDoctorsAdmin = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate(
      "userId",
      "name email role"
    );

    res.json({
      total: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
