import { ReactElement, useState } from 'react';
import { User } from '@types';
import PasswordChangeModal from '../auth/modals/PasswordChangeModal';
import EmailChangeModal from '../auth/modals/EmailChangeModal';
import PhoneNumberChangeModal from '../auth/modals/PhoneNumberChangeModal';

interface UserInfoProps {
  user: User;
}

type ModalType = 'password' | 'email' | 'phone' | null;

const UserInfo = ({ user }: UserInfoProps): ReactElement => {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  return (
    <div className="user-info">
      {/* Username (no button) */}
      <label>Username:</label>
      <p>{user.username}</p>

      {/* Email + action */}
      <label>Email:</label>
      <p>{user.email}</p>
      <button onClick={() => setOpenModal('email')}>Change Email</button>

      {/* Phone + action */}
      <label>Telephone Number:</label>
      <p>{user.phoneNumber}</p>
      <button onClick={() => setOpenModal('phone')}>Change Number</button>

      {/* Password + action */}
      <label>Password:</label>
      <p>********</p>
      <button onClick={() => setOpenModal('password')}>Change Password</button>

      {openModal === 'password' && <PasswordChangeModal onClose={() => setOpenModal(null)} />}
      {openModal === 'email' && <EmailChangeModal email={user.email} onClose={() => setOpenModal(null)} />}
      {openModal === 'phone' && (
        <PhoneNumberChangeModal currentPhoneNumber={user.phoneNumber || ''} onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
};

export default UserInfo;
