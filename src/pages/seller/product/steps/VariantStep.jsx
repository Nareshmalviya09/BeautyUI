import { useEffect, useState } from "react";
import api from "../../../../api/axiosInstance";
import { useSellerContext } from "../../context/SellerContext";

export default function VariantStep({ onNext }) {
  const { productId } = useSellerContext(); // ✅ GLOBAL PRODUCT ID

  const [variants, setVariants] = useState([]);

  // form fields
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // 🔹 Load variants
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

    if (!sku || !price || !stock) {
      alert("SKU, Price, and Stock are required");
      return;
    }

    try {
      await api.post(
        `/api/products/${productId}/variants`,
        {
          sku: sku,
          price: Number(price),
          stock: Number(stock),
          attributes: {} // 🔥 keep empty for now
        }
      );

      // reset form
      setSku("");
      setPrice("");
      setStock("");

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
        placeholder="SKU (e.g FOUNDATION-BEIGE-30ML)"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button onClick={addVariant}>Add Variant</button>

      <hr />

      {/* VARIANT LIST */}
      <ul>
        {variants.map((variant) => (
          <li key={variant.id}>
            <b>{variant.sku}</b> – ₹{variant.price} – Stock: {variant.stock}
          </li>
        ))}
      </ul>

      <br />
      <button onClick={onNext}>Save & Continue</button>
    </>
  );
}
