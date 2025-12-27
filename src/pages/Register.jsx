import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { authController } from "../controllers/authController";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      await authController.register(form);

      navigate(`/verify-otp?email=${form.email}&phone=${form.phone}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 GOOGLE REGISTER
  const handleGoogleRegister = async (credentialResponse) => {
    try {
      await authController.googleLogin(credentialResponse.credential);
      navigate("/");
    } catch {
      setError("Google registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-2">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us & explore beauty products
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* REGISTER FORM */}
        <form onSubmit={submitForm} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t" />
        </div>

        {/* GOOGLE REGISTER */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleRegister}
            onError={() => setError("Google Sign-up Failed")}
            width="280"
          />
        </div>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
