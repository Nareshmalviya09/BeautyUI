// ProductList.jsx
import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/buyer/products/cards")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Products</h2>

      {products.map(p => (
        <div
          key={p.productId}
          style={{ cursor: "pointer", border: "1px solid #ddd", margin: "10px" }}
          onClick={() => navigate(`/product/${p.productId}`)}
        >
          <img src={p.image} width="150" />
          <h4>{p.name}</h4>
          <p>{p.brand}</p>
          <b>₹{p.price}</b>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
