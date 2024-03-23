import useCart from '../../hooks/useCart';
import { useGetProductsQuery } from '../../features/shop/productSlice';
import { ReactElement } from 'react';
import Product from './Product';

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
  } = useGetProductsQuery();

  let pageContent: ReactElement | ReactElement[] = <p></p>;

  if (isLoading) {
    pageContent = <p>Loading...</p>;
  }

  if (isError) {
    pageContent = <p>No products found.</p>;
  }

  if (isSuccess && products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.id === product.id);

      return (
        <Product
          key={product.id}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }
  const content = (
    <>
      {pageContent}
    </>
  )

  return content;
};

export default ProductList;
