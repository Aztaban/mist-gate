import { ReactElement, memo } from 'react';
import { useGetProductByIdQuery } from '../../features/shop/productApiSlice';
import { eurFormat } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';
import { CartItem } from '../../features/cart/cartSlice';
import QuantityInput from '../common/QuantityInput';

const CartLineItem = ({ item }: { item: CartItem }): ReactElement => {
  const dispatch = useDispatch();
  const { data: product } = useGetProductByIdQuery(item.product || '');

  const img: string = new URL(`../../images/${product?.image}`, import.meta.url)
    .href;

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      if (
        window.confirm(
          'Are you sure you want to remove this item from the cart?'
        )
      ) {
        dispatch(removeFromCart({ product: item.product }));
      } else {
        updateQuantity({ product: item.product, quantity: 1 });
      }
    } else {
      dispatch(
        updateQuantity({ product: item.product, quantity: newQuantity })
      );
    }
  };

  const content = (
    <li className="cart__item">
      <div className="cart__item-top">
        <img src={img} alt={item.name} />
        <a href={`/shop/product/${item.product}`}> {item.name} </a>
      </div>
      <div className="cart__item-bottom">
        <QuantityInput
          quantity={item.quantity}
          onUpdate={handleUpdateQuantity}
        />
        {item.quantity > 1 ? <p>{eurFormat(item.price)} / pc</p> : null}
        <p aria-label="Line Item Subtotal">
          {eurFormat(item.quantity * item.price)}
        </p>
      </div>
    </li>
  );

  return content;
};

const MemoizedCardLineItem = memo(CartLineItem);

export default MemoizedCardLineItem;
