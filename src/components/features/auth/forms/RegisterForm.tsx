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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) return;
    onSubmit(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errMsg && <p className="errmsg">{errMsg}</p>}

      <ValidatedUsernameInput value={username} onChange={setUsername} />
      <ValidatedEmailInput value={email} onChange={setEmail} />
      <ValidatedPasswordInput onPasswordChange={setPassword} />

      <button
        type="submit"
        className="btn save-btn"
        disabled={!username || !email || !password}
      >
        Register
      </button>
      <button type="button" className="btn back-btn">
        <NavLink to="/login">Back to login</NavLink>
      </button>
    </form>
  );
};

export default RegisterForm;
