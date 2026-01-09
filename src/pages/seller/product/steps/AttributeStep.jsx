import { useEffect, useState } from "react";
import api from "../../../../api/axiosInstance"; // ✅ correct import

export default function AttributeStep({ onNext }) {

  const [attributes, setAttributes] = useState([]);

  const [attributeName, setAttributeName] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [values, setValues] = useState([]);

  // 🔹 Load all attributes
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

  // 🔹 Add value locally
  const addValue = () => {
    if (!valueInput.trim()) return;
    setValues([...values, valueInput]);
    setValueInput("");
  };

  // 🔹 Create attribute (REAL BACKEND FORMAT)
  const saveAttribute = async () => {
    if (!attributeName.trim()) {
      alert("Attribute name is required");
      return;
    }

    if (values.length === 0) {
      alert("At least one attribute value required");
      return;
    }

    try {
      await api.post("/api/attributes", {
        name: attributeName,
        values: values
      });

      // reset
      setAttributeName("");
      setValues([]);
      setValueInput("");

      await loadAttributes();
      alert("Attribute created");
    } catch (err) {
      alert("Failed to create attribute");
    }
  };

  return (
    <>
      <h3>Attributes</h3>

      {/* ATTRIBUTE NAME */}
      <input
        placeholder="Attribute name (e.g Color, Size)"
        value={attributeName}
        onChange={(e) => setAttributeName(e.target.value)}
      />

      <br /><br />

      {/* ATTRIBUTE VALUES */}
      <input
        placeholder="Attribute value (e.g Red)"
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
      />
      <button onClick={addValue}>Add Value</button>

      {/* VALUES PREVIEW */}
      <ul>
        {values.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>

      <button onClick={saveAttribute}>Save Attribute</button>

      <hr />

      {/* ATTRIBUTE LIST FROM DB */}
      <h4>Saved Attributes</h4>
      <ul>
        {attributes.map(attr => (
          <li key={attr.id}>
            <strong>{attr.name}</strong>
            <ul>
              {attr.values.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <br />
      <button onClick={onNext}>Save & Continue</button>
    </>
  );
}
