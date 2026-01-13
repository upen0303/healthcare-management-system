import { useEffect, useState } from "react";
import { getApprovedDoctors, bookAppointment } from "../api/booking";
import toast from "react-hot-toast";

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const fetchDoctors = async () => {
    try {
      const data = await getApprovedDoctors();
      setDoctors(data.doctors);
    } catch {
      toast.error("Failed to load doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await bookAppointment(form);
      toast.success("Appointment booked successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to book appointment"
      );
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          name="doctorId"
          onChange={handleChange}
          className="w-full border p-2"
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.userId?.name || "doctor"} - {d.specialization}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="appointmentDate"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          type="text"
          name="appointmentTime"
          placeholder="10:00 AM"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <textarea
          name="reason"
          placeholder="Reason for visit"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Book Appointment
        </button>
      </form>
    </div>
  );
}
