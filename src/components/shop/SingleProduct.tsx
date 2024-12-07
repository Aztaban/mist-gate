import { ReactElement, memo } from 'react';
import { useState } from 'react';
import { Product } from '../../features/shop/productApiSlice';
import ProductCart from './ProductCart';
import ProductDetails from './ProductDetails';

const SingleProduct = ({ product }: { product: Product }): ReactElement => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const imgSrc = new URL(`../../images/${product.image}`, import.meta.url).href;

  const content = (
    <article
      className={isHovered ? 'secondary-mist product' : 'product'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a className="product-anchor" href={`shop/product/${product.id}`}>
        <h3>{product.name}</h3>
        <img src={imgSrc} alt={product.name} className="product__img" />
        <ProductDetails product={product} />
      </a>
      
      <ProductCart isCart={true} product={product} />
    </article>
  );
  return content;
};

const MemoizedProduct = memo(SingleProduct);

export default MemoizedProduct;
