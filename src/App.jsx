// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phoneNo: "",
//   });

//   const [emailOtp, setEmailOtp] = useState("");
//   const [phoneOtp, setPhoneOtp] = useState("");

//   const [emailVerified, setEmailVerified] = useState(false);
//   const [phoneVerified, setPhoneVerified] = useState(false);

//   const [status, setStatus] = useState("PENDING");
//   const [loading, setLoading] = useState(false);

//   // input handler
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // REGISTER → OTP AUTO SEND
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post(
//         "http://localhost:9090/auth/register",
//         formData
//       );

//       alert("Registered Successfully ✅ OTP sent to Email & Phone");
//       setStatus("PENDING");
//     } catch (error) {
//       alert("Registration Failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // VERIFY EMAIL OTP
//   const verifyEmailOtp = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:9090/auth/verify-email-otp",
//         null,
//         {
//           params: {
//             email: formData.email,
//             otp: emailOtp,
//           },
//         }
//       );

//       alert(res.data);
//       setEmailVerified(true);
//     } catch {
//       alert("Invalid or Expired Email OTP ❌");
//     }
//   };

//   // VERIFY PHONE OTP
//   const verifyPhoneOtp = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:9090/auth/verify-phone-otp",
//         null,
//         {
//           params: {
//             phoneNo: formData.phoneNo,
//             otp: phoneOtp,
//           },
//         }
//       );

//       alert(res.data);
//       setPhoneVerified(true);
//     } catch {
//       alert("Invalid or Expired Phone OTP ❌");
//     }
//   };

//   return (
//     <>
//       <h2>User Registration</h2>

//       <form onSubmit={handleRegister}>
//         <input
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           name="phoneNo"
//           placeholder="Phone Number"
//           value={formData.phoneNo}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>

//       <hr />

//       <h3>Email OTP Verification</h3>
//       <input
//         placeholder="Enter Email OTP"
//         value={emailOtp}
//         onChange={(e) => setEmailOtp(e.target.value)}
//       />
//       <button onClick={verifyEmailOtp}>Verify Email</button>

//       <hr />

//       <h3>Phone OTP Verification</h3>
//       <input
//         placeholder="Enter Phone OTP"
//         value={phoneOtp}
//         onChange={(e) => setPhoneOtp(e.target.value)}
//       />
//       <button onClick={verifyPhoneOtp}>Verify Phone</button>

//       <hr />

//       <p>
//         <strong>Status:</strong>{" "}
//         {emailVerified && phoneVerified ? "ACTIVE" : status}
//       </p>
//     </>
//   );
// };

// export default Register;

import React from 'react'

import AppRoutes from "./routes/AppRoutes";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
   return  (
    <>
     <Navbar/>
      <AppRoutes />
      <Footer/>
    
    </>
          
)
};

export default App;
