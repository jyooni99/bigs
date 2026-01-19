export interface User {
  username: string;
  name: string;
}

export interface SignupRequest {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
