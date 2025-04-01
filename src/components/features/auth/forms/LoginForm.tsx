import { FormEvent, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface LoginFormProps {
  onSubmit: (login: string, password: string) => void;
  errMsg: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, errMsg }) => {
  const userRef = useRef<HTMLInputElement>(null);

  const [login, setLogin] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!login || !pwd) return;
    onSubmit(login, pwd);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errMsg && (
        <p className="errmsg" aria-live="assertive">
          {errMsg}
        </p>
      )}

      <label htmlFor="login">Login:</label>
      <input
        type="text"
        id="login"
        ref={userRef}
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        autoComplete="off"
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        autoComplete="off"
        required
      />

      <button type="submit" className="btn save-btn" disabled={!login || !pwd}>
        Sign In
      </button>
      <button type="button" className="btn back-btn">
        <NavLink to="/register">Register</NavLink>
      </button>
    </form>
  );
};

export default LoginForm;
