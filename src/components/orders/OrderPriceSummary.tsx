import { eurFormat, countTaxFree } from '../../utils/utils';

interface OrderPriceSummaryProps {
  itemsPrice: number;
  shippingPrice: number;
}

const OrderPriceSummary = ({
  itemsPrice,
  shippingPrice,
}: OrderPriceSummaryProps) => {
  const totalPrice = itemsPrice + shippingPrice;
  return (
    <div className="cart-summary cart-summary-right">
      <p>Items Price:</p>
      <p>{eurFormat(itemsPrice)}</p>
      <p>Shipping Price:</p>
      <p>{eurFormat(shippingPrice)}</p>
      <p>Without Tax:</p>
      <p>{eurFormat(countTaxFree(totalPrice))}</p>
      <p>Total Price:</p>
      <p>{eurFormat(totalPrice)}</p>
    </div>
  );
};

export default OrderPriceSummary;
