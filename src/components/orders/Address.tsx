import { ShippingAddress } from "../../features/shop/ordersSlice"

interface AddressProps  {
  address: ShippingAddress;
}

const Address = ({ address} :AddressProps) => {
  return (
    <div>
    <h3>Address</h3>
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
  </div>
  )
}

export default Address
