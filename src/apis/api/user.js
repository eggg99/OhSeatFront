import { axiosApi } from "@/apis/utils/instance";

// 회원가입 처리
export const registerUser = async (formData) => {
    try {
        const response = await axiosApi.post('/user/join', formData);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.status === 409) {
            alert(error.response.data.message);
            return false;
        } else {
            console.error('회원가입 에러:', error);
            alert('회원가입 실패! 다시 시도해주세요.');
            return false;
        }
    }
};

// 로그인 처리
export const loginUser = async (formData) => {
    try {
        const response = await axiosApi.post('/user/login', formData);
        return response.data;
    } catch (error) {
        if (error.response && error.status === 401) {
            alert(error.response.data.message);
            return false;
        } else {
            console.error('로그인 에러:', error);
            throw error;
        }
    }
};

// 마이페이지 조회
export const getUser = async (formData) => {
    try {
        const response = await axiosApi.get('/user/mypage', {params: formData})
        return response.data;
    } catch (error) {
        console.error('마이페이지 에러:', error);
        throw error;
    }
};

// 마이페이지 수정
export const updateUser = async (formData) => {
    try {
        const response = await axiosApi.put('/user/mypage', formData);
        return response.data;
    } catch (error) {
        console.error('마이페이지 에러:', error);
        throw error;
    }
};

// 회원탈퇴
export const deleteUser = async (userId) => {
    try {
        const response = await axiosApi.delete(`/user/mypage/${userId}`);
        return response.data;
    } catch (error) {
        console.error('마이페이지 에러:', error);
        throw error;
    }
};

// 비밀번호 수정
export const changePassword = async (formData) => {
    try {
        const response = await axiosApi.post('/user/changePw', formData);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.status === 401) {
            alert(error.response.data.message);
            return false;
        } else {
            console.error('비밀번호 변경 에러:', error);
            alert('비밀번호 변경 실패! 다시 시도해주세요.');
            return false;
        }
    }
};
