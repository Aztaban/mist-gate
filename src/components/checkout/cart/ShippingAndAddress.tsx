import { useState, useEffect } from 'react';
import { ShippingAddress } from '../../../features/shop/ordersApiSlice';
import { ShippingMethod, ShippingPrices } from '../../../config/shippingConfig';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCheckout,
  selectCheckout,
} from '../../../features/checkout/checkoutSlice';
import { validateAddress } from '../../../hooks/useValidateAddress';
import {
  useGetUserQuery,
  useUpdateUserAddressAndPhoneMutation,
} from '../../../features/user/userApiSlice';

interface ShippingAndAddressProps {
  onNext: () => void;
  onPrevious: () => void;
}

const ShippingAndAddress = ({
  onNext,
  onPrevious,
}: ShippingAndAddressProps) => {
  const dispatch = useDispatch();
  const currentCheckout = useSelector(selectCheckout);
  const { data: user } = useGetUserQuery();

  const [updateUserAddressAndPhone] = useUpdateUserAddressAndPhoneMutation();
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [saveAddress, setSaveAddress] = useState<boolean>(false);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(
    currentCheckout.shippingMethod || ShippingMethod.Standard
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    currentCheckout.phoneNumber || ''
  );
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    currentCheckout.shippingAddress || {
        name: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
      }
  );

  useEffect(() => {
    if (!currentCheckout.shippingAddress && user?.address) {
      setShippingAddress(user.address);
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleShippingMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedMethod = e.target.value as ShippingMethod;
    setShippingMethod(selectedMethod);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const validateAndSave = (): boolean => {
    const errors: Record<string, boolean> = validateAddress(shippingAddress);
    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(setCheckout({ shippingAddress, shippingMethod, phoneNumber }));
      return true;
    }

    return false;
  };

  const handleNext = async () => {
    if (validateAndSave()) {
      if (saveAddress && user?.id) {
        try {
          await updateUserAddressAndPhone({
            updates: { address: shippingAddress, phoneNumber },
          }).unwrap();
          console.log('Address saved successfully!');
        } catch (error) {
          console.error('Failed to save address:', error);
        }
      }
      onNext();
    }
  };

  return (
    <>
      <h2>2. Shipping and Address</h2>
      <article className="checkout checkout-spaced">
        <form className="address">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={shippingAddress.name}
            onChange={handleChange}
            required
            autoComplete="on"
          />
          <label htmlFor="phoneNumber">Phone Number (Optional):</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            autoComplete="on"
          />
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={shippingAddress.street}
            onChange={handleChange}
            autoComplete="on"
            required
          />
          {fieldErrors.street && (
            <p className="errmsg">Street is required.</p>
          )}
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingAddress.city}
            onChange={handleChange}
            autoComplete="on"
            required
          />
          {fieldErrors.city && <p className="errmsg">City is required.</p>}
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleChange}
            autoComplete="on"
            required
          />
          {fieldErrors.postalCode && (
            <p className="errmsg">Postal Code is required.</p>
          )}
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingAddress.country}
            onChange={handleChange}
            autoComplete="on"
            required
          />

          {fieldErrors.country && (
            <p className="errmsg">Country is required.</p>
          )}
          <label htmlFor="shippingMethod">Shipping Method:</label>
          <select
            id="shippingMethod"
            value={shippingMethod}
            onChange={handleShippingMethodChange}
            required
          >
            <option value={ShippingMethod.Standard as ShippingMethod}>
              Standard Shipping (€
              {ShippingPrices[ShippingMethod.Standard] / 100})
            </option>
            <option value={ShippingMethod.Express as ShippingMethod}>
              Express Shipping (€{ShippingPrices[ShippingMethod.Express] / 100})
            </option>
            <option value={ShippingMethod.Overnight as ShippingMethod}>
              Overnight Shipping (€
              {ShippingPrices[ShippingMethod.Overnight] / 100})
            </option>
          </select>
          <div className="save-address">
            <label>
              <input
                type="checkbox"
                checked={saveAddress}
                onChange={() => setSaveAddress(!saveAddress)}
              />
              Save this address for future use
            </label>
          </div>
        </form>
      </article>
      <div className="checkout-buttons">
        <button className="btn save-btn" onClick={onPrevious}>
          Back
        </button>
        <button className="btn back-btn" onClick={handleNext}>
          Order Summary
        </button>
      </div>
    </>
  );
};

export default ShippingAndAddress;
