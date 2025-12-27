import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Slider images
const sliderImages = [
  "https://images.unsplash.com/photo-1612817288484-6f916006741a",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f",
];

const Home = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  // Auto slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0B0B0F] min-h-screen text-gray-100 overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Particle effects */}
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#D4AF37] opacity-60 animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></span>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-[#14141A] to-[#1A1A20] opacity-80 z-0" />

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 z-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#F0E68C] animate-pulse">
              BeautyCare Products
            </h1>
            <p className="text-gray-400 max-w-xl mb-6">
              Discover premium skincare, haircare & makeup products made for your natural glow.
            </p>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px #D4AF37" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#C98B6B] transition"
            >
              Explore Products
            </motion.button>
          </motion.div>

          {/* Hero Slider */}
          <motion.div
            className="relative w-full h-[320px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.img
              key={sliderImages[current]}
              src={sliderImages[current]}
              alt="Beauty Slider"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, rotateY: -45 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 45 }}
              transition={{ duration: 1 }}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {sliderImages.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === current ? "bg-[#D4AF37]" : "bg-[#D4AF37]/50"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-[#D4AF37]">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CategoryCard title="Skincare" img={sliderImages[0]} />
          <CategoryCard title="Haircare" img={sliderImages[1]} />
          <CategoryCard title="Makeup" img={sliderImages[2]} />
          <CategoryCard title="Fragrances" img={sliderImages[3]} />
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-6 text-[#D4AF37]">
          Trending Beauty Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard title="Vitamin C Serum" price="₹799" img={sliderImages[0]} />
          <ProductCard title="Herbal Shampoo" price="₹499" img={sliderImages[1]} />
          <ProductCard title="Matte Lipstick" price="₹599" img={sliderImages[2]} />
          <ProductCard title="Luxury Perfume" price="₹1,299" img={sliderImages[3]} />
        </div>
      </section>
    </div>
  );
};

/* ================= CATEGORY CARD ================= */
const CategoryCard = ({ title, img }) => (
  <motion.div
    className="bg-[#14141A] rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-500"
    whileHover={{ rotateY: 10, scale: 1.05 }}
  >
    <img src={img} alt={title} className="h-40 w-full object-cover hover:scale-110 transition duration-500" />
    <div className="p-4 text-center">
      <h3 className="text-[#D4AF37] font-semibold text-lg">{title}</h3>
      <p className="text-gray-400 text-sm mt-1">Explore {title}</p>
    </div>
  </motion.div>
);

/* ================= PRODUCT CARD ================= */
const ProductCard = ({ title, price, img }) => (
  <motion.div
    className="bg-[#14141A] rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-500"
    whileHover={{ rotateX: 5, rotateY: 5, scale: 1.05 }}
  >
    <img src={img} alt={title} className="h-48 w-full object-cover" />
    <div className="p-4">
      <h3 className="text-[#D4AF37] font-semibold mb-1">{title}</h3>
      <p className="text-[#E79FB3] font-bold">{price}</p>
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px #D4AF37" }}
        whileTap={{ scale: 0.95 }}
        className="mt-3 w-full bg-[#D4AF37] text-black py-2 rounded hover:bg-[#C98B6B] transition"
      >
        Add to Cart
      </motion.button>
    </div>
  </motion.div>
);

export default Home;
