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

  const handleDelete = async() => {
    const confirmDelete = window.confirm("Are you sure you want to delete your address?");
    if (!confirmDelete) return;

    try {
      await updateUserAddress({address: emptyAddress}).unwrap();
      setAddress(emptyAddress);
      alert('Address deleted successfully!');
    } catch (error) {
      console.error('Failed to delete address:', error);  
      alert('Failed to delete address');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserAddress({address}).unwrap();
      alert('Address saved successfully!');
    } catch (error) {
      console.error('Failed to save address:', error);  
      alert('Failed to save address');
    }
  };

  const isAddressEmpty = (
    address.name === '' &&
    address.street === '' &&
    address.city === '' &&
    address.postalCode === '' &&
    address.country === ''
  );

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
      <button className="del-btn" type="button" disabled={isAddressEmpty} onClick={handleDelete}>Delete Address</button>
    </form>
  );
};

export default AddressForm;
