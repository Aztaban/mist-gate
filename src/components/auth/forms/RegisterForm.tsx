import { FormEvent, useState } from "react";
import UsernameValidation from "../validations/UsernameValidation";
import EmailValidation from "../validations/EmailValidation";
import PasswordValidation from "../validations/PasswordValidation";
import { NavLink } from "react-router-dom";

interface RegisterFormProps {
  onSubmit: (username: string, email: string, password: string) => void;
  errMsg: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, errMsg }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || password !== confirmPassword) return;
    onSubmit(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errMsg && <p className="errmsg">{errMsg}</p>}

      <UsernameValidation value={username} onChange={setUsername} />
      <EmailValidation value={email} onChange={setEmail} />
      <PasswordValidation 
        password={password} 
        confirmPassword={confirmPassword} 
        onPasswordChange={setPassword} 
        onConfirmChange={setConfirmPassword} 
      />

      <button type="submit" className="btn save-btn" disabled={!username || !email || !password || password !== confirmPassword}>
        Register
      </button>
      <button type="button" className="btn back-btn">
        <NavLink to="/login">Back to login</NavLink>
      </button>
    </form>
  );
};

export default RegisterForm;
