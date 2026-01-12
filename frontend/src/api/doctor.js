import api from "./axios";

export const getDoctorAppointments = async () => {
  const res = await api.get("/appointments/doctor");
  return res.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const res = await api.put(`/appointments/update-status/${id}`, { status });
  return res.data;
};
