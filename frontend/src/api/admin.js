import api from "./axios";

// Get all doctors
export const getAllDoctors = async () => {
  const res = await api.get("/doctors/all");
  return res.data;
};

// Approve doctor
export const approveDoctor = async (doctorId) => {
  const res = await api.put(`/doctors/approve-doctor/${doctorId}`);
  return res.data;
};

// Reject doctor
export const rejectDoctor = async (doctorId) => {
  const res = await api.put(`/doctors/reject-doctor/${doctorId}`);
  return res.data;
};

// Get all appointments
export const getAllAppointments = async () => {
  const res = await api.get("/appointments/all");
  return res.data;
};