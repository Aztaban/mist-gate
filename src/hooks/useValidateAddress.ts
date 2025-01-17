import { ShippingAddress } from '../features/shop/ordersApiSlice';

export const validateAddress = (
  address: ShippingAddress | null
): Record<string, boolean> => {
  if (!address) {
    return {
      address: true,
      city: true,
      postalCode: true,
      country: true,
    };
  }

  const errors: Record<string, boolean> = {};
  const requiredFields: (keyof ShippingAddress)[] = [
    'address',
    'city',
    'postalCode',
    'country',
  ];

  requiredFields.forEach((field) => {
    if (!address[field]) {
      errors[field] = true;
    }
  });

  return errors;
};