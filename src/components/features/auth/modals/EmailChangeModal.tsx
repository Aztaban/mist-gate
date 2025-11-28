import { FormEvent, MouseEvent, useState } from 'react';
import ValidatedEmailInput from '@components/common/inputs/ValidateEmailInput';
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Change Email</h2>

        {status === 'success' ? (
          <>
            <p>Email updated successfully!</p>
            <button className="btn save-btn" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Current Email</label>
            <p className="field-helper">{email}</p>

            <ValidatedEmailInput value={newEmail} onChange={setNewEmail} />

            {status === 'error' && <p className="errMsg">Invalid email. Please try again.</p>}

            <ModalButtons onClose={onClose} />
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailChangeModal;
