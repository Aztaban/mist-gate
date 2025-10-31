import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@features/slices/checkoutSlice';
import { RootState } from '@features/store';
import { Product } from '@types';
import { eurFormat } from '@utils';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();

  const inCart = useSelector((state: RootState) => state.checkout.products.some((item) => item.product === product.id));

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

  const href = `/shop/product/${product.id}`;
  const img = product.imageUrl || product.image;

  return (
    <article className="pcard surface-dark">
      <NavLink to={href} className="pcard__media" aria-label={product.name}>
        <img src={img} alt={product.name} loading="lazy" />
      </NavLink>

      <div className="pcard__body">
        <NavLink to={href} className="pcard__title">
          {product.name}
        </NavLink>
        <p className="pcard__author">{product.details?.author}</p>

        <div className="pcard__meta">
          <span className="pcard__price">{eurFormat(product.price)}</span>

          {product.countInStock < 1 ? (
            <span className="btn btn--disabled btn--sm" aria-disabled="true">
              Out of Stock
            </span>
          ) : inCart ? (
            <NavLink to="/checkout" className="btn btn--in-cart btn--sm">
              In Cart
            </NavLink>
          ) : (
            <button type="button" className="btn btn--brand btn--sm" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
