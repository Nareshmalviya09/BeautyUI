import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axiosInstance";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    api
      .get(`/api/buyer/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedVariant(res.data.variants?.[0]);
      })
      .catch((err) => console.error("API ERROR", err));
  }, [productId]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ background: "#EAEDED", minHeight: "100vh", padding: "20px" }}>

      {/* MAIN CARD */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "6px",
          maxWidth: "1100px",
          margin: "auto",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >

        {/* TOP SECTION */}
        <div style={{ display: "flex", gap: "40px" }}>

          {/* IMAGE */}
          <div>
            <img
              src={product.images?.[0]?.imageUrl}
              alt={product.name}
              style={{ width: "300px", objectFit: "contain" }}
            />
          </div>

          {/* INFO */}
          <div style={{ flex: 1 }}>
            <h2>{product.name}</h2>
            <p style={{ color: "#565959" }}>Brand: {product.brand}</p>

            {/* PRICE */}
            <p style={{ fontSize: "24px", color: "#B12704" }}>
              ₹{selectedVariant?.price}
            </p>

            {/* VARIANTS */}
            <h4>Variants</h4>
            {product.variants?.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                style={{
                  marginRight: "10px",
                  marginBottom: "10px",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border:
                    selectedVariant?.id === v.id
                      ? "2px solid #F08804"
                      : "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                {v.value}
              </button>
            ))}

            {/* ADD TO CART */}
            <div>
              <button
                style={{
                  marginTop: "15px",
                  background: "#FFD814",
                  border: "1px solid #FCD200",
                  borderRadius: "20px",
                  padding: "10px 25px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* ATTRIBUTES */}
      {/* ATTRIBUTES */}
<h3>Attributes</h3>

{product.attributes && product.attributes.length > 0 ? (
  product.attributes.map((a) => (
    <div key={a.id} style={{ marginBottom: "8px" }}>
      <b>{a.name}:</b>{" "}
      {a.values.map((v) => (
        <span
          key={v.id}
          style={{
            display: "inline-block",
            marginRight: "6px",
            padding: "4px 10px",
            border: "1px solid #ccc",
            borderRadius: "12px",
            fontSize: "13px",
          }}
        >
          {v.value}
        </span>
      ))}
    </div>
  ))
) : (
  <p>No attributes available</p>
)}


        {/* DESCRIPTION */}
        <h3>Description</h3>
        <p>{product.description}</p>

        {/* SPECIFICATIONS */}
   {/* SPECIFICATIONS */}
{product.specifications && product.specifications.length > 0 && (
  <>
    <h4>Specifications</h4>
    <ul>
      {product.specifications.map((spec) => (
        <li key={spec.id}>
          <strong>{spec.specKey}</strong>: {spec.specValue}
        </li>
      ))}
    </ul>
  </>
)}


      {/* FEATURES */}
<h3>Features</h3>

{product.features && product.features.length > 0 ? (
  <ul style={{ paddingLeft: "18px" }}>
    {product.features.map((f) => (
      <li key={f.id} style={{ marginBottom: "6px" }}>
        {f.feature}
      </li>
    ))}
  </ul>
) : (
  <p>No features available</p>
)}

        

        {/* MANUFACTURER */}
        <h3>Manufacturer Info</h3>
        <p><b>{product.manufacturerInfo?.manufacturerName}</b></p>
        <p>{product.manufacturerInfo?.address}</p>

      </div>
    </div>
  );
};

export default ProductPage;
