// ProductCard.tsx
import { NavLink } from 'react-router-dom';
import { Product } from '@types';
import { eurFormat } from '@utils'; // <- wherever you exported it

type Props = {
  product: Product;
  onAdd?: (p: Product) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  const href = `/shop/product/${product.id}`;
  const img = product.imageUrl || product.image;

  return (
    <article className="pcard">
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
          <button
            type="button"
            className="btn btn--brand btn--sm"
            onClick={() => onAdd?.(product)}
            disabled={!product.countInStock}
            aria-disabled={!product.countInStock}>
            {product.countInStock ? 'Add to cart' : 'Out'}
          </button>
        </div>
      </div>
    </article>
  );
}
