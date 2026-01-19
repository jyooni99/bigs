import { useAuthStore } from "@/src/stores/auth-store";
import axios from "axios";
import { authAPI } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi = axios.create({
  baseURL: API_BASE_URL,
});

privateApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // 401 처리: 리프레시 토큰 사용해서 액세스 토큰 재발급
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, setAuth, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      try {
        const { data } = await authAPI.refresh(refreshToken);

        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          setAuth(currentUser, data.accessToken, refreshToken);
        }

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return privateApi.request(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    // 403 처리: 엑세스 토큰이 없으면 로그인 페이지로 이동
    if (error.response?.status === 403) {
      const token = useAuthStore.getState().accessToken;

      if (!token) {
        useAuthStore.getState().logout();
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);
