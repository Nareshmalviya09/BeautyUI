import { useEffect, useState } from "react";
import api from "../../../../api/axiosInstance";

export default function BrandStep({ onNext }) {

  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");

  // 🔹 Load all brands (GET /api/brands)
  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const res = await api.get("/api/brands");
      setBrands(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load brands");
    }
  };

  // 🔹 Add new brand (POST /api/brands/bulk)
  const addBrand = async () => {
    if (!brandName.trim()) {
      alert("Brand name is required");
      return;
    }

    // Prevent duplicate brand (frontend check)
    const exists = brands.some(
      (b) => b.name.toLowerCase() === brandName.toLowerCase()
    );

    if (exists) {
      alert("Brand already exists");
      return;
    }

    try {
      await api.post("/api/brands/bulk", [
        { name: brandName }
      ]);

      setBrandName("");
      await loadBrands();
      alert("Brand created successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create brand");
    }
  };

  return (
    <>
      <h3>Brand</h3>

      {/* SELECT BRAND */}
      <select
        value={selectedBrandId}
        onChange={(e) => setSelectedBrandId(e.target.value)}
      >
        <option value="">Select Brand</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

      <br /><br />

      {/* ADD NEW BRAND */}
      <input
        type="text"
        placeholder="New brand name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
      <button onClick={addBrand}>Add Brand</button>

      <br /><br />

      {/* CONTINUE */}
      <button onClick={onNext}>Save & Continue</button>
    </>
  );
}
