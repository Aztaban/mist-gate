import { ChangeEvent, ReactElement, memo } from 'react';
import { useGetProductByIdQuery } from '../../features/shop/productSlice';
import { eurFormat } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';
import { CartItem } from '../../features/cart/cartSlice';

const CartLineItem = ({ item }: { item: CartItem }): ReactElement => {
  const dispatch = useDispatch();
  const { data: product } = useGetProductByIdQuery(item.product || '');

  const img: string = new URL(`../../images/${product?.image}`, import.meta.url)
    .href;
  const lineTotal: number = item.quantity * item.price;
  const highestQty: number = 10;
  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );
  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateQuantity({ product: item.product, quantity: Number(e.target.value) }));
  };

  const onRemoveFromCart = () => {
    dispatch(removeFromCart({ product: item.product }));
  };

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div className="cart__item--box">
        <div className="cart__item--top">
          <div aria-label="Item Name">{item.name}</div>
          <div aria-label="Price Per Item">{eurFormat(item.price)}</div>

        </div>
        <div className="cart__item--bot">
          <label htmlFor="itemQty">Item Quantity</label>
          <select
            name="itemQty"
            id="itemQty"
            className="cart__select"
            value={item.quantity}
            aria-label="Item Quantity"
            onChange={onChangeQty}
          >
            {options}
          </select>
          <p>Total price:</p>
          <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
            {eurFormat(lineTotal)}
          </div>
        </div>
        
      </div>
      <button
            className="cart__item--del-btn"
            aria-label="Remove Item From Cart"
            title="Remove Item From Cart"
            onClick={onRemoveFromCart}
          >
            X
          </button>
    </li>
  );

  return content;
};

const MemoizedCardLineItem = memo(CartLineItem);

export default MemoizedCardLineItem;
