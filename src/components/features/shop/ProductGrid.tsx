import { useGetProductsQuery } from '@features/apiSlices/productApiSlice';
import ProductCard from './ProductCard';
import { Product } from '@types';

export default function ProductGrid() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <p className="muted">Loading…</p>;
  if (isError || !products?.length) return <p className="muted">No products found.</p>;

  return (
    <section className="shop-grid" aria-label="Books">
      {products.map((p: Product) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
