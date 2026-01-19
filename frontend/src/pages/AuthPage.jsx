import { useParams } from "react-router-dom";
import Login from "./Login";

export default function AuthPage() {
  const { role } = useParams();

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
