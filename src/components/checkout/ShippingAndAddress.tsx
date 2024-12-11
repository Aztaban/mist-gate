import { useState, useEffect } from 'react';
import { ShippingAddress } from '../../features/shop/ordersApiSlice';
import { ShippingMethod, ShippingPrices } from '../../config/shippingConfig';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShippingAddress as updateShippingAddress,
  setShippingMethod as updateShippingMethod,
  selectShippingAddress,
  selectShippingMethod,
} from '../../features/checkout/checkoutSlice';
import { validateAddress } from '../../hooks/useValidateOrder';

interface ShippingAndAddressProps {
  validateFields: boolean;
  setValidateFields: (isValid: boolean) => void;
}

const ShippingAndAddress = ({ validateFields, setValidateFields }: ShippingAndAddressProps) => {
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
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    validateAddressFields();
  };

  const validateAddressFields = () => {
    const errors: Record<string, boolean> = validateAddress(shippingAddress);
    setFieldErrors(errors);
    dispatch(updateShippingAddress(shippingAddress));
  };

 useEffect(() => {
  if (validateFields) {
    validateAddressFields();
    setValidateFields(false);
  }
 }, [validateFields, setValidateFields])

  const handleShippingMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedMethod = e.target.value as ShippingMethod;
    setShippingMethod(selectedMethod);
    dispatch(updateShippingMethod(selectedMethod));
  };

  return (
    <article className="shipping">
      <form className="address">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={shippingAddress.address}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="on"
          required
        />
        {fieldErrors.address && <p className="errmsg">Address is required.</p>}
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={shippingAddress.city}
          onChange={handleChange}
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
          autoComplete="on"
          required
        />

        {fieldErrors.country && <p className="errmsg">Country is required.</p>}
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
      </form>
    </article>
  );
};

export default ShippingAndAddress;
