import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PatientHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">
          Welcome, {user?.name} 👋
        </h1>
        <p className="text-gray-600 mb-6">
          What would you like to do today?
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/patient/book")}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Book Appointment
          </button>

          <button
            onClick={() => navigate("/patient/dashboard")}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            My Appointments
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
