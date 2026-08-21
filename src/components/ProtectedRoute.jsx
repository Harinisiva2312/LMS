import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {

  const location = useLocation();

  // Get stored user
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // 🚫 If user not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Convert roles to lowercase to avoid mismatch
  const userRole = user.role?.toLowerCase();
  const requiredRole = role?.toLowerCase();

  // 🚫 Role mismatch
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return children;
}