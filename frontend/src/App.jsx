import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import Register from "./pages/Register";

import PatientHome from "./pages/PatientHome";
import PatientDashboard from "./pages/PatientDashboard";
import BookAppointment from "./pages/BookAppointment";

import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth/:role" element={<AuthPage />} />
        <Route path="/register/:role" element={<Register />} />


        {/* Patient Routes */}
        <Route
          path="/patient/home"
          element={
            <ProtectedRoute roles={["patient"]}>
              <PatientHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute roles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/book"
          element={
            <ProtectedRoute roles={["patient"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        {/* Doctor Route */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute roles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
