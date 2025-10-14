import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@features/apiSlices/productApiSlice';
import ProductCart from './ProductCart';
import ProductDetails from './ProductDetails';
import ProductBar from './ProductBar';

const SingleProductPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, isSuccess, isError } = useGetProductByIdQuery(productId || '');

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <section>
        <h2>Product not found!</h2>
      </section>
    );
  if (!isSuccess || !product) return null;

  return (
    <section className="product-view page-stack">
      {/* Section header (same as License/Contact) */}
      <header className="section-bar surface-dark">
        <h1 className="section-bar__title">{product.name}</h1>
      </header>

      {/* Main panel */}
      <article className="product__page surface-dark">
        <figure className="product__media">
          <img src={product.imageUrl} alt={product.name} />
        </figure>

        <div className="product__body">
          <h2 className="product__title">{product.name}</h2>
          <ProductDetails product={product} />
          <ProductCart isCart={true} product={product} />
        </div>
      </article>

      {/* Bottom bar / related */}
      <ProductBar productId={product.id} filterMode="notInCart" />
    </section>
  );
};

export default SingleProductPage;
