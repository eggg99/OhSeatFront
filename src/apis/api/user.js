import { defaultInstance } from "@/apis/utils/instance";

// 회원가입 요청
export const join = async (formData) => {
    try {
        const response = await defaultInstance.post('/user/join', formData);
        return response.data;
    } catch (error) {
        console.error('회원가입 에러:', error);
        throw error;
    }
};


// 로그인 요청
export const login = async (formData) => {
    try {
        const response = await defaultInstance.post('/user/login', formData);
        return response.data;
    } catch (error) {
        console.error('로그인 에러:', error);
        throw error;
    }
};

// 마이페이지 요청
export const mypage = async (formData) => {
    try {
        const response = await defaultInstance.get('/user/mypage', {params: formData});
        return response.data;
    } catch (error) {
        console.error('마이페이지 에러:', error);
        throw error;
    }
};
