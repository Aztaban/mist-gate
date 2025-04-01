import { Route } from "react-router-dom";
import AdminDashboard from "@components/features/admin/AdminDashboard";
import AdminProductsPage from "@components/features/admin/products/AdminProductsPage";
import CreateProduct from "@components/features/admin/products/CreateProduct";
import AdminSingleProduct from "@components/features/admin/products/AdminSingleProduct";
import AdminOrdersPage from "@components/features/admin/orders/AdminOrdersPage";

export default function AdminRoutes() {
  return (
    <>
    <Route path="admin">
      <Route index element={<AdminDashboard />} />
      <Route path="products">
        <Route index element={<AdminProductsPage />} />
        <Route path="edit/:productId" element={<AdminSingleProduct />} />
        <Route path="new" element={<CreateProduct />} />
      </Route>
      <Route path="orders" element={<AdminOrdersPage />} />
    </Route></>
  );
}