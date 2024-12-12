import { useGetOrderByIdQuery } from "../features/shop/ordersApiSlice";

const useOrder = (orderId: string) => {
  const { data, isLoading, isError, error } = useGetOrderByIdQuery(
    orderId || ''
  );

  return { order: data, isLoading, isError, error };
};

export default useOrder;
