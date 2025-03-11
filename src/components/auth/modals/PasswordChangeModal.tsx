import { useState } from 'react';
import PasswordValidation from '../validations/PasswordValidation';

interface PasswordChangeModalProps {
  onClose: () => void;
}

const PasswordChangeModal = ({ onClose }: PasswordChangeModalProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const handleSubmit = () => {
    try {
      // Handle password change logic here
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
        <div className="modal-actions">
          <button onClick={handleSubmit} className="btn modal-confirm">
            Confirm
          </button>
          <button onClick={onClose} className="btn modal-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
