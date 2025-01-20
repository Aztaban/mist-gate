import { useState, useMemo, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders, setOrders } from '../../../features/shop/ordersSlice';
import {
  Order,
  useGetAllOrdersQuery,
} from '../../../features/shop/ordersApiSlice';
import { ShippingMethod } from '../../../config/shippingConfig';
import AdminOrderList from './AdminOrderList';
import Pagination from '../../common/Pagination';

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { data: ordersData, refetch } = useGetAllOrdersQuery();
  const orders = useSelector(selectOrders);

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | ''>('');
  const [isPaid, setIsPaid] = useState<string>('');
  const itemsPerPage = 10;

  useEffect(() => {
    if (ordersData) {
      dispatch(setOrders(ordersData));
    } else {
      refetch();
    }
  }, [ordersData, dispatch, refetch]);

  // Filter orders based on search input
  const filteredOrders = useMemo<Order[]>(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.user.username.toLowerCase().includes(search.toLowerCase()) ||
        order.orderNo.toString().includes(search);
      const matchesShipping = shippingMethod
        ? order.shippingMethod === shippingMethod
        : true;
      const matchesPayment =
        isPaid === 'paid'
          ? order.isPaid
          : isPaid === 'notPaid'
          ? !order.isPaid
          : true;
      return matchesSearch && matchesShipping && matchesPayment;
    });
  }, [orders, search, shippingMethod, isPaid]);

  // Calculate paginated order from current page
  const paginatedOrders = useMemo<Order[]>(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, page, itemsPerPage]);

  // Calculate total pages based on filtered orders
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Update search and reset to page 1 when search input changes
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleShippingMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setShippingMethod(e.target.value as ShippingMethod);
    setPage(1);
  };

  const handleIsPaidChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsPaid(e.target.value);
    setPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <article className="orders-main-page">
      <h2 className="header-wraper">Admin Orders</h2>
      <div>
        <input
          type="text"
          placeholder="Search by username or order ID"
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />

        <select value={shippingMethod} onChange={handleShippingMethodChange}>
          <option value="">All Shipping Methods</option>
          {Object.values(ShippingMethod).map((method) => (
            <option key={method} value={method}>
              {method.charAt(0).toUpperCase() + method.slice(1)} Shipping
            </option>
          ))}
        </select>

        <select value={isPaid} onChange={handleIsPaidChange}>
          <option value="">All orders</option>
          <option value="paid">Paid</option>
          <option value="notPaid">Not Paid</option>
        </select>
      </div>

      <AdminOrderList orders={paginatedOrders} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </article>
  );
};

export default AdminOrdersPage;
