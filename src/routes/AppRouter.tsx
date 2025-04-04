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
import PublicRoute from "./PublicRoute";
import { ProductsPage } from "../pages/products/ProductsPage";
import { CreateProductsPage } from "../pages/products/CreateProductsPage";
import { ProductsBasePage } from "../pages/products/ProductsBasePage";
import { EditProductPage } from "../pages/products/EditProductPage";
import { CreateProductBasePage } from "../pages/products/CreateProductBasePage";
import { EditProductBasePage } from "../pages/products/EditProductBasePage";
import CustomerPage from "../pages/common/Customer";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Rutas públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customer" element={<CustomerPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute allowedRole="ROLE_Admin" />}>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/colors" element={<ColorsPage />} />
        <Route path="/products/create" element={<CreateProductsPage />} />
        <Route path="/products/base" element={<ProductsBasePage />} />
        <Route
          path="/products/base/edit/:id"
          element={<EditProductBasePage />}
        />
        <Route
          path="/products/base/create"
          element={<CreateProductBasePage />}
        />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
