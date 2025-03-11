import { ReactElement } from 'react';
import { User } from '../../types';

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps): ReactElement => {
  return (
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
  );
};

export default UserInfo;
