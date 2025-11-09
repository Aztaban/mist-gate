import ProductCard from './ProductCard';
import { Product } from '@types';

type Props = { products: Product[] };

export default function ProductGrid({ products }: Props) {
  return (
    <section className="shop-grid" aria-label="Books">
      {products.map((p: Product) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
