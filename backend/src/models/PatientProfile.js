import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    height: {
      type: Number, // in cm
    },
    weight: {
      type: Number, // in kg
    },
    allergies: {
      type: String,
    },
    medicalHistory: {
      type: String,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PatientProfile", patientProfileSchema);
