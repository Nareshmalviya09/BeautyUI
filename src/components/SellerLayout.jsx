import { Outlet } from "react-router-dom";
import { SellerProvider } from "../pages/seller/context/SellerContext";

const SellerLayout = () => {
  return (
    <SellerProvider>
      <Outlet />
    </SellerProvider>
  );
};

export default SellerLayout;
