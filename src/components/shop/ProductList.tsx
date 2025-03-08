import { useGetProductsQuery } from '../../features/apiSlices/productApiSlice';
import { ReactElement } from 'react';
import SingleProduct from './SingleProduct';

const ProductList = () => {
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
      return (
        <SingleProduct
          key={product.id}
          product={product}
        />
      );
    });
  }
  const content = <>{pageContent}</>;

  return content;
};

export default ProductList;
