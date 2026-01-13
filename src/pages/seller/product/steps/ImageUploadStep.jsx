import { useState } from "react";
import { useSellerContext } from "../../context/SellerContext";

export default function ImageUploadStep() {
  const { productId } = useSellerContext(); // 🔥 GLOBAL PRODUCT ID

  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    setFiles(selectedFiles);
    setPreview(selectedFiles.map(file => URL.createObjectURL(file)));
  };

  const uploadImages = async () => {
    if (!productId) {
      alert("❌ Product ID missing");
      return;
    }

    if (files.length === 0) {
      alert("❌ Please select images");
      return;
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file); // backend key must match
    });

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}/images`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed:", errorText);
        alert("Upload failed ❌\n" + errorText);
        return;
      }

      alert("Images uploaded successfully ✅");
      setFiles([]);
      setPreview([]);
    } catch (error) {
      console.error("Server error:", error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>9. Upload Product Images</h3>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* PREVIEW */}
      <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
        {preview.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="preview"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              border: "1px solid #ddd",
              borderRadius: 4
            }}
          />
        ))}
      </div>

      <br />

      <button onClick={uploadImages} disabled={loading}>
        {loading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
}
