import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axiosInstance";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .get(`/api/buyer/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("API ERROR", err));
  }, [productId]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>

      {/* BREADCRUMB */}
      <div style={{ marginBottom: "10px", color: "gray" }}>
        {product.breadcrumb?.map((c, i) => (
          <span key={i}>
            {c.name} {i < product.breadcrumb.length - 1 && " > "}
          </span>
        ))}
      </div>

      {/* BASIC INFO */}
      <h1>{product.name}</h1>
      <p><b>Brand:</b> {product.brand}</p>

      {/* IMAGE */}
      <img
        src={product.images?.[0]?.imageUrl}
        alt={product.name}
        width="300"
      />

      {/* VARIANTS */}
      <h3>Variants</h3>
      {product.variants.map((v) => (
        <button key={v.id} style={{ marginRight: "10px" }}>
          {v.value} - ₹{v.price}
        </button>
      ))}

      {/* ATTRIBUTES */}
      <h3>Attributes</h3>
      {product.attributes.map((a) => (
        <div key={a.attributeName}>
          <b>{a.attributeName}:</b>{" "}
          {a.values.map((v) => (
            <span key={v} style={{ marginRight: "6px" }}>
              {v}
            </span>
          ))}
        </div>
      ))}

      {/* DESCRIPTION */}
      <h3>Description</h3>
      <p>{product.description}</p>

      {/* SPECIFICATIONS */}
      <h3>Specifications</h3>
      <table border="1" cellPadding="6">
        <tbody>
          {product.specifications.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FEATURES */}
      <h3>Features</h3>
      <ul>
        {product.features.map((f) => (
          <li key={f.feature}>{f.feature}</li>
        ))}
      </ul>

      {/* MANUFACTURER */}
      <h3>Manufacturer Info</h3>
      <p>{product.manufacturerInfo?.manufacturerName}</p>
      <p>{product.manufacturerInfo?.address}</p>

    </div>
  );
};

export default ProductPage;
