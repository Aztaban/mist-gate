import { ShippingAddress } from "../../features/apiSlices/ordersApiSlice";

interface AddressProps {
  address: ShippingAddress;
}

const Address = ({ address }: AddressProps) => {
  return (
    <div className="cart-summary">
      <p>Address:</p>
      <p>{address.street}</p>
      <p>City:</p>
      <p>{address.city}</p>
      <p>Postal code: </p>
      <p>{address.postalCode}</p>
      <p>Country: </p>
      <p>{address.country}</p>
    </div>
  );
};

export default Address;
