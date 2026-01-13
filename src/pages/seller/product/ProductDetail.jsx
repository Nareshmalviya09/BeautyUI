// ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/api/buyer/products/${productId}`)
       .then(res => setProduct(res.data))
       .catch(err => console.error(err));
  }, [productId]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.brand}</p>
    </div>
  );
};

export default ProductPage;
