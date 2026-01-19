import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function DoctorProfileForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    specialization: "",
    experience: "",
    fees: "",
    phone: "",
    timings: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/doctors/create-profile", {
        ...form,
        userId: user._id,
      });

      toast.success("Profile submitted for approval");
      navigate("/doctor");
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Complete Doctor Profile
        </h2>

        <input
          name="specialization"
          placeholder="Specialization"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="experience"
          placeholder="Experience (years)"
          type="number"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="fees"
          placeholder="Consultation Fees"
          type="number"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="timings"
          placeholder="Timings (e.g. 9 AM - 4 PM)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Submit Profile
        </button>
      </form>
    </div>
  );
}
