import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0F] text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-3">
            BeautyCare
          </h2>
          <p className="text-sm text-gray-400">
            Premium skincare, haircare & beauty products crafted for your
            natural glow.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#C98B6B] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-[#C98B6B] transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-[#C98B6B] transition">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#C98B6B] transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="hover:text-[#C98B6B] transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-[#C98B6B] transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-[#C98B6B] transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#C98B6B] transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* SOCIAL / NEWSLETTER */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-[#C98B6B] transition">🌸</a>
            <a href="#" className="hover:text-[#C98B6B] transition">📸</a>
            <a href="#" className="hover:text-[#C98B6B] transition">🐦</a>
            <a href="#" className="hover:text-[#C98B6B] transition">▶️</a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#1A1A20] border-t border-[#D4AF37]/20 py-4 text-center text-sm text-[#D4AF37]">
        {new Date().getFullYear()} BeautyCare. All rights reserved. © Naresh
      </div>
    </footer>
  );
};

export default Footer;
