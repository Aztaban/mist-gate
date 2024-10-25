import { ReactElement, memo } from 'react';
import { dateFormat, eurFormat } from '../../utils/utils';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { ProductType } from '../../features/shop/productSlice';

const Product = ({ product }: { product: ProductType }): ReactElement => {
  const dispatch = useDispatch();

  // Check if the product is already in the cart
  const inCart = useSelector((state: RootState) =>
    state.cart.cart.some((item) => item.id === product.id)
  );
  // Handle adding to cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
  };

  const imgSrc = new URL(`../../images/${product.image}`, import.meta.url).href;

  const itemInCart = inCart ? ' → Item in Cart: ✔️' : null;

  const content = (
    <article className="product">
      <img src={imgSrc} alt={product.name} className="product__img" />
      <a href={`shop/product/${product.id}`}>{product.name}</a>
      <p>{product.details.description}</p>
      <p>Author: {product.details.author}</p>
      <p>Release Date: {dateFormat(product.details.releaseDate)}</p>
      <div>
        <p>
          {eurFormat(product.price)}
          {itemInCart}
        </p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </article>
  );
  return content;
};

const MemoizedProduct = memo(Product);

export default MemoizedProduct;
