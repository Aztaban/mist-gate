import { useState } from 'react';
import PasswordValidation from '../validations/PasswordValidation';
import { useUpdatePasswordMutation } from '../../../features/apiSlices/authApiSlice';
import ModalButtons from './ModalButtons';

interface PasswordChangeModalProps {
  onClose: () => void;
}

const PasswordChangeModal = ({ onClose }: PasswordChangeModalProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const [updatePassword] = useUpdatePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePassword({ password: currentPassword, newPassword }).unwrap();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      console.error('Failed to update product:', err);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={status === 'success' ? handleOverlayClick : undefined}
    >
      <div className="modal-pwd">
        <h3>Change Password</h3>

        {status === 'success' ? (
          <>
            <p>Password updated successfully!</p>
            <button className="btn save-btn" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <PasswordValidation onPasswordChange={setNewPassword} />

            {status === 'error' && <p>Invalid Password. Please try again.</p>}

            <ModalButtons handleSubmit={handleSubmit} onClose={onClose} />
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordChangeModal;
