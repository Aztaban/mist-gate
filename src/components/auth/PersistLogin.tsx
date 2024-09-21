import { Outlet, Link } from 'react-router-dom';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from '../../features/auth/authApiSlice';
import usePersist from '../../hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { RootState } from '../../app/store';
import { RingLoader } from 'react-spinners';

const PersistLogin = (): ReactElement | null => {
  const [persist] = usePersist();
  const token: string | null = useSelector((state: RootState) =>
    selectCurrentToken(state)
  );

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      if (!token && persist) {
        //console.log('verifying refresh token');
        try {
          await refresh().unwrap();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      }
    };
    verifyRefreshToken();
  }, [token, persist, refresh]);

  let content: ReactElement | null = null;

  if (!persist) {
    // persist: no
    //console.log('No persist login');
    content = <Outlet />;
  } else if (isLoading) {
    // persist: yes, token no
    //console.log('loading');
    content = <RingLoader color={'#FFF'} />;
  } else if (isError) {
    // persist: yes, token no
    //console.log('error');
    content = (
      <p className="errmsg">
        Something went wrong
        <Link to="/login">Please login again.</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // persist: yes, token: yes
    //console.log('success');
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // persist: yes, token no
    //console.log('token and uninit');
    //console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
