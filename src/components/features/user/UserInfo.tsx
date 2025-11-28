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
    <div className="user-info surface-dark">
      <div className="user-info__row">
        <label>Username</label>
        <p className="user-info__text">{user.username}</p>
      </div>

      <div className="user-info__row">
        <label>Email</label>

        <p className="user-info__text">{user.email}</p>
        <div className="user-info__actions">
          <button className="btn btn--ghost btn--sm" onClick={() => setOpenModal('email')}>
            Change Email
          </button>
        </div>
      </div>

      <div className="user-info__row">
        <label>Phone Number</label>
        <p className="user-info__text">{user.phoneNumber ?? '-'}</p>
        <div className="user-info__actions">
          <button className="btn btn--ghost btn--sm" onClick={() => setOpenModal('phone')}>
            Change Number
          </button>
        </div>
      </div>

      <div className="user-info__row">
        <label>Password</label>

        <p className="user-info__text">********</p>
        <div className="user-info__actions">
          <button className="btn btn--ghost btn--sm" onClick={() => setOpenModal('password')}>
            Change Password
          </button>
        </div>
      </div>

      {openModal === 'password' && <PasswordChangeModal onClose={() => setOpenModal(null)} />}
      {openModal === 'email' && <EmailChangeModal email={user.email} onClose={() => setOpenModal(null)} />}
      {openModal === 'phone' && (
        <PhoneNumberChangeModal currentPhoneNumber={user.phoneNumber || ''} onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
};

export default UserInfo;
