import { eurFormat, countTaxFree } from '../../utils/utils';

interface OrderPriceSummaryProps {
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

const OrderPriceSummary = ({
  itemsPrice,
  shippingPrice,
  totalPrice,
}: OrderPriceSummaryProps) => {
  return (
    <div className="order-field">
      <p>Items Price:</p>
      <p>{eurFormat(itemsPrice)}</p>
      <p>Shipping Price:</p>
      <p>{eurFormat(shippingPrice)}</p>
      <p>Price without Taxes:</p>
      <p>{eurFormat(countTaxFree(totalPrice))}</p>
      <p>Total Price:</p>
      <p>{eurFormat(totalPrice)}</p>
    </div>
  );
};

export default OrderPriceSummary;
