import PatientProfile from "../models/PatientProfile.js";

// Create or update patient profile
export const upsertPatientProfile = async (req, res) => {
  try {
    const {
      age,
      gender,
      bloodGroup,
      height,
      weight,
      allergies,
      medicalHistory,
      emergencyContact,
    } = req.body;

    const profile = await PatientProfile.findOneAndUpdate(
      { userId: req.user._id },
      {
        age,
        gender,
        bloodGroup,
        height,
        weight,
        allergies,
        medicalHistory,
        emergencyContact,
      },
      {
        new: true,
        upsert: true, // create if not exists
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Patient profile saved successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Patient views own profile
export const getMyPatientProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({
      userId: req.user._id,
    }).populate("userId", "name email");

    if (!profile) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Doctor views patient profile
export const getPatientProfileByDoctor = async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({
      userId: req.params.patientId,
    }).populate("userId", "name email");

    if (!profile) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

