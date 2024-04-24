import { ReactElement } from 'react';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import usePersist from '../../hooks/usePersist';
import useAuth from '../../hooks/useAuth';

const Account = (): ReactElement => {
  const [sendLogout] = useSendLogoutMutation();
  const [persist, setPersist] = usePersist();
  const { username } = useAuth();

  const onClickLogout = () => {
    if (persist) {
      setPersist(false);
    }
    sendLogout();
  };

  return (
    <main className="main--cart">
      <h2>{username}'s Account</h2>
      <section>
        <h3>Disclaimer:</h3>
        <p>
          This section of the website intentionally does not work as expected
          and is only represented by simplified placeholders. It is designed
          solely for demonstration purposes to showcase skills in web
          development. Please note that the settings and billing functionalities
          are not implemented and are not functional.
        </p>
        <br />
        <p>
          Creating functional settings and billing features requires a
          significant amount of time and effort. Given that this project is a
          showcase and not intended for production, the decision was made to
          prioritize other aspects of the application.
        </p>
        <br />
      </section>
      <section>
        <h3>User settings</h3>
        <div className="flex--inline">
          <p>Username:</p>
          <p>{username}</p>
        </div>
        <div className="flex--inline">
          <p>Email:</p>
          <p>email@placeholder.com</p>
        </div>
        <div className="flex--inline">
          <p>Address:</p>
          <p>Pineapple under the sea</p>
        </div>
      </section>
      <section>
        <h3>Orders</h3>
      </section>
      <button className="addButton" onClick={onClickLogout}>
        Logout
      </button>
    </main>
  );
};

export default Account;
