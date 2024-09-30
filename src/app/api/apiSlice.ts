import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { setCredentials } from '../../features/auth/authSlice';

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
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    localStorage.setItem('persist', JSON.stringify(false));
    console.log("Test erroru uspesny")
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
  tagTypes: ['Post', 'Product'],
  endpoints: (_builder) => ({}),
});
