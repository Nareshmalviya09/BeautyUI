import React from "react";
import logo from '../img/bt dark.png';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0B0B0F] border-b border-[#D4AF37]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="BeautyCare Logo"
            className="h-14 w-18 rounded-full shadow-md"
          />
          <span className="text-3xl font-bold text-[#D4AF37] tracking-wide">
            BeautyCare
          </span>
        </Link>

        {/* MENU LINKS */}
        <div className="hidden md:flex items-center gap-8 text-gray-400 font-medium">
          <Link to="/" className="hover:text-[#D4AF37] transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-[#D4AF37] transition">
            Products
          </Link>
          <Link to="/categories" className="hover:text-[#D4AF37] transition">
            Categories
          </Link>
          <Link to="/about" className="hover:text-[#D4AF37] transition">
            About
          </Link>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex items-center border border-[#D4AF37]/50 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search beauty products..."
            className="px-4 py-2 w-56 outline-none text-sm bg-[#0B0B0F] text-gray-300"
          />
          <button className="bg-[#D4AF37] text-black px-4 py-2 hover:bg-[#C98B6B] transition">
            🔍
          </button>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-5">
          {/* CART */}
          <Link to="/cart" className="relative text-xl hover:text-[#D4AF37]">
            🛍️
            <span className="absolute -top-2 -right-3 bg-[#D4AF37] text-black text-xs font-bold rounded-full px-1.5">
              2
            </span>
          </Link>

          {/* AUTH */}
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-400 hover:text-[#D4AF37] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#D4AF37] text-black px-4 py-2 rounded-full hover:bg-[#C98B6B] transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-gray-400 hover:text-[#D4AF37] transition"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
