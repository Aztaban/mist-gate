import { ReactElement, memo } from 'react';
import { useGetProductByIdQuery } from '@features/apiSlices/productApiSlice';
import { eurFormat } from '@utils';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@features/slices/checkoutSlice';
import { OrderItem } from '@types';
import QuantityInput from '@components/common/inputs/QuantityInput';

const CartLineItem = ({ item }: { item: OrderItem }): ReactElement => {
  const dispatch = useDispatch();
  const { data: product } = useGetProductByIdQuery(item.product || '');

  if (!product) return <></>;

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      if (window.confirm('Are you sure you want to remove this item from the cart?')) {
        dispatch(removeFromCart({ product: item.product }));
      } else {
        updateQuantity({ product: item.product, quantity: 1 });
      }
    } else {
      dispatch(updateQuantity({ product: item.product, quantity: newQuantity }));
    }
  };

  const unitPrice = eurFormat(item.price);
  const lineTotal = eurFormat(item.quantity * item.price);

  const content = (
    <li className="cart-item surface-dark">
      <div className="cart-item__thumb">
        <img src={product.imageUrl} alt={item.name} />
      </div>

      <div className="cart-item__title">
        <p className="cart-item__name">
          <a href={`/shop/product/${item.product}`}>{item.name}</a>
        </p>
        <div className="cart-item__qty">
          <QuantityInput quantity={item.quantity} onUpdate={handleUpdateQuantity} max={product.countInStock} />
        </div>
      </div>

      {/* unit price (hidden on small screens via CSS) */}
      <div className="cart-item__unit">
        <span className="price price--muted">{unitPrice} / pc</span>
      </div>

      {/* line total */}
      <div className="cart-item__total" aria-label="Line Item Subtotal">
        <span className="price price--brand">{lineTotal}</span>
      </div>
    </li>
  );

  return content;
};

const MemoizedCardLineItem = memo(CartLineItem);

export default MemoizedCardLineItem;
