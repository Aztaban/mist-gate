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

  const [updatePassword] = useUpdatePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePassword({ password: currentPassword, newPassword }).unwrap();
      alert('Password updated successfully!');
    } catch (err) {
      console.error('Failed to update product:', err);
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-pwd">
        <h3>Change Password</h3>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <PasswordValidation onPasswordChange={setNewPassword} />
        <ModalButtons handleSubmit={handleSubmit} onClose={onClose} />
      </div>
    </div>
  );
};

export default PasswordChangeModal;
