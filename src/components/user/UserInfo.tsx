import { ReactElement, useState } from 'react';
import { User } from '../../types';
import PasswordChangeModal from '../auth/modals/PasswordChangeModal';

interface UserInfoProps {
  user: User;
}

type ModalType = "password" | "email" | "phone" | null;

const UserInfo = ({ user }: UserInfoProps): ReactElement => {
  const [openModal, setOpenModal] = useState<ModalType>(null); 
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
      <button onClick={() => setOpenModal("password")}>Change Password</button>

      {openModal === "password" && <PasswordChangeModal onClose={() => setOpenModal(null)} />}
    </div>
  );
};

export default UserInfo;
