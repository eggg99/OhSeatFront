import { axiosApi } from "@/apis/utils/instance";

const getApiErrorStatus = (error) => error?.response?.status ?? error?.status;
const getApiErrorMessage = (error, fallbackMessage) =>
    error?.response?.data?.message || fallbackMessage;

// 회원가입 처리
export const registerUser = async (formData) => {
    try {
        const response = await axiosApi.post('/user/join', formData);
        return response.data;
    } catch (error) {
        if (getApiErrorStatus(error) === 409) {
            alert(getApiErrorMessage(error, '이미 사용 중인 정보입니다.'));
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
        const status = getApiErrorStatus(error);

        if (status === 401) {
            alert(getApiErrorMessage(error, '이메일 또는 비밀번호가 올바르지 않습니다.'));
            return false;
        }

        if (status === 404) {
            alert(getApiErrorMessage(error, '로그인 요청 주소를 찾을 수 없습니다. 백엔드 로그인 API 경로를 확인해주세요.'));
            return false;
        }

        console.error('로그인 에러:', error);
        alert(getApiErrorMessage(error, '로그인 실패! 잠시 후 다시 시도해주세요.'));
        return false;
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
        if (getApiErrorStatus(error) === 401) {
            alert(getApiErrorMessage(error, '비밀번호 변경 권한이 없습니다.'));
            return false;
        } else {
            console.error('비밀번호 변경 에러:', error);
            alert('비밀번호 변경 실패! 다시 시도해주세요.');
            return false;
        }
    }
};

// 이메일 찾기
export const findEmail = async (formData) => {
    try {
        const response = await axiosApi.post('/user/findEmail', formData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// 비밀번호 찾기
export const findPw = async (formData) => {
    try {
        const response = await axiosApi.post('/user/findPw', formData);
        return response.data;
    } catch (error) {
        console.error('비밀번호 찾기 에러:', error);
        alert(getApiErrorMessage(error, '비밀번호 찾기 실패! 다시 시도해주세요.'));
        return false;
    }
}

// 닉네임 중복확인
export const duplicateNickname = async (param) => {
    try {
        const response = await axiosApi.post('/user/check-nickname', param);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
