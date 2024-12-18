import { Product } from '../../features/shop/productApiSlice';
import ProductCart from './ProductCart';
import { getImageUrl } from '../../utils/utils';

interface ProductBarItemProps {
  product: Product;
}

const ProductBarItem = ({ product }: ProductBarItemProps) => {
  return (
    <div className="product-bar-item">
      <a href={`../product/${product.id}`}>
        <img src={getImageUrl(product.image)} alt={product.name} />
        <h2>{product.name}</h2>
      </a>
      <ProductCart isCart={false} product={product} />
    </div>
  );
};

export default ProductBarItem;
