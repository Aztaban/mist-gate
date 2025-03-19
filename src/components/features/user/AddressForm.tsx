import { ReactElement, useState, useEffect } from 'react';
import { ShippingAddress } from '@types';
import { useUpdateUserAddressMutation } from '@features/apiSlices/userApiSlice';

interface AddressFormProps {
  initialAddress: ShippingAddress | null
}

const emptyAddress: ShippingAddress = {
  name: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
};

const AddressForm = ({ initialAddress }: AddressFormProps): ReactElement => {
  const [address, setAddress] = useState<ShippingAddress>(initialAddress ?? emptyAddress);

  const [updateUserAddress] = useUpdateUserAddressMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateUserAddress({ address }); 
  };

  useEffect(() => {
    setAddress(initialAddress ?? emptyAddress); // Update if initialAddress changes
  }, [initialAddress]);

  return (
    <form className="address-form" onSubmit={handleSave}>
      <h3>Address:</h3>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={address.name}
        onChange={handleChange}
      />
      <label>Street:</label>
      <input
        type="text"
        name="street"
        value={address.street}
        onChange={handleChange}
      />

      <label>City:</label>
      <input
        type="text"
        name="city"
        value={address.city}
        onChange={handleChange}
      />

      <label>Postal Code:</label>
      <input
        type="text"
        name="postalCode"
        value={address.postalCode}
        onChange={handleChange}
      />

      <label>Country:</label>
      <input
        type="text"
        name="country"
        value={address.country}
        onChange={handleChange}
      />

      <button type="submit" disabled={address === initialAddress}>Save Address</button>
    </form>
  );
};

export default AddressForm;
