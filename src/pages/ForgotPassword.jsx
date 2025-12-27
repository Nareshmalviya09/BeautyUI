import React, { useState } from "react";
import { authController } from "../controllers/authController";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submitForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMsg("");

      // 🔥 BACKEND CALL
      const res = await authController.forgotPassword({ email });

      // Backend hamesha generic message return karta hai
      setMsg(res);

    } catch (err) {
      setMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        <p className="text-sm text-center text-gray-500 mb-4">
          Enter your email to receive a password reset link
        </p>

        {msg && (
          <p className="text-center text-sm mb-3 text-blue-600">
            {msg}
          </p>
        )}

        <form onSubmit={submitForgotPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-sm mt-4">
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
