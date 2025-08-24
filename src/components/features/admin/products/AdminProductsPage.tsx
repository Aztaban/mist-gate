import { useGetProductsQuery } from '@features/apiSlices/productApiSlice';
import { useGetCategoriesQuery } from '@features/apiSlices/categoryApiSlice';
import { useState, ChangeEvent, useMemo } from 'react';
import AdminProductsList from './AdminProductsList';
import { NavLink } from 'react-router-dom';

const AdminProductsPage = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [searchTerm, setSearchTerm] = useState<string>('');

  // id -> name map for quick lookup in search
  const catNameById = useMemo(() => new Map(categories.map((c) => [c.id, c.name])), [categories]);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      const name = p.name.toLowerCase();
      const author = (p.details?.author ?? '').toLowerCase();
      const categoryName = (catNameById.get(p.category) ?? '').toLowerCase();
      return name.includes(q) || author.includes(q) || categoryName.includes(q);
    });
  }, [products, searchTerm, catNameById]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <article className="orders-main-page">
      <h2 className="header-wraper">
        <p>Admin Products</p>

        {/* Use link styled as a button to avoid nesting interactive elements */}
        <NavLink to="/admin/products/new" className="btn back-btn">
          New Product
        </NavLink>

        <input
          type="text"
          placeholder="search by name, author, or category"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </h2>

      {filteredProducts.length === 0 ? (
        <p>No products match “{searchTerm}”.</p>
      ) : (
        <AdminProductsList products={filteredProducts} />
      )}
    </article>
  );
};

export default AdminProductsPage;
