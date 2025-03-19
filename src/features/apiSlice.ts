import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { setCredentials } from './slices/authSlice';
import { logOut } from './slices/authSlice';
import { setPersistState } from '@utils';

interface AccessTokenResponse {
  accessToken: string;
}

type refreshResponse = AccessTokenResponse | unknown;

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
 });

const baseQueryWithReauth: BaseQueryFn<
  any,
  refreshResponse,
  FetchBaseQueryError
> = async (args: any, api: BaseQueryApi, extraOptions) => {
  if (args.url === '/auth/register' || args.url === '/auth/login') {
    return baseQuery(args, api, extraOptions); // Proceed without token refresh
  }

  let result = await baseQuery(args, api, extraOptions);
  //console.log(result);

  if (result.error?.status === 401 || result.error?.status === 403) {
    setPersistState(false);
    api.dispatch(logOut());
    //console.log(result.error.data)
  }

  if (result?.error?.status === "PARSING_ERROR") {
    console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      const accessTokenResponse = refreshResult.data as AccessTokenResponse;
      // store the new token
      api.dispatch(
        setCredentials({ accessToken: accessTokenResponse.accessToken })
      );

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      throw new Error('Refresh token failed');
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Post', 'Product', 'Order', 'User'],
  endpoints: (_builder) => ({}),
});
