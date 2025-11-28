import { ReactElement, useState, useEffect } from 'react';
import { ShippingAddress } from '@types';
import { useUpdateUserAddressMutation } from '@features/apiSlices/userApiSlice';

interface AddressFormProps {
  initialAddress: ShippingAddress | null;
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your address?');
    if (!confirmDelete) return;

    try {
      await updateUserAddress({ address: emptyAddress }).unwrap();
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
      await updateUserAddress({ address }).unwrap();
      alert('Address saved successfully!');
    } catch (error) {
      console.error('Failed to save address:', error);
      alert('Failed to save address');
    }
  };

  const isAddressEmpty =
    address.name === '' &&
    address.street === '' &&
    address.city === '' &&
    address.postalCode === '' &&
    address.country === '';

  useEffect(() => {
    setAddress(initialAddress ?? emptyAddress); // Update if initialAddress changes
  }, [initialAddress]);

  return (
    <form className="address-form surface-dark" onSubmit={handleSave}>
      <h3 className="section__subtitle">Address</h3>

      <div className="form__field">
        <label htmlFor="addr_name">Name</label>
        <input id="addr_name" name="name" value={address.name} onChange={handleChange} />
      </div>

      <div className="form__field">
        <label htmlFor="addr_street">Street</label>
        <input id="addr_street" name="street" value={address.street} onChange={handleChange} />
      </div>

      <div className="form__field">
        <label htmlFor="addr_city">City</label>
        <input id="addr_city" name="city" value={address.city} onChange={handleChange} />
      </div>

      <div className="form__field">
        <label htmlFor="addr_postal">Postal Code</label>
        <input id="addr_postal" name="postalCode" value={address.postalCode} onChange={handleChange} />
      </div>

      <div className="form__field">
        <label htmlFor="addr_country">Country</label>
        <input id="addr_country" name="country" value={address.country} onChange={handleChange} />
      </div>

      <div className="form__actions">
        <button
          className="btn btn--brand btn--sm"
          type="submit"
          disabled={address === (initialAddress ?? emptyAddress)}>
          Save Address
        </button>
        <button className="btn btn--del btn--sm" type="button" disabled={isAddressEmpty} onClick={handleDelete}>
          Delete Address
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
