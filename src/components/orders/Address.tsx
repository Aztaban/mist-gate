import { ShippingAddress } from '../../features/shop/ordersApiSlice';

interface AddressProps {
  address: ShippingAddress;
}

const Address = ({ address }: AddressProps) => {
  return (
    <div className="order-field">
      <p>Address:</p>
      <p>{address.address}</p>
      <p>City, postal code:</p>
      <p>
        {address.city}, {address.postalCode}
      </p>
      <p>Country: </p>
      <p>{address.country}</p>
    </div>
  );
};

export default Address;
