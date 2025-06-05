import { defaultInstance } from "@/apis/utils/instance";

// 회원가입 처리
export const registerUser = async (formData) => {
    try {
        const response = await defaultInstance.post('/user/join', formData);
        return response.data;
    } catch (error) {
        console.error('회원가입 에러:', error);
        throw error;
    }
};

// 로그인 처리
export const loginUser = async (formData) => {
    try {
        const response = await defaultInstance.post('/user/login', formData);
        return response.data;
    } catch (error) {
        console.error('로그인 에러:', error);
        throw error;
    }
};

// 마이페이지 조회
export const getUser = async (formData) => {
    try {
        const response = await defaultInstance.get('/user/mypage', {params: formData});
        return response.data;
    } catch (error) {
        console.error('마이페이지 에러:', error);
        throw error;
    }
};

// 마이페이지 수정
export const updateUser = async (formData) => {
    try {
        const response = await defaultInstance.put('/user/mypage', formData);
        return response.data;
    } catch (error) {
        console.error('마이페이지 에러:', error);
        throw error;
    }
};

// 회원탈퇴
export const deleteUser = async (userId) => {
    try {
        const response = await defaultInstance.delete(`/user/mypage/${userId}`);
        return response.data;
    } catch (error) {
        console.error('마이페이지 에러:', error);
        throw error;
    }
};
