import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const payload = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(payload));
  const role = decodedPayload.roles[0].authority;

  return allowedRole === role ? (
    <Outlet />
  ) : (
    <Navigate to="/access-denied" replace />
  );
};

export default ProtectedRoute;
