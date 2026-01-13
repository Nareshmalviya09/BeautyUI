import { useEffect, useState } from "react";
import api from "../../../../api/axiosInstance";
import { useSellerContext } from "../../context/SellerContext";

export default function BrandStep({ onNext }) {
  const { setBrandId } = useSellerContext(); // 🔥 GLOBAL CONTEXT

  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");

  // 🔹 Load all brands
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

  // 🔹 Add new brand
  const addBrand = async () => {
    if (!brandName.trim()) {
      alert("Brand name is required");
      return;
    }

    const exists = brands.some(
      (b) => b.name.toLowerCase() === brandName.toLowerCase()
    );

    if (exists) {
      alert("Brand already exists");
      return;
    }

    try {
      await api.post("/api/brands/bulk", [{ name: brandName }]);

      setBrandName("");
      await loadBrands();
      alert("Brand created successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create brand");
    }
  };

  // 🔥 When brand selected
  const handleBrandSelect = (e) => {
    const id = e.target.value;
    setSelectedBrandId(id);
    setBrandId(Number(id)); // 🔥 GLOBAL CONTEXT
  };

  return (
    <>
      <h3>2. Brand</h3>

      {/* SELECT BRAND */}
      <select value={selectedBrandId} onChange={handleBrandSelect}>
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
      <button
        onClick={onNext}
        disabled={!selectedBrandId}
      >
        Save & Continue
      </button>
    </>
  );
}
