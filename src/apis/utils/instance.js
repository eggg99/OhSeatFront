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

        // 파일 업로드면 multipart/form-data로 변경
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }
        
        // 토큰이 있으면 Authorization 추가
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);