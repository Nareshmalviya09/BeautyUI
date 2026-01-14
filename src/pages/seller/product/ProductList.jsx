// ProductList.jsx
import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/buyer/products/cards")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ background: "#EAEDED", minHeight: "100vh", padding: "20px" }}>
      
      {/* PAGE TITLE */}
      <h2 style={{ marginBottom: "20px" }}>Results</h2>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.productId}
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "6px",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => navigate(`/product/${p.productId}`)}
          >
            {/* IMAGE */}
            <img
              src={p.image}
              alt={p.name}
              style={{
                height: "180px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />

            {/* NAME */}
            <h4
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#0F1111",
                marginBottom: "6px",
              }}
            >
              {p.name}
            </h4>

            {/* BRAND */}
            <p style={{ fontSize: "12px", color: "#565959" }}>
              Brand: {p.brand}
            </p>

            {/* PRICE */}
            <div style={{ marginTop: "auto" }}>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#B12704",
                }}
              >
                ₹{p.price}
              </span>
            </div>

            {/* BUTTON */}
            <button
              style={{
                marginTop: "10px",
                background: "#FFD814",
                border: "1px solid #FCD200",
                borderRadius: "20px",
                padding: "8px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
