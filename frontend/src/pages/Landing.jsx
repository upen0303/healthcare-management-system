import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-blue-600">MediCare</h1>
        <button
          onClick={() => navigate("/auth")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login / Register
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4">
            Manage Healthcare the Smart Way
          </h2>
          <p className="text-lg mb-6">
            Book appointments, manage doctors, and control everything from one
            secure platform.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-white text-blue-600 px-6 py-3 rounded font-semibold"
          >
            Get Started
          </button>
        </div>

        <img
          src="https://img.freepik.com/free-vector/medical-team-concept-illustration_114360-1741.jpg"
          alt="Healthcare"
          className="w-full md:w-1/2 mt-10 md:mt-0"
        />
      </section>

      {/* Role Cards */}
      <section className="px-8 py-16">
        <h3 className="text-2xl font-bold text-center mb-10">
          Choose Your Role
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="text-xl font-bold mb-2">Patient</h4>
            <p className="text-gray-600 mb-4">
              Book appointments & track your visits.
            </p>
            <button
              onClick={() => navigate("/auth/patient")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Continue as Patient
            </button>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="text-xl font-bold mb-2">Doctor</h4>
            <p className="text-gray-600 mb-4">
              Manage your schedule & patients.
            </p>
            <button
              onClick={() => navigate("/auth/doctor")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Continue as Doctor
            </button>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="text-xl font-bold mb-2">Admin</h4>
            <p className="text-gray-600 mb-4">
              Control doctors & appointments.
            </p>
            <button
              onClick={() => navigate("/auth/admin")}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Continue as Admin
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-4 text-gray-500">
        © {new Date().getFullYear()} MediCare. All rights reserved.
      </footer>
    </div>
  );
}
