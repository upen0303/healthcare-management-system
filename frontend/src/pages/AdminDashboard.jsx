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
  const pendingDoctors = doctors.filter(d => d.status === "pending");

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
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
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
      <h2 className="text-xl font-bold mt-6 mb-2">Pending Doctor Approvals</h2>

      {pendingDoctors.length === 0 ? (
        <p className="text-gray-500">No pending doctors.</p>
      ) : (
        <table className="w-full border mb-6 rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 bg-gray-100">Name</th>
              <th className="border p-2 bg-gray-100">Email</th>
              <th className="border p-2 bg-gray-100">Specialization</th>
              <th className="border p-2 bg-gray-100">Actions</th>
            </tr>
        </thead>
        <tbody>
          {pendingDoctors.map(doc => (
            <tr key={doc._id}>
              <td className="border p-2">{doc.userId?.name}</td>
              <td className="border p-2">{doc.userId?.email}</td>
              <td className="border p-2">{doc.specialization}</td>
              <td className="border p-2 space-x-2">
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
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )}

      <table className="w-full border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 bg-gray-100">Doctor Name</th>
            <th className="border p-2 bg-gray-100">Email</th>
            <th className="border p-2 bg-gray-100">Specialization</th>
            <th className="border p-2 bg-gray-100">Status</th>
            <th className="border p-2 bg-gray-100">Actions</th>
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
      <table className="w-full border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 bg-gray-100">Patient</th>
            <th className="border p-2 bg-gray-100">Doctor</th>
            <th className="border p-2 bg-gray-100">Date</th>
            <th className="border p-2 bg-gray-100">Time</th>
            <th className="border p-2 bg-gray-100">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr key={apt._id}>
              <td className="border p-2">{apt.patient?.name}</td>
              <td className="border p-2">{apt.doctor?.userId?.name || "N/A"}</td>
              <td className="border p-2">{new Date(apt.appointmentDate).toDateString()}</td>
              <td className="border p-2">{apt.appointmentTime}</td>
              <td className="border p-2 ">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
