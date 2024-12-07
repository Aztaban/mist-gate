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
      <a href={`../product/${product.id}`}>
        <img src={img} alt={product.name} />
        <h2>{product.name}</h2>
      </a>
      <ProductCart isCart={false} product={product} />
    </div>
  );
};

export default ProductBarItem;
