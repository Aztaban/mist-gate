import { ReactElement } from 'react';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import usePersist from '../../hooks/usePersist';


const Account = (): ReactElement => {
  const [sendLogout] = useSendLogoutMutation();
  const [persist, setPersist] = usePersist()

  const onClickLogout = () => {
    if (persist){
      setPersist(false);
    }
    sendLogout();
  }

    return (
    <main className="main">
      <h2>Authorized!!</h2>
      <button onClick={onClickLogout}>Logout</button>
    </main>
  );
};

export default Account;
