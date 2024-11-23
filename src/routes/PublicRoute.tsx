import { Navigate, Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
