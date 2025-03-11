import { ReactElement } from 'react';
import { useGetUserQuery } from '../../features/apiSlices/userApiSlice';
import { ShippingAddress } from '../../types';
import AddressForm from './AddressForm';
import UserInfo from './UserInfo';

const UserSettings = (): ReactElement => {
  const { data: user, isLoading, error } = useGetUserQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load user data.</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <section className="user-settings">
      <UserInfo user={user}/>
      <AddressForm initialAddress={user.address as ShippingAddress} />
    </section>
  );
};

export default UserSettings;
