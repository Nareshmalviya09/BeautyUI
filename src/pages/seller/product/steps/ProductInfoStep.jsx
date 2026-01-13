import { useState } from "react";
import axios from "axios";
import { useSellerContext } from "../../context/SellerContext";

export default function ProductInfoStep({ onNext }) {
  const { setProductId, categoryId, brandId } = useSellerContext(); // 🔥 GLOBAL

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Simple axios instance (NO TOKEN)
  const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  });

  const saveProduct = async () => {
    if (!name.trim()) {
      alert("Product name required");
      return;
    }

    if (!categoryId || !brandId) {
      alert("Category & Brand must be selected first");
      return;
    }

    try {
      const res = await api.post("/api/products", {
        name,
        slug,          // ✅ NEW
        description,   // ✅ NEW
        categoryId,
        brandId,
      });

      // 🔥 GLOBAL productId
      setProductId(res.data.id);

      alert("Product created");
      onNext();
    } catch (err) {
      console.error("CREATE PRODUCT ERROR:", err);
      alert("Failed to create product");
    }
  };

  return (
    <>
      <h3>3. Product Info</h3>

      {/* PRODUCT NAME */}
      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      {/* SLUG */}
      <input
        placeholder="Slug (e.g. face-wash)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <br /><br />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />

      <br /><br />

      <button onClick={saveProduct}>Save & Continue</button>
    </>
  );
}
