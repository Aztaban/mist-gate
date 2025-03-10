export interface User {
  id: string;
  username: string;
  email: string;
  roles: number[];
  address?: ShippingAddress;
  phoneNumber?: string;
  isActive: boolean;
}

export type ShippingAddress = {
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};