import { Route } from "react-router-dom";
import Shop from "@components/features/shop/Shop";
import SingleProductPage from "@components/features/shop/SingleProductPage";

export default function ShopRoutes() {
  return (
    <>
    <Route path="shop">
      <Route index element={<Shop />} />
      <Route path="product/:productId" element={<SingleProductPage />} />
    </Route></>
  );
}