import { useGetProductsQuery } from '@features/apiSlices/productApiSlice';
import { useGetCategoriesQuery } from '@features/apiSlices/categoryApiSlice';
import { useState, ChangeEvent, useMemo } from 'react';
import AdminProductsList from './AdminProductsList';
import { NavLink } from 'react-router-dom';

const AdminProductsPage = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categoryOptions = useMemo(
    () => [{ label: 'All categories', value: '' }, ...categories.map((c) => ({ label: c.name, value: c.id }))],
    [categories]
  );

  const finalFiltered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    // 1) search
    const searchFiltered = !q
      ? products
      : products.filter((p) => {
          const name = p.name.toLowerCase();
          const author = (p.details?.author ?? '').toLowerCase();
          return name.includes(q) || author.includes(q);
        });

    // 2) category ('' means All)
    if (!selectedCategory) return searchFiltered;

    const categoryFiltered = searchFiltered.filter((p) => {
      return p.category.id === selectedCategory; // if mismatch, try String(p.category) === selectedCategory
    });

    return categoryFiltered;
  }, [products, searchTerm, selectedCategory]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value);

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <section className="products-page">
      <header className="section-bar surface-dark">
        <h1 className="section-bar__title">Admin Products</h1>

        <div className="products-toolbar">
          <NavLink to="/admin/products/new" className="btn btn--brand btn--sm">
            New Product
          </NavLink>

          <div className="products-toolbar__filters">
            <input
              type="text"
              placeholder="search by name or author"
              value={searchTerm}
              onChange={handleSearch}
              className="search-bar btn--sm"
            />

            <select
              id="products-category"
              className="form__control btn--sm"
              value={selectedCategory}
              onChange={handleCategoryChange}>
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
      {finalFiltered.length === 0 ? (
        <p>No products match “{searchTerm}”.</p>
      ) : (
        <AdminProductsList products={finalFiltered} />
      )}
    </section>
  );
};

export default AdminProductsPage;
