import { useSendLogoutMutation } from "@features/apiSlices/authApiSlice";
import { setPersistState } from "@utils";

export const useLogout = () => {
  const [sendLogout] = useSendLogoutMutation();

  const logout = () => {
    if (window.confirm('Are you sure you want log out?')) {
      setPersistState(false);
      sendLogout();
      document.cookie =
        'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost:5173; secure; HttpOnly';
      window.location.href = '/login';
    }
  };

  return { logout };
};
