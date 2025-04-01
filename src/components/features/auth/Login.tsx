import { useState, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@features/apiSlices/authApiSlice';
import { setPersistState } from '@utils';
import LoginForm from './forms/LoginForm';

const Login = (): ReactElement => {
  const [useLogin] = useLoginMutation();
  const [errMsg, setErrMsg] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (login: string, password: string) => {
    try {
      const { isAdmin } = await useLogin({ login, pwd: password }).unwrap();
      setPersistState(true);
      navigate(isAdmin ? '/admin' : '/account');
    } catch (error: any) {
      if (!error.status) {
        setErrMsg('No Server Response');
      } else if (error.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (error.status === 401) {
        setErrMsg('Wrong initials');
      } else {
        setErrMsg(error.data || 'Login Failed');
      }
    }
  };

  const content = (
    <section className="login">
      <h2 className="news__header">Login</h2>
      <main>
        <LoginForm onSubmit={handleLogin} errMsg={errMsg} />
      </main>
    </section>
  );

  return content;
};

export default Login;
