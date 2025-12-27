import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  const [newPassword, setNewPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [msg, setMsg] = useState("");

  // 🔥 AUTO TOKEN VALIDATION (no button, no controller)
  useEffect(() => {
    if (!token) {
      setMsg("Invalid reset link");
      return;
    }

    const validateToken = async () => {
      try {
        await api.post(`/auth/reset-password/validate?token=${token}`);
        setValid(true); // ✅ allow reset form
      } catch (err) {
        setMsg("Reset link expired or invalid");
      }
    };

    validateToken();
  }, [token]);

  // 🔥 FINAL RESET (only real controller action)
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword,
      });

      setMsg("Password changed successfully");
      setTimeout(() => navigate("/login"), 1500);

    } catch {
      setMsg("Password reset failed");
    }
  };

  // ❌ Token invalid → stop here
  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{msg}</p>
      </div>
    );
  }

  // ✅ Token valid → show reset form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={resetPassword}
        className="bg-white p-6 rounded shadow w-87.5"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {msg && (
          <p className="text-center text-sm mb-3 text-blue-600">
            {msg}
          </p>
        )}

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 mb-4"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
