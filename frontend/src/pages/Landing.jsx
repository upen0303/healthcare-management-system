import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full grid md:grid-cols-2 overflow-hidden">
        
        {/* Left Content */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">
            Healthcare Management System
          </h1>
          <p className="text-gray-600 mb-6">
            Book appointments, manage doctors, and track patient care easily.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/auth/patient")}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              I am a Patient
            </button>

            <button
              onClick={() => navigate("/auth/doctor")}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              I am a Doctor
            </button>

            <button
              onClick={() => navigate("/auth/admin")}
              className="w-full bg-gray-800 text-white py-2 rounded"
            >
              I am an Admin
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:block">
          <img
            src="https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg"
            alt="Healthcare"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
