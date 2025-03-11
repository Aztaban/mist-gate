import { useState } from 'react';
import { useRegisterMutation } from '../../features/apiSlices/authApiSlice';
import RegisterForm from './forms/RegisterForm';

const Register = () => {
  const [registerMutation] = useRegisterMutation();
  const [errMsg, setErrMsg] = useState('');

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await registerMutation({ username, email, pwd: password }).unwrap();
      window.location.href = '/login'; // Redirect after success
    } catch (error: any) {
      setErrMsg(error?.data?.message || 'Registration Failed');
    }
  };

  return (
    <section className="login">
      <h2>Register</h2>
      <main>
        <RegisterForm onSubmit={handleRegister} errMsg={errMsg} />
      </main>
    </section>
  );
};

export default Register;
