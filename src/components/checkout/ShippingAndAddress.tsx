import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ShippingAddress,
  CreateOrder,
  OrderItem,
} from '../../features/shop/ordersSlice';

interface LocationState {
  products: OrderItem[];
  itemsPrice: number;
}

const ShippingAndAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, itemsPrice }: LocationState = location.state;

  const [shippingMethod, setShippingMethod] = useState<string>('standard');
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

  const handleShippingMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShippingMethod(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //create order
    const order: CreateOrder = {
      products,
      shippingAddress,
      itemsPrice,
      shippingPrice: calculateShippingPrice(shippingMethod),
    };

    console.log('Order: ', order);
    navigate('/shop/checkout/summary', {
      state: order,
    });
  };

    // Function to calculate shipping price based on selected method
    const calculateShippingPrice = (method: string): number => {
      switch (method) {
        case 'express':
          return 15; // Example price for express shipping
        case 'standard':
          return 5; // Example price for standard shipping
        case 'overnight':
          return 25; // Example price for overnight shipping
        default:
          return 0; // Default to 0 if no method matches
      }
    };

  return (
    <article>
      <h2>Shipping & Address</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={shippingAddress.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={shippingAddress.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="postalCode">Postal Code:</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={shippingAddress.postalCode}
          onChange={handleChange}
          required
        />

        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={shippingAddress.country}
          onChange={handleChange}
          required
        />
        <div>
          <label htmlFor="shippingMethod">Shipping Method:</label>
          <select
            id="shippingMethod"
            value={shippingMethod}
            onChange={handleShippingMethodChange}
            required
          >
            <option value="standard">Standard Shipping ($5)</option>
            <option value="express">Express Shipping ($15)</option>
            <option value="overnight">Overnight Shipping ($25)</option>
          </select>
        </div>

        <button type="submit">Order Summary</button>
      </form>
    </article>
  );
};

export default ShippingAndAddress;
