import { CreateOrder } from '../features/shop/ordersApiSlice';
import { selectCheckout } from '../features/checkout/checkoutSlice';
import { useSelector } from 'react-redux';
import { ShippingAddress } from '../features/shop/ordersApiSlice';

export const useValidateOrder = () => {
  const orderData: CreateOrder = useSelector(selectCheckout);
  const isCart: boolean = orderData.products.length > 0;
  const addressErrors:Record<string, boolean> = validateAddress(orderData.shippingAddress)
  const isValid = isCart && !Object.values(addressErrors).some((hasError) => hasError);

  return {
    isValid,
    isCart,
    errors: addressErrors,
    orderData,
  };
};

export const validateAddress = (
  address: ShippingAddress | null
): Record<string, boolean> => {
  const errors: Record<string, boolean> = {
    address: false,
    city: false,
    postalCode: false,
    country: false,
  };

  if (!address) {
    errors.address = true;
    errors.city = true;
    errors.postalCode = true;
    errors.country = true;
  } else {
    if (!address.address) errors.address = true;
    if (!address.city) errors.city = true;
    if (!address.postalCode) errors.postalCode = true;
    if (!address.country) errors.country = true;
  }
  return errors;
};
