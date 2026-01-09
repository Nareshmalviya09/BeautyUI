import { useEffect, useState } from "react";
import api from "../../../../api/axiosInstance";

export default function VariantStep({ productId, onNext }) {

  const [variants, setVariants] = useState([]);
  const [variantName, setVariantName] = useState("");

  // 🔹 Load variants for this product
  useEffect(() => {
    if (productId) {
      loadVariants();
    }
  }, [productId]);

  const loadVariants = async () => {
    try {
      const res = await api.get(
        `/api/products/${productId}/variants`
      );
      setVariants(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load variants");
    }
  };

  // 🔹 Create variant
  const addVariant = async () => {
    if (!productId) {
      alert("Product not created yet");
      return;
    }

    if (!variantName.trim()) {
      alert("Variant name is required");
      return;
    }

    try {
      await api.post(
        `/api/products/${productId}/variants`,
        {
          name: variantName
        }
      );

      setVariantName("");
      await loadVariants();
      alert("Variant created");
    } catch (error) {
      console.error(error);
      alert("Failed to create variant");
    }
  };

  return (
    <>
      <h3>Variants</h3>

      {/* ADD VARIANT */}
      <input
        type="text"
        placeholder="Variant name (e.g 100ml, Red)"
        value={variantName}
        onChange={(e) => setVariantName(e.target.value)}
      />
      <button onClick={addVariant}>Add Variant</button>

      <hr />

      {/* VARIANT LIST */}
      <ul>
        {variants.map((variant) => (
          <li key={variant.id}>
            {variant.name}
          </li>
        ))}
      </ul>

      <br />
      <button onClick={onNext}>Save & Continue</button>
    </>
  );
}
