import { useRef, useState, useEffect, ChangeEvent, ReactElement } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { setPersistState } from '../../utils/utils';

const Login = (): ReactElement => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const navigate = useNavigate();

  const [login] = useLoginMutation();

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const errClass = errMsg ? 'errmsg' : 'offscreen';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { isAdmin } = await login({ user, pwd }).unwrap();
      setPersistState(true);
      setUser('');
      setPwd('');
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/account');
      }
    } catch (error: any) {
      if (!error.originalStatus) {
        setErrMsg('No Server Response');
      } else if (error.originalStatus === 400) {
        setErrMsg('Missing Username or Password');
      } else if (error.originalStatus === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(error.data);
      }
    }
  };

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value);
  const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) =>
    setPwd(e.target.value);

  const content = (
    <section className="login">
      <h2 className="news__header">Login</h2>
      <main>
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            value={user}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={pwd}
            onChange={handlePwdInput}
            autoComplete="off"
            required
          />
          <button type='submit' className="btn save-btn">
            Sign In
          </button>
          <button type='button' className="btn back-btn">
            <NavLink to="/register">Register</NavLink>
          </button>
        </form>
      </main>
    </section>
  );

  return content;
};

export default Login;
