import { useState, useEffect } from 'react';
import { ShippingAddress } from '../../../features/shop/ordersApiSlice';
import { ShippingMethod, ShippingPrices } from '../../../config/shippingConfig';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShippingAddress as updateShippingAddress,
  setShippingMethod as updateShippingMethod,
  selectShippingAddress,
  selectShippingMethod,
} from '../../../features/checkout/checkoutSlice';
import { validateAddress } from '../../../hooks/useValidateAddress';

interface ShippingAndAddressProps {
  onNext: () => void;
  onPrevious: () => void;
}

const ShippingAndAddress = ({
  onNext,
  onPrevious,
}: ShippingAndAddressProps) => {
  const dispatch = useDispatch();
  const currentAddress = useSelector(selectShippingAddress);
  const currentMethod = useSelector(selectShippingMethod);

  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(
    currentMethod || ShippingMethod.Standard
  );
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    currentAddress || {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    }
  );

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

  const validateAndSave = (): boolean => {
    const errors: Record<string, boolean> = validateAddress(shippingAddress);
    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(updateShippingAddress(shippingAddress));
      dispatch(updateShippingMethod(shippingMethod));
      return true;
    }

    return false;
  };

  const handleNext = () => {
    if (validateAndSave()) {
      onNext();
    }
  };

  return (
    <>
      <h2>2. Shipping and Address</h2>
      <article className="checkout checkout-spaced">
        <form className="address">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingAddress.address}
            onChange={handleChange}
            autoComplete="on"
            required
          />
          {fieldErrors.address && (
            <p className="errmsg">Address is required.</p>
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
