import Appointment from "../models/Appointment.js";
import { sendEmail } from "../services/emailService.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

// Patient books appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

    // FUTURE DATE VALIDATION HERE
    const selectedDate = new Date(appointmentDate);
    const today = new Date();

    if (selectedDate < today) {
      return res.status(400).json({
        message: "Appointment date must be in the future",
      });
    }

    // Check doctor exists and is approved
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || doctor.status !== "approved") {
      return res
        .status(400)
        .json({ message: "Doctor not available for appointment" });
    }

    // Check for existing appointment at the same time
    const existing = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      status: { $ne: "rejected" },
    });

    if (existing) {
      return res.status(400).json({
        message: "This time slot is already booked. Please choose another.",
      });
    }

    //create appointment
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      reason,
      status: "pending",
      statusHistory: [{ status: "pending" }],
    });

    // After appointment is created
try {
  const doctorProfile = await Doctor.findById(appointment.doctor).populate("userId", "email name");

  await sendEmail({
    to: doctorProfile.userId.email,
    subject: "New Appointment Request",
    html: `
      <h3>Hello Dr. ${doctorProfile.userId.name}</h3>
      <p>You have a new appointment request.</p>
      <p><strong>Date:</strong> ${appointmentDate}</p>
      <p><strong>Time:</strong> ${appointmentTime}</p>
      <p>Please login to approve or reject the appointment.</p>
    `,
  });
} catch (emailError) {
  console.error("Email failed:", emailError.message);
}

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
    appointment.statusHistory.push({ status, date: new Date() });
    await appointment.save();

    // Notify patient via email about status update
    try {
  const patientUser = await User.findById(appointment.patient);

  await sendEmail({
    to: patientUser.email,
    subject: `Appointment ${status}`,
    html: `
      <h3>Hello ${patientUser.name}</h3>
      <p>Your appointment has been <strong>${status.toUpperCase()}</strong>.</p>
      <p><strong>Date:</strong> ${appointment.appointmentDate.toDateString()}</p>
      <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
      <p>Thank you for using our Healthcare Management System.</p>
    `,
  });

  console.log("✅ Appointment status email sent to patient");
} catch (emailError) {
  console.error("Email failed:", emailError.message);
}

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


