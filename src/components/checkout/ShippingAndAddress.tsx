import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ShippingAddress,
  CreateOrder,
  OrderItem,
} from '../../features/shop/ordersSlice';
import { ShippingMethod, ShippingPrices } from '../../config/shippingConfig';

interface LocationState {
  products: OrderItem[];
  itemsPrice: number;
}

const ShippingAndAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, itemsPrice }: LocationState = location.state;

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(
    ShippingMethod.Standard
  );
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleShippingMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setShippingMethod(e.target.value as ShippingMethod);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //create order
    const order: CreateOrder = {
      products,
      shippingAddress,
      shippingMethod,
      itemsPrice: Number(itemsPrice.toFixed(2)),
      shippingPrice: calculateShippingPrice(shippingMethod),
    };

    navigate('/shop/checkout/summary', {
      state: order,
    });
  };

  const calculateShippingPrice = (method: ShippingMethod): number => {
    return ShippingPrices[method] || 0;
  };

  return (
    <article className="shipping">
      <h2 className='orders-header'>Shipping & Address</h2>
      <main>
        <form onSubmit={handleSubmit} className="address">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingAddress.address}
            onChange={handleChange}
            autoComplete='on'
            required
          />

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingAddress.city}
            onChange={handleChange}
            autoComplete='on'
            required
          />

          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleChange}
            autoComplete='on'
            required
          />

          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingAddress.country}
            onChange={handleChange}
            autoComplete='on'
            required
          />

          <label htmlFor="shippingMethod">Shipping Method:</label>
          <select
            id="shippingMethod"
            value={shippingMethod}
            onChange={handleShippingMethodChange}
            required
          >
            <option value={ShippingMethod.Standard as ShippingMethod}>
              Standard Shipping (€{ShippingPrices[ShippingMethod.Standard]})
            </option>
            <option value={ShippingMethod.Express as ShippingMethod}>
              Express Shipping (€{ShippingPrices[ShippingMethod.Express]})
            </option>
            <option value={ShippingMethod.Overnight as ShippingMethod}>
              Overnight Shipping (€{ShippingPrices[ShippingMethod.Overnight]})
            </option>
          </select>
          <div className="buttons-box">
            <button className="btn back-btn">Back to Cart</button>
            <button type="submit" className="btn save-btn">
              Order Summary
            </button>
          </div>
        </form>
      </main>
    </article>
  );
};

export default ShippingAndAddress;
