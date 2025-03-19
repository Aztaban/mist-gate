import { ReactElement, memo } from 'react';
import { useGetProductByIdQuery } from '@features/apiSlices/productApiSlice';
import { eurFormat, getImageUrl } from '@utils';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@features/slices/checkoutSlice';
import { OrderItem } from '@types';
import QuantityInput from '@components/common/QuantityInput';

const CartLineItem = ({ item }: { item: OrderItem }): ReactElement => {
  const dispatch = useDispatch();
  const { data: product } = useGetProductByIdQuery(item.product || '');

  if (!product) return <></>;

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
        <img src={getImageUrl(product?.image)} alt={item.name} />
        <a href={`/shop/product/${item.product}`}> {item.name} </a>
      </div>
      <div className="cart__item-bottom">
        <QuantityInput
          quantity={item.quantity}
          onUpdate={handleUpdateQuantity}
          max={product.countInStock}
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
