import { MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../features/shop/productSlice';
import { useEurFormatter } from '../../hooks/useEurFormatter';
import { useDateFormatter } from '../../hooks/useDateFormatter';

const SingleProductPage = () => {
  const { productId } = useParams();
  const eurCurrency = useEurFormatter();
  const navigate = useNavigate();

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

    content = (
      <article className="product-page">
        <img src={img} alt={product.name} />

        <div>
          <h3>{product.name}</h3>
          <p>{product.details.description}</p>
          <p>Author: {product.details.author}</p>
          <p>Release Date: {useDateFormatter(product.details.releaseDate)}</p>
          <p>{eurCurrency(product.price)}</p>
        </div>
      </article>
    );
  }

  return content;
};

export default SingleProductPage;
