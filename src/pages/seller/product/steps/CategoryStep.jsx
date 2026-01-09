import { useEffect, useState } from "react";
import api from "../../../../api/axiosInstance";

export default function CategoryStep({ onNext, setCategoryId }) {
  const [inputCategoryId, setInputCategoryId] = useState("");
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBreadcrumb = async () => {
    if (!inputCategoryId) {
      alert("Please enter Category ID");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(
        `/api/categories/breadcrumb/${inputCategoryId}`
      );

      setBreadcrumb(res.data || []);

      // ✅ SAVE CATEGORY ID IN PARENT
      setCategoryId(inputCategoryId);

    } catch (error) {
      console.error(error);
      alert("Invalid Category ID");
      setBreadcrumb([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 AUTO MOVE TO BRAND STEP
  useEffect(() => {
    if (breadcrumb.length > 0) {
      onNext();
    }
  }, [breadcrumb, onNext]);

  return (
    <>
      <h3>Category (By ID)</h3>

      <input
        type="number"
        placeholder="Enter Category ID"
        value={inputCategoryId}
        onChange={(e) => setInputCategoryId(e.target.value)}
      />

      <button onClick={fetchBreadcrumb} disabled={loading}>
        {loading ? "Loading..." : "Get Breadcrumb"}
      </button>

      <br /><br />

      {breadcrumb.length > 0 && (
        <div style={{ background: "#f5f5f5", padding: 10 }}>
          <strong>Breadcrumb:</strong>
          <div>
            {breadcrumb.map((c, i) => (
              <span key={c.id}>
                {c.name}
                {i < breadcrumb.length - 1 && " > "}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
