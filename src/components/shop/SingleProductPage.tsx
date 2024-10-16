import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../features/shop/productSlice';
import { dateFormat, eurFormat } from '../../utils/utils';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';

const SingleProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const inCart = useSelector((state: RootState) =>
    state.cart.cart.some((item) => item.id === productId)
  );

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
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
        })
      );
    };

    const img: string = new URL(
      `../../images/${product.image}`,
      import.meta.url
    ).href;

    const itemInCart = inCart ? ' → Item in Cart: ✔️' : null;

    content = (
      <article className="product__page">
        <img src={img} alt={product.name} />

        <div>
          <h2>{product.name}</h2>
          <p>{product.details.description}</p>
          <p>Author: {product.details.author}</p>
          <p>Release Date: {dateFormat(product.details.releaseDate)}</p>
          <div>
            <p>{eurFormat(product.price)}{itemInCart}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
          </div>
        </div>
      </article>
    );
  }

  return content;
};

export default SingleProductPage;
