import { useParams, useNavigate } from "react-router-dom";
import Login from "./Login";

export default function AuthPage() {
  const { role } = useParams();
  const navigate = useNavigate();

  // If no role, show role selection
  if (!role) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6">Choose Your Role</h1>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/auth/patient")}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Continue as Patient
            </button>

            <button
              onClick={() => navigate("/auth/doctor")}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Continue as Doctor
            </button>

            <button
              onClick={() => navigate("/auth/admin")}
              className="w-full bg-gray-800 text-white py-2 rounded"
            >
              Continue as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If role exists, show login form
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {role === "admin"
            ? "Admin Login"
            : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
        </h1>

        <Login role={role} />
      </div>
    </div>
  );
}
