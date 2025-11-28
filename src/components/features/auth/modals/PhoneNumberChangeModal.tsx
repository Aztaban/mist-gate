// PhoneNumberChangeModal.tsx
import { FormEvent, MouseEvent, useState } from 'react';
import ValidatedPhoneInput from '@components/common/inputs/ValidatedPhoneInput';
import ModalButtons from './ModalButtons';
import { useUpdateUserPhoneMutation } from '@features/apiSlices/userApiSlice';

interface PhoneNumberChangeModalProps {
  currentPhoneNumber: string;
  onClose: () => void;
}

const PhoneNumberChangeModal = ({ currentPhoneNumber, onClose }: PhoneNumberChangeModalProps) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');
  const [updatePhone] = useUpdateUserPhoneMutation();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPhoneNumber === currentPhoneNumber) return;

    try {
      await updatePhone({ phoneNumber: newPhoneNumber }).unwrap();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      console.error('Failed to update product:', err);
    }
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Change Phone Number</h2>

        {status === 'success' ? (
          <>
            <p>Phone number changed successfully.</p>
            <button className="btn save-btn" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Current Phone Number</label>
            <p className="field-helper">{currentPhoneNumber || 'You haven’t added a phone number yet.'}</p>
            <ValidatedPhoneInput value={newPhoneNumber} onChange={setNewPhoneNumber} />
            <p className="info-text">Leave empty to remove your phone number.</p>

            {status === 'error' && <p className="errMsg">Invalid phone number. Please try again.</p>}

            <ModalButtons onClose={onClose} />
          </form>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberChangeModal;
