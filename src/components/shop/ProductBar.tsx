import { useEffect, useRef, useState } from 'react';
import ProductBarItem from './ProductBarItem';
import { useGetProductsQuery } from '../../features/shop/productApiSlice';

interface ProductBarProps {
  productId: string;
}

const ProductBar = ({ productId }: ProductBarProps) => {
  const { data, isError, isLoading, isSuccess } = useGetProductsQuery();
  const productBarRef = useRef<HTMLDivElement | null>(null);
  const [visibleProducts, setVisibleProducts] = useState(1);

  const otherProducts = data?.filter(product => product.id !== productId);

  useEffect(() => {
    const calculateVisibleProducts = () => {
      if(productBarRef.current && otherProducts?.length) {
        const barWidth = productBarRef.current.offsetWidth;
        const itemWidth = 225;
        const itemsThatFit = Math.floor(barWidth / itemWidth);
        setVisibleProducts(itemsThatFit);
      }
    }

    calculateVisibleProducts();
    window.addEventListener('resize', calculateVisibleProducts);

    return () => {
      window.removeEventListener('resize', calculateVisibleProducts);
    };
  }, [otherProducts])

  if (isError) {
    return <p>No data found.</p>;
  }

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  return (
    <article ref={productBarRef} className='product-bar'>
      {isSuccess && otherProducts?.length ? (
        otherProducts.slice(0, visibleProducts).map(product => (
          <ProductBarItem key={product.id} product={product} />
        ))
      ) : (
        <p>No other product available.</p>
      )}
    </article>
  );
};

export default ProductBar;
