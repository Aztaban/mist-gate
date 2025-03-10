import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/slices/checkoutSlice';
import { RootState } from '../../features/store';
import { useSelector } from 'react-redux';
import { Product } from '../../types';
import { eurFormat } from '../../utils/utils';

interface ProductCartProps {
  product: Product;
  isCart: boolean;
}

const ProductCart = ({ product, isCart }: ProductCartProps) => {
  const dispatch = useDispatch();
  // Check if the product is already in the cart
  const inCart = useSelector((state: RootState) =>
    state.checkout.products.some((item) => item.product === product.id)
  );

  const isOutOfStock = product.countInStock < 1;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        product: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
  };

  return (
    <div className={isCart ? 'product-cart' : 'product-bar-cart'}>
      <p className="product-price">{eurFormat(product.price)}</p>
      {isOutOfStock ? (
        <p className='out-of-stock back-btn'>Out of Stock</p>
      ) : inCart ? (
        <p className='out-of-stock back-btn'>Item in Cart</p>
      ) : (
        <button className="btn save-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCart;
