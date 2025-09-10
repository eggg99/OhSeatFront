import { axiosApi } from "@/apis/utils/instance";

/**
 * 영화관 리스트 조회
 * param : multiplexId  멀티플렉스 구분
 * param : areaId       지역 구분
 */
export const getCinema = async(multiplexId, areaId) => {
    try{
        const params = { multiplexId, areaId };
        const response = await axiosApi.get('/rcmd/cinemaList', { params })
        return response.data;
    } catch (error) {
        console.error("영화관 조회 실패: ", error);
        throw error;
    }
}