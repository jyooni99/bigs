import { api } from "@/src/apis/api";
import { LoginRequest, LoginResponse, SignupRequest } from "@/src/types/auth";

export const authAPI = {
  signup: (data: SignupRequest) => api.post<LoginResponse>("/auth/signup", data),

  login: (data: LoginRequest) => api.post<LoginResponse>("/auth/login", data),

  refresh: (refreshToken: string) =>
    api.post<{ accessToken: string }>("/auth/refresh", { refreshToken }),
};
