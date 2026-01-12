import api from "./axios";

export const getMyAppointments = async () => {
  const res = await api.get("/appointments/patient");
  return res.data;
};

export const cancelAppointment = async (id) => {
  const res = await api.put(`/appointments/cancel/${id}`);
  return res.data;
};
