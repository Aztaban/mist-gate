import { FormEvent, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface LoginFormProps {
  onSubmit: (login: string, password: string) => void;
  errMsg: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, errMsg }) => {
  const userRef = useRef<HTMLInputElement>(null);
  const [login, setLogin] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    userRef.current?.focus();
  }, []);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!login || !pwd) return;
    onSubmit(login, pwd);
  };

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      {errMsg && (
        <p className="errmsg" role="alert" aria-live="assertive">
          {errMsg}
        </p>
      )}

      <div className="form__field">
        <label htmlFor="login">Login</label>
        <input
          id="login"
          ref={userRef}
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          autoComplete="off"
          required
        />
      </div>

      <div className="form__field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          autoComplete="off"
          required
        />
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--brand" disabled={!login || !pwd}>
          Sign In
        </button>
        <NavLink to="/register" className="btn btn--ghost">
          Register
        </NavLink>
      </div>
    </form>
  );
};

export default LoginForm;
