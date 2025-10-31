import { FormEvent, useState } from 'react';
import ValidatedUsernameInput from '@components/common/inputs/ValidatedUsernameInput';
import ValidatedEmailInput from '@components/common/inputs/ValidateEmailInput';
import ValidatedPasswordInput from '@components/common/inputs/ValidatedPasswordInput';
import { NavLink } from 'react-router-dom';

interface RegisterFormProps {
  onSubmit: (username: string, email: string, password: string) => void;
  errMsg: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, errMsg }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setWasSubmitted(true);
    if (!username || !email || !password) return;
    onSubmit(username, email, password);
  };

  return (
    <form className="auth__form" onSubmit={handleSubmit} noValidate>
      {errMsg && (
        <p className="instructions red" role="alert">
          {errMsg}
        </p>
      )}

      <ValidatedUsernameInput value={username} onChange={setUsername} showInvalid={wasSubmitted} />
      <ValidatedEmailInput value={email} onChange={setEmail} showInvalid={wasSubmitted} />
      <ValidatedPasswordInput onPasswordChange={setPassword} showInvalid={wasSubmitted} />

      <div className="form__actions">
        <button type="submit" className="btn btn--brand" disabled={!username || !email || !password}>
          Register
        </button>
        <NavLink to="/login" className="btn btn--ghost">
          Back to login
        </NavLink>
      </div>
    </form>
  );
};

export default RegisterForm;
