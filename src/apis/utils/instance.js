import axios from 'axios';
import { userStore } from "@/store/userStore";

const BASE_URL = 'http://localhost:8000/api'
let isAuthRedirectInProgress = false;

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

axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url ?? '';
        const isAuthRequest = requestUrl.includes('/user/login');
        const { token, isLogin, clearUser } = userStore.getState();
        const hasAuthState = Boolean(token) || Boolean(isLogin);

        if (!isAuthRequest && hasAuthState && (status === 401 || status === 403) && !isAuthRedirectInProgress) {
            isAuthRedirectInProgress = true;

            const currentPath = `${window.location.pathname}${window.location.search}`;
            const redirectPath = encodeURIComponent(currentPath);

            clearUser();
            sessionStorage.setItem('auth-expired-message', '다시 로그인해주세요.');
            window.location.replace(`/user/login?redirect=${redirectPath}`);
        }

        return Promise.reject(error);
    }
);
