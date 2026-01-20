import { useEffect, useState } from "react";
import {
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../api/doctor";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function DoctorDashboard() {
  const { logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const data = await getDoctorAppointments();
      setAppointments(data.appointments || data);
    } catch (err) {
      console.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    const checkProfile  = async () => {
      try {
        await api.get("/doctors/my-profile");
      } catch {
        navigate("/doctor/profile");
      }
    };
    checkProfile();
  }, []);

const handleUpdate = async (id, status) => {
  setActionLoading(id);

  try {
    await updateAppointmentStatus(id, status);
    await fetchAppointments();
  } catch (err) {
    console.error("Failed to update appointment");
  } finally {
    setActionLoading(null);
  }
};


  if (loading) return <p className="p-6 text-gray-600">Loading appointments...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <table className="w-full border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 bg-gray-100">Patient</th>
            <th className="border p-2 bg-gray-100">Date</th>
            <th className="border p-2 bg-gray-100">Time</th>
            <th className="border p-2 bg-gray-100">Reason</th>
            <th className="border p-2 bg-gray-100">Status</th>
            <th className="border p-2 bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr key={apt._id}>
              <td className="border p-2">{apt.patient?.name}</td>
              <td className="border p-2">
                {new Date(apt.appointmentDate).toDateString()}
              </td>
              <td className="border p-2">{apt.appointmentTime}</td>
              <td className="border p-2">{apt.reason}</td>
              <td className="border p-2 capitalize">
                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    apt.status === "approved"
                      ? "bg-green-500"
                      : apt.status === "pending"
                      ? "bg-yellow-500"
                      : apt.status === "rejected"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {apt.status}
                </span>
              </td>
              <td className="border p-2 space-x-2">
                {apt.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleUpdate(apt._id, "approved")}
                      disabled={actionLoading === apt._id}
                      className={`px-3 py-1 rounded text-white ${
                        actionLoading === apt._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {actionLoading === apt._id ? "Processing..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleUpdate(apt._id, "rejected")}
                      disabled={actionLoading === apt._id}
                      className={`px-3 py-1 rounded text-white ${
                        actionLoading === apt._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {actionLoading === apt._id ? "Processing..." : "Reject"} 
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
