// Login.tsx
import { useState, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@features/apiSlices/authApiSlice';
import { setPersistState } from '@utils';
import LoginForm from './forms/LoginForm';

const Login = (): ReactElement => {
  const [useLogin] = useLoginMutation();
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (login: string, password: string) => {
    try {
      const { isAdmin } = await useLogin({ login, pwd: password }).unwrap();
      setPersistState(true);
      navigate(isAdmin ? '/admin' : '/account');
    } catch (error: any) {
      if (!error.status) setErrMsg('No Server Response');
      else if (error.status === 400) setErrMsg('Missing Username or Password');
      else if (error.status === 401) setErrMsg('Wrong initials');
      else setErrMsg(error.data || 'Login Failed');
    }
  };

  return (
    <section className="auth">
      <div className="auth__panel">
        <h2 className="auth__title">Login</h2>
        <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
          <LoginForm onSubmit={handleLogin} errMsg={errMsg} />
        </form>
      </div>
    </section>
  );
};

export default Login;
