import { data } from "react-router-dom";
import api from "../api/axiosInstance";

export const authService = {
    register : (data)=>api.post("/auth/register",data),
    verifyEmailOtp: (email, otp) =>
    api.post(`/auth/verify-email-otp?email=${email}&otp=${otp}`),
    verifyPhoneOtp: (phone, otp) =>
    api.post(`/auth/verify-phone-otp?phone=${phone}&otp=${otp}`),
    login : (data)=> api.post("/auth/login",data),
    googleLogin:(idToken)=>api.post("/auth/google",{idToken}),
    forgotPassword:(data)=>api.post("/auth/forgot-password",data),
    resetPassword:(data)=> api.post("/auth/reset-password",data),
    validateToken: (token)=> api.get(`/auth/reset-password/validate?token=${token}`)
};
// 