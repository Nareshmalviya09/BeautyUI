import { useEffect, useRef, useState } from "react";
import api from "../../../../api/axiosInstance";
import { useSellerContext } from "../../context/SellerContext";

export default function CategoryStep({ onNext }) {
  const { setCategoryId } = useSellerContext(); // 🔥 GLOBAL CONTEXT

  const [inputCategoryId, setInputCategoryId] = useState("");
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestRef = useRef(0);

  // Fetch breadcrumb when ID changes
  useEffect(() => {
    if (!inputCategoryId) {
      setBreadcrumb([]);
      setSelectedCategory(null);
      return;
    }

    const currentRequest = ++requestRef.current;

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await api.get(
          `/api/categories/breadcrumb/${Number(inputCategoryId)}`
        );

        if (currentRequest !== requestRef.current) return;

        if (Array.isArray(res.data) && res.data.length > 0) {
          setBreadcrumb(res.data);

          // ✅ auto-select last category
          const lastCategory = res.data[res.data.length - 1];
          setSelectedCategory(lastCategory);
          setCategoryId(lastCategory.id); // 🔥 GLOBAL
        } else {
          setBreadcrumb([]);
          setSelectedCategory(null);
        }
      } catch (err) {
        if (currentRequest !== requestRef.current) return;
        setBreadcrumb([]);
        setSelectedCategory(null);
      } finally {
        if (currentRequest === requestRef.current) {
          setLoading(false);
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [inputCategoryId, setCategoryId]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryId(category.id); // 🔥 GLOBAL
  };

  const showError = !loading && inputCategoryId && breadcrumb.length === 0;

  return (
    <div>
      <h3>1. Category</h3>

      {/* Input */}
      <input
        type="number"
        placeholder="Enter Category ID"
        value={inputCategoryId}
        onChange={(e) => setInputCategoryId(e.target.value)}
      />

      {loading && <p>Loading breadcrumb...</p>}

      {showError && (
        <p style={{ color: "red" }}>
          ❌ Invalid Category ID - Category not found
        </p>
      )}

      {breadcrumb.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <strong>📍 Breadcrumb:</strong>
          <div>
            {breadcrumb.map((c, i) => (
              <span key={c.id}>
                {c.name}
                {i < breadcrumb.length - 1 && " > "}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            {breadcrumb.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                style={{
                  marginTop: 8,
                  padding: 10,
                  cursor: "pointer",
                  background:
                    selectedCategory?.id === category.id ? "#e3f2fd" : "#fff",
                  border:
                    selectedCategory?.id === category.id
                      ? "2px solid #2196f3"
                      : "1px solid #ddd",
                }}
              >
                {category.name} (ID: {category.id})
              </div>
            ))}
          </div>

          {selectedCategory && (
            <button
              onClick={onNext}
              style={{ marginTop: 20 }}
            >
              Next Step →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
