import { Product } from '@types';
import { dateFormat } from '@utils';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const countInStock = product.countInStock;
  const { author, releaseDate, description } = product.details;

  return (
    <section className="product-details-wrapper">
      <p className="product-description">{description}</p>

      <div className="product-details surface-dark">
        <p>Author:</p>
        <p>{author || '—'}</p>

        <p>Release Date:</p>
        <p>{dateFormat(releaseDate || '')}</p>

        <p>Items In Stock:</p>
        <p>{countInStock > 5 ? '5+' : countInStock < 1 ? 'Out of stock' : countInStock}</p>
      </div>
    </section>
  );
};

export default ProductDetails;
