import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authController } from "../controllers/authController";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const phone = params.get("phone");

  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // safety
  if (!email || !phone) {
    navigate("/register");
    return null;
  }

  const verifyEmail = async () => {
    try {
      setLoading(true);
      setMsg("");

      await authController.verifyEmailOtp(email, emailOtp);

      setEmailVerified(true);
      setMsg("Email verified successfully. Now verify phone OTP.");

    } catch (err) {
      setMsg(err?.response?.data?.message || "Email OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyPhone = async () => {
    try {
      setLoading(true);
      setMsg("");

      await authController.verifyPhoneOtp(phone, phoneOtp);

      setMsg("Verification complete! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setMsg(err?.response?.data?.message || "Phone OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-2">Verify OTP</h2>

        {msg && (
          <p className="text-center text-sm mb-4 text-blue-600">{msg}</p>
        )}

        {/* EMAIL OTP */}
        <div className="mb-4">
          <label>Email OTP</label>
          <input
            type="text"
            value={emailOtp}
            disabled={emailVerified}
            onChange={(e) => setEmailOtp(e.target.value)}
            className="w-full border p-2 mt-1"
          />

          {!emailVerified && (
            <button
              onClick={verifyEmail}
              disabled={loading}
              className="w-full bg-black text-white py-2 mt-2"
            >
              Verify Email OTP
            </button>
          )}
        </div>

        {/* PHONE OTP */}
        <div>
          <label>Phone OTP</label>
          <input
            type="text"
            value={phoneOtp}
            disabled={!emailVerified}
            onChange={(e) => setPhoneOtp(e.target.value)}
            className="w-full border p-2 mt-1"
          />

          <button
            onClick={verifyPhone}
            disabled={!emailVerified || loading}
            className={`w-full py-2 mt-2 text-white ${
              emailVerified ? "bg-green-600" : "bg-gray-400"
            }`}
          >
            Verify Phone OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
