import { Outlet, Navigate } from 'react-router-dom';
import { ReactElement, useEffect, useState, useRef } from 'react';
import { useRefreshMutation } from '../../features/apiSlices/authApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/slices/authSlice';
import { RootState } from '../../features/store';
import { RingLoader } from 'react-spinners';
import { setPersistState } from '../../utils/utils';

const PersistLogin = (): ReactElement | null => {
  const token: string | null = useSelector((state: RootState) =>
    selectCurrentToken(state)
  );

  const [persist, setPersist] = useState<boolean>(() => {
    const storedPersist = localStorage.getItem('persist');
    return storedPersist ? JSON.parse(storedPersist) : false;
  });

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation();

  // Add this useRef to track if refresh was attempted
  const refreshAttempted = useRef(false); 

  useEffect(() => {
    // Sync local state with localStorage
    setPersistState(persist);
  }, [persist]);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      if (!token && persist && !refreshAttempted.current) {
        //console.log('verifying refresh token');
        refreshAttempted.current = true;
        try {
          await refresh().unwrap();
          setTrueSuccess(true);
        } catch (err) {
          setPersist(false);
          //console.error(err);
        }
      }
    };
    verifyRefreshToken();
  }, [token, persist, refresh]);

  useEffect(() => {
    // Initialize persist state from localStorage on component mount
    const storedPersist = localStorage.getItem('persist');
    if (storedPersist) {
      setPersist(JSON.parse(storedPersist));
    }
  }, []);

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
    return <Navigate to="/login" replace />;
    /*     content = (
      <p className="errmsg">
        Something went wrong
        <Link to="/login">Please login again.</Link>
      </p>
    ); */
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
