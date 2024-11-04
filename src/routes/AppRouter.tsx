import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UserPage from "../pages/users/UserPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import OrdersPage from "../pages/orders/OrderPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import ColorsPage from "../pages/colors/ColorsPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />

      <Route element={<ProtectedRoute allowedRole="ROLE_Admin"/>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/colors" element={<ColorsPage />} />
      </Route>

    </Routes>
  );
};

export default AppRouter;
