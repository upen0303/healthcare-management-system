import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login({ role }) {
  const { login } = useAuth();
  const navigate = useNavigate(); 
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loggedInUser = await login(email, password);

      // 🔒 Role mismatch protection
      if (role && loggedInUser.role !== role) {
        setError(`You are not allowed to login as ${role}`);
        return;
      }

      // ✅ Role-based redirect
      if (loggedInUser.role === "patient") {
        navigate("/patient/home");
      } else if (loggedInUser.role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed, try again"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        {role !== "admin" && (
          <p className="text-sm text-center">
            New here?{" "}
            <button
              type="button"
              onClick={() => navigate(`/register/${role}`)}
              className="text-blue-600 underline"
            >
              Register
            </button>
          </p>
    )}

      </form>
    </div>
  );
}
