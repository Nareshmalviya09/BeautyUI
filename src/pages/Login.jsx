import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { authController } from "../controllers/authController";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const res = await authController.login(form);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Login failed. Verify email & phone first."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await authController.googleLogin(
        credentialResponse.credential
      );
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-2">
          Welcome Back 💖
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Login to continue shopping beauty products
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={submitLogin} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-pink-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t" />
        </div>

        {/* GOOGLE LOGIN */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("Google Login Failed")}
            width="280"
          />
        </div>

        {/* REGISTER */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-pink-600 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
