import { useState } from 'react';
import EmailValidation from '../validations/EmailValidation';
import { useUpdateUserEmailMutation } from '@features/apiSlices/userApiSlice';
import ModalButtons from './ModalButtons';

interface EmailChangeModalProps {
  onClose: () => void;
  email: string;
}

const EmailChangeModal = ({ onClose, email }: EmailChangeModalProps) => {
  const [newEmail, setNewEmail] = useState<string>('');
  const [updateEmail] = useUpdateUserEmailMutation();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || newEmail === email) return;
    try {
      await updateEmail({ email: newEmail }).unwrap();
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
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-pwd">
        <h3>Change Email</h3>

        {status === 'success' ? (
          <>
            <p>Email updated successfully!</p>
            <button className="btn save-btn" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <>
            <label>Current Email:</label>
            <p>{email}</p>
            <EmailValidation value={newEmail} onChange={setNewEmail} />

            {status === 'error' && <p>Invalid email. Please try again.</p>}

            <ModalButtons handleSubmit={handleSubmit} onClose={onClose} />
          </>
        )}
      </div>
    </div>
  );
};

export default EmailChangeModal;
