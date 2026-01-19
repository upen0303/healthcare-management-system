import { useEffect, useState } from "react";
import { getAllDoctors, approveDoctor, rejectDoctor } from "../api/admin";
import { useAuth } from "../context/AuthContext";
import { getAllAppointments } from "../api/admin";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data.doctors || data);
    } catch (err) {
      console.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };
  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data.appointments || data);
    } catch (err) {
      console.error("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  const handleApprove = async (id) => {
    await approveDoctor(id);
    fetchDoctors();
  };

  const handleReject = async (id) => {
    await rejectDoctor(id);
    fetchDoctors();
  };

  if (loading) return <p className="p-6 text-gray-600">Loading doctors...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Doctor Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td className="border p-2">{doc.userId?.name}</td>
              <td className="border p-2">{doc.userId?.email}</td>
              <td className="border p-2">{doc.specialization}</td>
              <td className="border p-2 capitalize">{doc.status}</td>
              <td className="border p-2 space-x-2">
                {doc.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(doc._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(doc._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      /* Appointments Table */
      <h2 className="text-xl font-bold mt-8 mb-4">All Appointments</h2> 
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Patient</th>
            <th className="border p-2">Doctor</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr key={apt._id}>
              <td className="border p-2">{apt.patient?.name}</td>
              <td className="border p-2">{apt.doctor?.userId?.name || "N/A"}</td>
              <td className="border p-2">{new Date(apt.appointmentDate).toDateString()}</td>
              <td className="border p-2">{apt.appointmentTime}</td>
              <td className="border p-2 capitalize">{apt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
