import { useState } from "react";
import EmailValidation from "../validations/EmailValidation";
import { useUpdateUserEmailMutation } from "../../../features/apiSlices/userApiSlice";
import ModalButtons from "./ModalButtons";

interface EmailChangeModalProps {
  onClose: () => void;
  email: string;
}

const EmailChangeModal = ({ onClose, email }: EmailChangeModalProps) => {
  const [newEmail, setNewEmail] = useState<string>('');
  const [updateEmail] = useUpdateUserEmailMutation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEmail({ email: newEmail }).unwrap();
      alert('Email updated successfully!');
    } catch (err) {
      console.error('Failed to update product:', err);
    }
    onClose();
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-pwd">
        <h3>Change Email</h3>
        <label>Current Email:</label>
        <p>{email}</p>
        <EmailValidation value={newEmail} onChange={setNewEmail} />
        <ModalButtons handleSubmit={handleSubmit} onClose={onClose} />
      </div>
    </div>
  )
}

export default EmailChangeModal;