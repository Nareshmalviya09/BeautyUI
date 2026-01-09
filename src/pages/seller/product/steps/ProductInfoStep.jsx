import { useState } from "react";
// import { createProduct } from "../../../../services/productApi";

export default function ProductInfoStep({ setProductId, onNext }) {
  const [name, setName] = useState("");

  const saveProduct = async () => {
    // const res = await createProduct({ name });
    // setProductId(res.data.id);

    // MOCK ID (REMOVE AFTER API)
    setProductId(101);

    alert("Product created");
    onNext();
  };

  return (
    <>
      <h3>Product Info</h3>
      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <button onClick={saveProduct}>Save & Continue</button>
    </>
  );
}
