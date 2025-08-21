import { axiosApi } from "@/apis/utils/instance";

// 좌석추천 리스트 조회
export const getRecommendList = async (formData) => {
    try {
        const response = await axiosApi.get('/recommend/list', {params: formData})
        return response.data;
    } catch (error) {
        console.error('마이좌석추천 리스트 조회 에러:', error);
        throw error;
    }
};