import { Product } from '@types';
import { dateFormat } from '@utils';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const countInStock = product.countInStock;
  return (
    <div>
      <p className="product-description">{product.details.description}</p>
      <div className="product-details">
        <p>Author:</p>
        <p>{product.details.author}</p>
        <p>Release Date:</p>
        <p>{dateFormat(product.details.releaseDate || '')}</p>
        <p>Items In Stock:</p>
        <p>
          {countInStock > 5
            ? '5+'
            : countInStock < 1
            ? 'Out of stock'
            : countInStock}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
