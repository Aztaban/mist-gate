import { useState } from 'react';
import ValidatedPhoneInput from '@components/common/inputs/ValidatedPhoneInput';
import ModalButtons from './ModalButtons';
import { useUpdateUserPhoneMutation } from '@features/apiSlices/userApiSlice';

interface PhoneNumberChangeModalProps {
  currentPhoneNumber: string;
  onClose: () => void;
}

const PhoneNumberChangeModal = ({
  currentPhoneNumber,
  onClose,
}: PhoneNumberChangeModalProps) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');
  const [updatePhone] = useUpdateUserPhoneMutation();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-pwd">
        <h3>Change Phone Number</h3>

        {status === 'success' ? (
          <>
            <p>Phone number changed successfully.</p>
            <button className="btn save-btn" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <>
            <label>Current Phone Number:</label>
            <p>{currentPhoneNumber || "You haven’t added a phone number yet."}</p>
            <ValidatedPhoneInput
              value={newPhoneNumber}
              onChange={setNewPhoneNumber}
            />
            <p className="info-text">Leave empty to remove your phone number.</p>
            {status === 'error' && (
              <p>Invalid phone number. Please try again.</p>
            )}
            <ModalButtons handleSubmit={handleSubmit} onClose={onClose} />
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberChangeModal;
