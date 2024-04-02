import { apiSlice } from "../api/apiSlice";
import { SetCredentialsPayload } from "./authSlice";

export interface LoginCredentialsType {
  user: string;
  pwd: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginCredentialsType, SetCredentialsPayload>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: {...credentials}
      })
    }),
    register: builder.mutation<void, LoginCredentialsType>({
      query: (newLogin) => ({
        url: '/auth/register',
        method: 'POST',
        body: newLogin
      })
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation
} = authApiSlice