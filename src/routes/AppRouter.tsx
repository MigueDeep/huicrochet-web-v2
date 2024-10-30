import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UserPage from "../pages/users/UserPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import OrdersPage from "../pages/orders/OrderPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import ColorsPage from "../pages/colors/ColorsPage";
import { ProductsPage } from "../pages/products/ProductsPage";
import { CreateProductsPage } from "../pages/products/CreateProductsPage";
import { ProductsBasePage } from "../pages/products/ProductsBasePage";

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="create" element={<CreateProductsPage />} />
      <Route path="base" element={<ProductsBasePage />} />
    </Routes>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/users" element={<UserPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/colors" element={<ColorsPage />} />
      <Route path="/products/*" element={<ProductsRoutes />} />
    </Routes>
  );
};

export default AppRouter;
