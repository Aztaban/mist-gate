import { apiSlice } from '../apiSlice';
import { logOut, setCredentials } from '../slices/authSlice';
import {
  AuthResponse,
  LoginCredentialsType,
  RegisterCredentialsType,
} from '../../types';
import { EMAIL_REGEX, USER_REGEX } from '../../config';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentialsType>({
      query: ({ login, pwd }) => {
        const isEmail = EMAIL_REGEX.test(login);
        const isUser = USER_REGEX.test(login);

        if (!isEmail && !isUser) {
          throw new Error('Invalid login format');
        }

        const body = isEmail ? { email: login, pwd } : { user: login, pwd };

        return {
          url: '/auth/login',
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // Wait for the login query to resolve
          const { accessToken } = data;
          // Dispatch setCredentials with the access token
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    register: builder.mutation<void, RegisterCredentialsType>({
      query: (newLogin) => ({
        url: '/auth/register',
        method: 'POST',
        body: newLogin,
      }),
    }),
    sendLogout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          //localStorage.setItem('persist', JSON.stringify(false));
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          //console.log(err);
        }
      },
    }),
    updatePassword: builder.mutation<
      void,
      { password: string; newPassword: string }
    >({
      query: ({ password, newPassword }) => ({
        url: '/users/user/password',
        method: 'PUT',
        body: { password, newPassword },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useUpdatePasswordMutation,
} = authApiSlice;
