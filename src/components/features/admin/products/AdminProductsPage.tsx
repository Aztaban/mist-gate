import { useGetProductsQuery } from '@features/apiSlices/productApiSlice';
import { useState, ChangeEvent, useMemo } from 'react';
import AdminProductsList from './AdminProductsList';
import { NavLink } from 'react-router-dom';

const AdminProductsPage = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <article className="orders-main-page">
      <h2 className="header-wraper">
        <p>Admin Products</p>
        <button className="btn back-btn">
          <NavLink to={'/admin/products/product'}>New Product</NavLink>
        </button>
        <input
          type="text"
          placeholder="search product"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </h2>
      <AdminProductsList products={filteredProducts} />
    </article>
  );
};

export default AdminProductsPage;
