import axios from 'axios';
import { userStore } from "@/store/userStore";

const BASE_URL = 'http://localhost:8000/api'

export const axiosApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosApi.interceptors.request.use(
  (config) => {
    const { token } = userStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);