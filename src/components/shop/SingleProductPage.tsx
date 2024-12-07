import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../features/shop/productApiSlice';
import ProductCart from './ProductCart';
import ProductDetails from './ProductDetails';
import ProductBar from './ProductBar';

const SingleProductPage = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductByIdQuery(productId || '');

  let content = <p>nothing</p>;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <section>
        <h2>Product not found!</h2>
      </section>
    );
  }

  if (isSuccess) {
    const img: string = new URL(
      `../../images/${product.image}`,
      import.meta.url
    ).href;

    content = (<>
      <article className="product__page">
        <img src={img} alt={product.name}/>

        <div className="product__page-div">
          <h2>{product.name}</h2>
          <ProductDetails product={product} />
          <ProductCart isCart={true} product={product} />
        </div>
      </article>
    <ProductBar productId={product.id} />
    </>
    );
  }

  return content;
};

export default SingleProductPage;
