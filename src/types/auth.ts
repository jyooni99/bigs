export interface User {
  username: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
