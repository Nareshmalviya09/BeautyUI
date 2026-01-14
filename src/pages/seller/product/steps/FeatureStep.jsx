import { useEffect, useState } from "react";
import api from "../../api/api";

export default function FeatureStep({ productId, onNext }) {
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load features
  useEffect(() => {
    if (!productId) return;

    api
      .get(`/api/products/${productId}/features`)
      .then((res) => {
        const text = res.data.map((f) => f.feature).join("\n");
        setFeatures(text);
      })
      .catch((err) => {
        console.error("Error fetching features", err);
      });
  }, [productId]);

  // ✅ Save features
  const handleSave = async () => {
    const featureList = features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    if (featureList.length === 0) {
      alert("Please enter at least one feature");
      return;
    }

    setLoading(true);

    try {
      await api.post(
        `/api/products/${productId}/features/bulk`,
        featureList
      );

      alert("Features saved successfully ✅");
      onNext();
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save features ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Product Features</h3>

      <textarea
        rows={8}
        style={{ width: "100%" }}
        placeholder="One feature per line"
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </>
  );
}
