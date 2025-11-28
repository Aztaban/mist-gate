import { FormEvent, MouseEvent, useState } from 'react';
import ValidatedPasswordInput from '@components/common/inputs/ValidatedPasswordInput';
import { useUpdatePasswordMutation } from '@features/apiSlices/authApiSlice';
import ModalButtons from './ModalButtons';

interface PasswordChangeModalProps {
  onClose: () => void;
}

const PasswordChangeModal = ({ onClose }: PasswordChangeModalProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const [updatePassword] = useUpdatePasswordMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePassword({ password: currentPassword, newPassword }).unwrap();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      console.error('Failed to update product:', err);
    }
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={status === 'success' ? handleOverlayClick : undefined}>
      <div className="modal-content">
        <h2>Change Password</h2>

        {status === 'success' ? (
          <>
            <p>Password updated successfully!</p>
            <button className="btn save-btn" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="modal-input"
            />

            <ValidatedPasswordInput onPasswordChange={setNewPassword} />

            {status === 'error' && <p className="errMsg">Invalid password. Please try again.</p>}

            <ModalButtons onClose={onClose} />
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordChangeModal;
