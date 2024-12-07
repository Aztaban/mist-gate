import { Product } from '../../features/shop/productApiSlice';
import ProductCart from './ProductCart';

interface ProductBarItemProps {
  product: Product;
}

const ProductBarItem = ({ product }: ProductBarItemProps) => {
  const img: string = new URL(`../../images/${product.image}`, import.meta.url)
    .href;
  return (
    <div className="product-bar-item">
      <img src={img} alt={product.name} />
      <h2><a href={`../product/${product.id}`}>{product.name}</a></h2>
      <ProductCart isCart={false} product={product} />
    </div>
  );
};

export default ProductBarItem;
