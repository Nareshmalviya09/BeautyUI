import { useEffect, useState } from "react";
import api from "../../../../api/axiosInstance";
import { useSellerContext } from "../../context/SellerContext";

export default function AttributeStep({ onNext }) {
  const { productId } = useSellerContext(); // 🔥 GLOBAL PRODUCT ID

  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

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

  // 🔹 Select existing attribute
  const handleSelectAttribute = (e) => {
    const attributeId = Number(e.target.value);
    if (!attributeId) return;

    const attribute = attributes.find(a => a.id === attributeId);

    if (selectedAttributes.find(a => a.id === attributeId)) {
      alert("Attribute already selected!");
      return;
    }

    setSelectedAttributes([...selectedAttributes, attribute]);
    e.target.value = "";
  };

  const removeAttribute = (attributeId) => {
    setSelectedAttributes(selectedAttributes.filter(a => a.id !== attributeId));
  };

  // 🔹 Add value
  const addValue = () => {
    if (!valueInput.trim()) return;
    if (values.includes(valueInput.trim())) {
      alert("Value already added!");
      return;
    }
    setValues([...values, valueInput.trim()]);
    setValueInput("");
  };

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

      setSelectedAttributes([...selectedAttributes, res.data]);
      setAttributeName("");
      setValues([]);
      setValueInput("");
      setShowCreateForm(false);

      await loadAttributes();
    } catch (err) {
      alert("Failed to create attribute");
    }
  };

  // 🔹 Save attributes to product (GLOBAL productId)
  const saveToProduct = async () => {
    if (!productId) {
      alert("Product not created yet");
      return;
    }

    if (selectedAttributes.length === 0) {
      alert("Please select at least one attribute");
      return;
    }

    try {
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

      {/* SELECT EXISTING ATTRIBUTES */}
      <select onChange={handleSelectAttribute}>
        <option value="">-- Choose Attribute --</option>
        {attributes.map(attr => (
          <option key={attr.id} value={attr.id}>
            {attr.name} ({attr.values.length} values)
          </option>
        ))}
      </select>

      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? "Cancel" : "+ Create New Attribute"}
      </button>

      {/* SELECTED ATTRIBUTES */}
      {selectedAttributes.map(attr => (
        <div key={attr.id}>
          <strong>{attr.name}</strong>
          <button onClick={() => removeAttribute(attr.id)}>Remove</button>
        </div>
      ))}

      {/* CREATE FORM */}
      {showCreateForm && (
        <div>
          <input
            placeholder="Attribute name"
            value={attributeName}
            onChange={(e) => setAttributeName(e.target.value)}
          />

          <input
            placeholder="Value"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />

          <button onClick={addValue}>Add Value</button>
          <button onClick={createAttribute}>Create Attribute</button>
        </div>
      )}

      {/* NEXT */}
      {selectedAttributes.length > 0 && (
        <button onClick={saveToProduct}>
          Save & Continue →
        </button>
      )}
    </div>
  );
}
