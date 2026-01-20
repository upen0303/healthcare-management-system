import { useEffect, useState } from "react";
import { getMyAppointments, cancelAppointment } from "../api/patient";
import { useAuth } from "../context/AuthContext";

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const data = await getMyAppointments();
      setAppointments(data.appointments || data);
    } catch (err) {
      console.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    fetchAppointments();
  };

  if (loading) return <p className="p-6 text-gray-600">Loading appointments...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
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
            <th className="border p-2 bg-gray-100">Doctor</th>
            <th className="border p-2 bg-gray-100">Specialization</th>
            <th className="border p-2 bg-gray-100">Date</th>
            <th className="border p-2 bg-gray-100">Time</th>
            <th className="border p-2 bg-gray-100">Status</th>
            <th className="border p-2 bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr key={apt._id}>
              <td className="border p-2">
                {apt.doctor?.userId?.name || "N/A"}
              </td>
              <td className="border p-2">
                {apt.doctor?.specialization}
              </td>
              <td className="border p-2">
                {new Date(apt.appointmentDate).toDateString()}
              </td>
              <td className="border p-2">{apt.appointmentTime}</td>
              <td className="border p-2">
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
              <td className="border p-2">
                {apt.status === "pending" && (
                  <button
                    onClick={() => handleCancel(apt._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
