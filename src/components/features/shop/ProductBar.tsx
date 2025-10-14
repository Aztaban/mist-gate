import ProductCard from './ProductCard';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '@features/apiSlices/productApiSlice';
import { RootState } from '@features/store';

type FilterMode = 'all' | 'inCart' | 'notInCart';

interface ProductBarProps {
  productId: string;
  filterMode?: FilterMode; // default 'all'
}

const ProductBar = ({ productId, filterMode = 'all' }: ProductBarProps) => {
  const { data, isError, isLoading, isSuccess } = useGetProductsQuery();

  // get product ids currently in the cart
  const cartProductIds = useSelector((s: RootState) => s.checkout.products.map((i) => i.product));
  const cartIdSet = useMemo(() => new Set(cartProductIds), [cartProductIds]);

  if (isError) return <p>No data found.</p>;
  if (isLoading) return <p>Loading data...</p>;

  const otherProducts = (data ?? []).filter((p) => p.id !== productId);

  const filtered = otherProducts.filter((p) => {
    if (filterMode === 'inCart') return cartIdSet.has(p.id);
    if (filterMode === 'notInCart') return !cartIdSet.has(p.id);
    return true; // 'all'
  });

  return (
    <section className="product-bar">
      <div className="product-bar__scroller">
        {isSuccess && filtered.length ? (
          filtered.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="product-bar__empty">No products match this filter.</p>
        )}
      </div>
    </section>
  );
};

export default ProductBar;
