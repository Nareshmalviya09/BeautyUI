import { useState } from "react";
import axios from "axios";

export default function ProductInfoStep({ setProductId, onNext }) {
  const [name, setName] = useState("");

  // ✅ Simple axios instance (NO TOKEN, NO INTERCEPTOR)
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

    try {
      // ✅ Correct backend endpoint
      const res = await api.post("/api/products", { name });

      // ✅ Backend se aaya real productId
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
      <h3>Product Info</h3>

      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={saveProduct}>Save & Continue</button>
    </>
  );
}
