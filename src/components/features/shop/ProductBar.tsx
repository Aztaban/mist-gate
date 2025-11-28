import ProductCard from './ProductCard';
import { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useGetProductsQuery } from '@features/apiSlices/productApiSlice';
import type { RootState } from '@features/store';

interface ProductBarProps {
  productId: string;
}

const ProductBar = ({ productId }: ProductBarProps) => {
  const { data, isError, isLoading, isSuccess } = useGetProductsQuery();

  // cart product ids (use shallowEqual to avoid the “new reference” warning)
  const cartProductIds = useSelector((s: RootState) => s.checkout.products.map((i) => i.product), shallowEqual);
  const cartIdSet = useMemo(() => new Set(cartProductIds), [cartProductIds]);

  if (isError) return <p>No data found.</p>;
  if (isLoading) return <p>Loading data...</p>;

  // exclude the current product AND anything already in the cart
  const filtered = (data ?? []).filter((p) => p.id !== productId).filter((p) => !cartIdSet.has(p.id));

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
