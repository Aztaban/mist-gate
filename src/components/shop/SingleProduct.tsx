import { ReactElement, memo } from 'react';
import { dateFormat, eurFormat } from '../../utils/utils';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { Product } from '../../features/shop/productApiSlice';

const SingleProduct = ({ product }: { product: Product }): ReactElement => {
  const dispatch = useDispatch();

  // Check if the product is already in the cart
  const inCart = useSelector((state: RootState) =>
    state.cart.cart.some((item) => item.product === product.id)
  );
  // Handle adding to cart
  const handleAddToCart = () => {
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

  const content = (
    <article className="product">
      <a href={`shop/product/${product.id}`}>{product.name}</a>
      <img
        src={imgSrc}
        alt={product.name}
        className="product__img green-mist"
      />
      <p className='product-description'>{product.details.description}</p>
      <div className='product-details'>
        <p className='bold'>Author:</p>
        <p className='green text-right'>{product.details.author}</p>
        <p className='bold'>Release Date:</p>
        <p className='green text-right'>{dateFormat(product.details.releaseDate)}</p>
      </div>
      <div className='product-cart'>
        <p className='green product-price'>
          {eurFormat(product.price)}
        </p>
        <button className='btn save-btn' onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </article>
  );
  return content;
};

const MemoizedProduct = memo(SingleProduct);

export default MemoizedProduct;
