import { useGetAllOrdersQuery } from '../../features/shop/ordersSlice'

const Admin = () => {
  const {data, isLoading, isError } = useGetAllOrdersQuery();

  if (isLoading) {
    return <p>Orders are loading...</p>
  }

  if (isError) {
    return <p>Error loading orders.</p>
  }

  console.log(data);

  return (
    <div>
      Admin
    </div>
  )
}

export default Admin
