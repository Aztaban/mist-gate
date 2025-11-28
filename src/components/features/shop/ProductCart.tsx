import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@features/slices/checkoutSlice';
import { RootState } from '@features/store';
import { Product } from '@types';
import { eurFormat } from '@utils';

interface ProductCartProps {
  product: Product;
  isCart: boolean;
}

const ProductCart = ({ product, isCart }: ProductCartProps) => {
  const dispatch = useDispatch();

  const inCart = useSelector((state: RootState) => state.checkout.products.some((item) => item.product === product.id));

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
        <span className="btn btn--disabled btn--sm" aria-disabled="true">
          Out of Stock
        </span>
      ) : inCart ? (
        <span className="btn btn--in-cart btn--sm">Item in Cart</span>
      ) : (
        <button type="button" className="btn btn--brand btn--sm" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCart;
