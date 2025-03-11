import { ReactElement } from 'react';
import { useGetUserQuery } from '../../features/apiSlices/userApiSlice';
import { User, ShippingAddress } from '../../types';
import AddressForm from './AddressForm';

const UserSettings = (): ReactElement => {
  const { data: user, isLoading, error } = useGetUserQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load user data.</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <section className="user-settings">
      <div className="user-info">
        <label>Username:</label>
        <p>{user.username}</p>

        <label>Email:</label>
        <p>{user.email}</p>
        <button>Change Email</button>
        <div></div>

        <label>Telephone Number:</label>
        <p>{user.phoneNumber}</p>

        <button>Change Number</button>
        <div></div>

        <label>Password:</label>
        <p>********</p>
        <button>Change Password</button>
      </div>
      <AddressForm initialAddress={user.address as ShippingAddress} />
    </section>
  );
};

export default UserSettings;
