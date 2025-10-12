// Login.tsx
import { useState, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@features/apiSlices/authApiSlice';
import { setPersistState } from '@utils';
import LoginForm from './forms/LoginForm';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

const isFBQError = (e: unknown): e is FetchBaseQueryError => typeof e === 'object' && e !== null && 'status' in e;

const Login = (): ReactElement => {
  const [useLogin] = useLoginMutation();
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (login: string, password: string) => {
    try {
      const { isAdmin } = await useLogin({ login, pwd: password }).unwrap();
      setPersistState(true);
      navigate(isAdmin ? '/admin' : '/account');
    } catch (err: unknown) {
      let msg = 'Login Failed';

      if (isFBQError(err)) {
        const { status, data } = err;

        if (status === 400) msg = 'Missing username or password';
        else if (status === 401 || status === 403) msg = 'Wrong credentials';
        else if (status === 'FETCH_ERROR') msg = 'No Server Response';
        else if (status === 'PARSING_ERROR') msg = 'Response parsing error';

        if (typeof data === 'string' && data.trim()) msg = data;
        else if (data && typeof (data as any).message === 'string') msg = (data as any).message;
      } else if ((err as SerializedError)?.message) {
        msg = String((err as SerializedError).message);
      }

      setErrMsg(msg);
    }
  };

  return (
    <section className="auth">
      <div className="auth__panel">
        <h2 className="auth__title">Login</h2>
        {/* no outer <form> here */}
        <LoginForm onSubmit={handleLogin} errMsg={errMsg} />
      </div>
    </section>
  );
};

export default Login;
