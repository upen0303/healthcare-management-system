import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function RoleRedirect() {
  const { user } = useAuth();

  if (!user) return <Login />;

  if (user.role === "patient") return <PatientDashboard />;
  if (user.role === "doctor") return <DoctorDashboard />;
  if (user.role === "admin") return <AdminDashboard />;

  return <Login />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RoleRedirect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient"
          element={
            <ProtectedRoute roles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute roles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

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
