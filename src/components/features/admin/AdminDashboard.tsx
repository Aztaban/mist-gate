import { useGetAllOrdersQuery } from '@features/apiSlices/ordersApiSlice';
import { useGetProductsQuery } from '@features/apiSlices/productApiSlice';
import AdminStatusBar from './dashhboard/AdminStatusBar';
import AdminDataTable from './dashhboard/AdminDataTable';
import UsersManager from './dashhboard/UsersManager';
import CategoryManager from './dashhboard/CategoryManager';
import { eurFormat } from '@utils';
import useAuth from '@hooks/state/useAuth';

const AdminDashboard = () => {
  const { data: ordersData, isError, isLoading } = useGetAllOrdersQuery();
  const { data: productsData, isError: productsError, isLoading: productsLoading } = useGetProductsQuery();
  const { isAdmin } = useAuth();

  if (isLoading || productsLoading) return <p>Loading...</p>;
  if (isError || productsError) return <p>Error loading data.</p>;

  const processingOrders = (ordersData || []).filter((order) => order.status === 'processing');
  const lowStockProducts = [...(productsData || [])].sort((a, b) => a.countInStock - b.countInStock).slice(0, 5);
  const lowsStockWarning = (productsData || []).filter((product) => product.countInStock < 5);

  const topSellingProducts = [...(productsData || [])]
    .sort((a, b) => b.unitsSold - a.unitsSold) // Sort by countInStock in descending order to get top selling products
    .slice(0, 5);

  return (
    <article className="admin-dashboard">
      <div className="dashboard-grid">
        <AdminStatusBar processingCount={processingOrders.length} outOfStockCount={lowsStockWarning.length} />
        <AdminDataTable
          title="Latest Orders"
          data={processingOrders.slice(0, 5) || []}
          columns={['orderNo', 'totalPrice', 'isPaid', 'status']}
          columnFormatters={{ totalPrice: (value) => eurFormat(value) }}
          linkPath={(order) => `/order/${order.id}`}
        />
        <AdminDataTable
          title="Top selling products"
          data={topSellingProducts || []}
          columns={['name', 'unitsSold', 'price']}
          columnFormatters={{ price: (value) => eurFormat(value) }}
          linkPath={(product) => `/admin/products/edit/${product.id}`}
        />
        <AdminDataTable
          title="Products stocks"
          data={lowStockProducts || []}
          columns={['name', 'countInStock', 'price']}
          columnFormatters={{ price: (value) => eurFormat(value) }}
          linkPath={(product) => `/admin/products/edit/${product.id}`}
        />
      </div>
      {isAdmin && <UsersManager />}
      <CategoryManager />
    </article>
  );
};

export default AdminDashboard;
