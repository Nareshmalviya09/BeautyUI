import { useEffect, useState } from "react";
import api from "../../api/api";

export default function SpecificationStep({ productId, onNext }) {
  const [specs, setSpecs] = useState([
    { specKey: "", specValue: "" },
  ]);
  const [loading, setLoading] = useState(false);

  // 🔹 Load existing specifications
  useEffect(() => {
    if (!productId) return;

    api
      .get(`/api/product-specifications/${productId}`)
      .then((res) => {
        if (res.data.length > 0) {
          setSpecs(
            res.data.map((s) => ({
              specKey: s.specKey,
              specValue: s.specValue,
            }))
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching specifications", err);
      });
  }, [productId]);

  // 🔹 Handle input change
  const handleChange = (index, field, value) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  // ➕ Add new row
  const addRow = () => {
    setSpecs([...specs, { specKey: "", specValue: "" }]);
  };

  // ❌ Remove row
  const removeRow = (index) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  // 💾 Save specs
  const handleSave = async () => {
    const payload = specs.filter(
      (s) => s.specKey.trim() && s.specValue.trim()
    );

    if (payload.length === 0) {
      alert("Please add at least one specification");
      return;
    }

    setLoading(true);

    try {
      await api.post(
        `/api/product-specifications/${productId}`,
        payload
      );

      alert("Specifications saved successfully ✅");
      onNext();
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save specifications ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Product Specifications</h3>

      {specs.map((spec, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "8px",
          }}
        >
          <input
            type="text"
            placeholder="Specification name"
            value={spec.specKey}
            onChange={(e) =>
              handleChange(index, "specKey", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Value"
            value={spec.specValue}
            onChange={(e) =>
              handleChange(index, "specValue", e.target.value)
            }
          />

          {specs.length > 1 && (
            <button onClick={() => removeRow(index)}>❌</button>
          )}
        </div>
      ))}

      <button onClick={addRow}>➕ Add Specification</button>

      <br /><br />

      <button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </>
  );
}
