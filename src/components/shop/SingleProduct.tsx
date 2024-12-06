import { ReactElement, memo } from 'react';
import { useState } from 'react';
import { dateFormat, eurFormat } from '../../utils/utils';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { Product } from '../../features/shop/productApiSlice';

const SingleProduct = ({ product }: { product: Product }): ReactElement => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Check if the product is already in the cart
  const inCart = useSelector((state: RootState) =>
    state.cart.cart.some((item) => item.product === product.id)
  );
  // Handle adding to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    dispatch(
      addToCart({
        product: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
  };

  const imgSrc = new URL(`../../images/${product.image}`, import.meta.url).href;
  const countInStock = product.countInStock;

  const content = (
    <article
      className={isHovered ? 'secondary-mist product' : 'product'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a className="product-anchor" href={`shop/product/${product.id}`}>
        <h3>{product.name}</h3>
        <img src={imgSrc} alt={product.name} className="product__img" />
        <p className="product-description">{product.details.description}</p>
        <div className="product-details">
          <p>Author:</p>
          <p>{product.details.author}</p>
          <p>Release Date:</p>
          <p>{dateFormat(product.details.releaseDate ?? '')}</p>
          <p>Items In Stock:</p>
          <p>
            {countInStock > 5
              ? '5+'
              : countInStock < 1
              ? 'Out of stock'
              : countInStock}
          </p>
        </div>
      </a>
      <div className="product-cart">
        <p className="product-price">{eurFormat(product.price)}</p>
        {inCart ? (
          <button className="btn back-btn">Item in Cart</button>
        ) : (
          <button className="btn save-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
  return content;
};

const MemoizedProduct = memo(SingleProduct);

export default MemoizedProduct;
