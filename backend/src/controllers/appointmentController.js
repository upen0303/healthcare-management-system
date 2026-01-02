import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

// Patient books appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

    // Check doctor exists and is approved
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || doctor.status !== "approved") {
      return res
        .status(400)
        .json({ message: "Doctor not available for appointment" });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      reason,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Doctor views their appointments
export const getDoctorAppointments = async (req, res) => {
  try {
  // Find doctor profile using logged-in user ID
  const doctorProfile = await Doctor.findOne({ userId: req.user._id });

    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // Fetch appointments using doctor PROFILE ID
    const appointments = await Appointment.find({ doctor: doctorProfile._id })
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    res.json({ total: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Doctor updates appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    res.json({
      message: `Appointment ${status} successfully`,
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Patient views their appointments
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate({
        path: "doctor",
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    res.json({ total: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
