import { ShippingAddress } from "../features/apiSlices/ordersApiSlice";

export const validateAddress = (
  address: ShippingAddress | null
): Record<string, boolean> => {
  if (!address) {
    return {
      name: true,
      street: true,
      city: true,
      postalCode: true,
      country: true,
    };
  }

  const errors: Record<string, boolean> = {};
  const requiredFields: (keyof ShippingAddress)[] = [
    'name',
    'street',
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