// Register.tsx
import { useState } from 'react';
import { useRegisterMutation } from '@features/apiSlices/authApiSlice';
import RegisterForm from './forms/RegisterForm';

const Register = () => {
  const [registerMutation] = useRegisterMutation();
  const [errMsg, setErrMsg] = useState('');

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      await registerMutation({ username, email, pwd: password }).unwrap();
      window.location.href = '/login';
    } catch (error: any) {
      setErrMsg(error?.data?.message || 'Registration Failed');
    }
  };

  return (
    <section className="auth">
      <div className="auth__panel">
        <h2 className="auth__title">Register</h2>
        <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
          <RegisterForm onSubmit={handleRegister} errMsg={errMsg} />
        </form>
      </div>
    </section>
  );
};

export default Register;
