import { Product } from '@types';
import ProductCart from './ProductCart';
import { useNavigate } from 'react-router-dom';

interface ProductBarItemProps {
  product: Product;
}

const ProductBarItem = ({ product }: ProductBarItemProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(`../product/${product.id}`);

  return (
    <div className="product-bar-item" onClick={handleNavigate}>
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <ProductCart isCart={false} product={product} />
    </div>
  );
};

export default ProductBarItem;
