import { ProductType } from '../../features/shop/productSlice';
import { ReducerActionType, ReducerAction } from '../../context/CartProvider';
import { ReactElement, memo } from 'react';
import { dateFormat, eurFormat } from '../../utils/utils';

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};



const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropsType): ReactElement => {
  const img: string = new URL(`../../images/${product.image}`, import.meta.url)
    .href;

  const onAddToCart = () =>{
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });
  }

  const itemInCart = inCart ? ' → Item in Cart: ✔️' : null;


  const content = (
    <article className="product">
      <img src={img} alt="{product.name}" className="product__img" />
      <a href={`shop/product/${product.id}`}>{product.name}</a>
      <p>{product.details.description}</p>
      <p>Author: {product.details.author}</p>
      <p>Release Date: {dateFormat(product.details.releaseDate)}</p>
      <div>      
        <p>{eurFormat(product.price)}{itemInCart}</p>
        <button onClick={onAddToCart}>Add to Cart</button>
      </div>
    </article>
  );
  return content;
};

function areProductsEqual(
  { product: prevProduct }: PropsType,
  { product: nextProduct }: PropsType
) {
  return Object.keys(prevProduct).every((key) => {
    return (
      prevProduct[key as keyof ProductType] ===
      nextProduct[key as keyof ProductType]
    );
  });
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
