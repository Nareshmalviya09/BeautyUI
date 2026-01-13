import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Register from "../pages/Register";
import VerifyOtp from "../pages/VerifyOtp";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";

import AttributeStep from "../pages/seller/product/steps/AttributeStep";
import BrandStep from "../pages/seller/product/steps/BrandStep";
import CategoryStep from "../pages/seller/product/steps/CategoryStep";
import VariantStep from "../pages/seller/product/steps/VariantStep";
import ProductCreate from "../pages/seller/product/ProductCreate";
import SellerLayout from "../components/SellerLayout";

// ✅ BUYER PAGES (TOP LEVEL)
import ProductList from "../pages/seller/product/ProductList";
import ProductPage from "../pages/seller/product/ProductPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />

      {/* ================= BUYER ROUTES ================= */}
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:productId" element={<ProductPage />} />

      {/* ================= SELLER ROUTES ================= */}
      <Route path="/seller" element={<SellerLayout />}>
        <Route path="product" element={<ProductCreate />} />
        <Route path="category" element={<CategoryStep />} />
        <Route path="brand" element={<BrandStep />} />
        <Route path="attributes" element={<AttributeStep />} />
        <Route path="variants" element={<VariantStep />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;
