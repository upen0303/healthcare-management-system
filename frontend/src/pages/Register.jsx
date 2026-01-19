import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      navigate(`/auth/${role}`);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Register as {role}
        </h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
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
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
