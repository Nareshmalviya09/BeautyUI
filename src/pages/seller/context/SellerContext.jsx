import { createContext, useContext, useEffect, useState } from "react";

// 1️⃣ Context create
const SellerContext = createContext(null);

// 2️⃣ Provider
export const SellerProvider = ({ children }) => {
  const [productId, setProductId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);

  // 🔥 Persist seller state (refresh safe)
  useEffect(() => {
    const data = {
      productId,
      categoryId,
      brandId,
    };
    localStorage.setItem("sellerContext", JSON.stringify(data));
  }, [productId, categoryId, brandId]);

  // 🔥 Load on app start
  useEffect(() => {
    const saved = localStorage.getItem("sellerContext");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProductId(parsed.productId ?? null);
      setCategoryId(parsed.categoryId ?? null);
      setBrandId(parsed.brandId ?? null);
    }
  }, []);

  // 🔄 Reset after publish / cancel
  const resetSellerFlow = () => {
    setProductId(null);
    setCategoryId(null);
    setBrandId(null);
    localStorage.removeItem("sellerContext");
  };

  return (
    <SellerContext.Provider
      value={{
        // IDs
        productId,
        categoryId,
        brandId,

        // setters
        setProductId,
        setCategoryId,
        setBrandId,

        // utils
        resetSellerFlow,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

// 3️⃣ Custom Hook (BEST PRACTICE)
export const useSellerContext = () => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error("useSellerContext must be used inside SellerProvider");
  }
  return context;
};
