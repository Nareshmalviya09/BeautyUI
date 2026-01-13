import { useEffect, useState } from "react";
import api from "../../../../api/axiosInstance";

export default function AttributeStep({ productId, onNext }) {
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]); // Selected for product
  
  // Create new attribute
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [attributeName, setAttributeName] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [values, setValues] = useState([]);

  // 🔹 Load all attributes on mount
  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    try {
      const res = await api.get("/api/attributes");
      setAttributes(res.data);
    } catch (err) {
      alert("Failed to load attributes");
    }
  };

  // 🔹 Add attribute to product (select from dropdown)
  const handleSelectAttribute = (e) => {
    const attributeId = Number(e.target.value);
    if (!attributeId) return;

    const attribute = attributes.find(a => a.id === attributeId);
    
    // Check if already selected
    if (selectedAttributes.find(a => a.id === attributeId)) {
      alert("Attribute already selected!");
      return;
    }

    setSelectedAttributes([...selectedAttributes, attribute]);
    e.target.value = ""; // Reset dropdown
  };

  // 🔹 Remove selected attribute
  const removeAttribute = (attributeId) => {
    setSelectedAttributes(selectedAttributes.filter(a => a.id !== attributeId));
  };

  // 🔹 Add value to new attribute
  const addValue = () => {
    if (!valueInput.trim()) return;
    if (values.includes(valueInput.trim())) {
      alert("Value already added!");
      return;
    }
    setValues([...values, valueInput.trim()]);
    setValueInput("");
  };

  // 🔹 Remove value from list
  const removeValue = (index) => {
    setValues(values.filter((_, i) => i !== index));
  };

  // 🔹 Create new attribute
  const createAttribute = async () => {
    if (!attributeName.trim()) {
      alert("Attribute name is required");
      return;
    }

    if (values.length === 0) {
      alert("At least one attribute value required");
      return;
    }

    try {
      const res = await api.post("/api/attributes", {
        name: attributeName,
        values: values
      });

      alert("Attribute created successfully!");

      // Add to selected list
      setSelectedAttributes([...selectedAttributes, res.data]);

      // Reset form
      setAttributeName("");
      setValues([]);
      setValueInput("");
      setShowCreateForm(false);

      // Reload attributes
      await loadAttributes();
    } catch (err) {
      alert("Failed to create attribute");
    }
  };

  // 🔹 Save selected attributes to product
  const saveToProduct = async () => {
    if (selectedAttributes.length === 0) {
      alert("Please select at least one attribute");
      return;
    }

    try {
      // Save to backend (adjust endpoint as needed)
      await api.post(`/api/product-attributes/${productId}`, {
        attributeIds: selectedAttributes.map(a => a.id)
      });

      alert("Attributes saved to product!");
      onNext();
    } catch (err) {
      alert("Failed to save attributes");
    }
  };

  return (
    <div>
      <h3>4. Attributes</h3>

      {/* DROPDOWN TO SELECT EXISTING ATTRIBUTES */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
          Select Attribute:
        </label>
        <select
          onChange={handleSelectAttribute}
          style={{
            padding: "8px 12px",
            width: "300px",
            border: "1px solid #ddd",
            borderRadius: 4
          }}
        >
          <option value="">-- Choose Attribute --</option>
          {attributes.map(attr => (
            <option key={attr.id} value={attr.id}>
              {attr.name} ({attr.values.length} values)
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            marginLeft: 10,
            padding: "8px 16px",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer"
          }}
        >
          {showCreateForm ? "Cancel" : "+ Create New Attribute"}
        </button>
      </div>

      {/* SELECTED ATTRIBUTES DISPLAY */}
      {selectedAttributes.length > 0 && (
        <div style={{
          marginBottom: 20,
          padding: 16,
          background: "#f5f5f5",
          borderRadius: 4,
          border: "1px solid #ddd"
        }}>
          <strong>Selected Attributes:</strong>
          {selectedAttributes.map(attr => (
            <div
              key={attr.id}
              style={{
                marginTop: 10,
                padding: 12,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <strong>{attr.name}</strong>
                <div style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
                  Values: {attr.values.join(", ")}
                </div>
              </div>
              <button
                onClick={() => removeAttribute(attr.id)}
                style={{
                  padding: "4px 12px",
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CREATE NEW ATTRIBUTE FORM */}
      {showCreateForm && (
        <div style={{
          marginBottom: 20,
          padding: 20,
          background: "#e3f2fd",
          borderRadius: 4,
          border: "2px solid #2196f3"
        }}>
          <h4 style={{ marginTop: 0 }}>Create New Attribute</h4>

          {/* Attribute Name */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
              Attribute Name:
            </label>
            <input
              placeholder="e.g., Color, Size, Material"
              value={attributeName}
              onChange={(e) => setAttributeName(e.target.value)}
              style={{
                padding: "8px 12px",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: 4
              }}
            />
          </div>

          {/* Attribute Values */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
              Attribute Values:
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                placeholder="e.g., Red, Blue, Large"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addValue()}
                style={{
                  padding: "8px 12px",
                  flex: 1,
                  border: "1px solid #ddd",
                  borderRadius: 4
                }}
              />
              <button
                onClick={addValue}
                style={{
                  padding: "8px 16px",
                  background: "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer"
                }}
              >
                Add Value
              </button>
            </div>
          </div>

          {/* Values Preview */}
          {values.length > 0 && (
            <div style={{
              marginBottom: 16,
              padding: 12,
              background: "#fff",
              borderRadius: 4,
              border: "1px solid #ddd"
            }}>
              <strong>Values ({values.length}):</strong>
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {values.map((v, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "4px 12px",
                      background: "#e0e0e0",
                      borderRadius: 16,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8
                    }}
                  >
                    {v}
                    <button
                      onClick={() => removeValue(i)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#f44336",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Create Button */}
          <button
            onClick={createAttribute}
            style={{
              padding: "10px 24px",
              background: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: 500
            }}
          >
            ✓ Create Attribute
          </button>
        </div>
      )}

      {/* NEXT BUTTON */}
      {selectedAttributes.length > 0 && (
        <button
          onClick={saveToProduct}
          style={{
            marginTop: 20,
            padding: "12px 24px",
            background: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 16,
            fontWeight: 500
          }}
        >
          Save & Continue →
        </button>
      )}
    </div>
  );
}