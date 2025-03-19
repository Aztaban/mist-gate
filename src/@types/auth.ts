export interface LoginCredentialsType {
  login: string;
  pwd: string;
}

export interface RegisterCredentialsType {
  username: string;
  email: string;
  pwd: string;
}

export interface AuthResponse {
  accessToken: string;
  isAdmin?: boolean;
}