import { useGetProductsQuery } from '@features/apiSlices/productApiSlice';
import ProductGrid from './ProductGrid';
import { NavLink, useSearchParams } from 'react-router-dom';

export default function Shop() {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [params] = useSearchParams();
  const q = (params.get('q') ?? '').trim().toLowerCase();

  const filtered = q
    ? products.filter((p) =>
        [p.name, p.details?.author].filter(Boolean).some((f) => String(f).toLowerCase().includes(q))
      )
    : products;

  if (isLoading) return <p className="muted">Loading…</p>;
  if (isError || !products?.length || !filtered.length)
    return (
      <div className="surface-dark section">
        <p className="muted">No products found.</p>
        <button className="btn btn--brand">
          <NavLink to="shop" end>
            Back to shop
          </NavLink>
        </button>
      </div>
    );

  return (
    <main className="shop container">
      {q && <p className="muted">Results for “{params.get('q')}”</p>}
      <ProductGrid products={filtered} />
    </main>
  );
}
