import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../features/shop/productSlice';
import { dateFormat, eurFormat } from '../../utils/utils';
import useCart from '../../hooks/useCart';

const SingleProductPage = () => {
  const { productId } = useParams();
  const { dispatch, REDUCER_ACTIONS } = useCart();

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
    const onAddToCart = () => {
      dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });
    };

    const img: string = new URL(
      `../../images/${product.image}`,
      import.meta.url
    ).href;

    content = (
      <article className="product-page">
        <img src={img} alt={product.name} />

        <div>
          <h2>{product.name}</h2>
          <p>{product.details.description}</p>
          <p>Author: {product.details.author}</p>
          <p>Release Date: {dateFormat(product.details.releaseDate)}</p>
          <div>
            <p>{eurFormat(product.price)}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
          </div>
        </div>
      </article>
    );
  }

  return content;
};

export default SingleProductPage;
