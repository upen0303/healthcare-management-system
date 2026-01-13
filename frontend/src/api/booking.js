import api from "./axios";

export const getApprovedDoctors = async () => {
  const res = await api.get("/doctors/approved");
  return res.data;
};

export const bookAppointment = async (data) => {
  const res = await api.post("/appointments/book", data);
  return res.data;
};
