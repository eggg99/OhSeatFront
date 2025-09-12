import { axiosApi } from "@/apis/utils/instance";

/**
 * 영화관 리스트 조회
 * param : multiplexId  멀티플렉스 구분
 * param : areaId       지역 구분
 */
export const getCinemaList = async(multiplexId, areaId) => {
    try{
        const params = { multiplexId, areaId };
        const response = await axiosApi.get('/rcmd/cinemaList', { params })
        return response.data;
    } catch (error) {
        console.error("영화관 조회 실패: ", error);
        throw error;
    }
}

/**
 * 상영관 조회
 * param : multiplexId  멀티플렉스 구분
 * param : cinemaId     영화관 구분
 */
export const getScreenList = async(multiplexId, cinemaId) => {
    try{
        const params = { multiplexId, cinemaId };
        const response = await axiosApi.get('/rcmd/screenList', { params })
        return response.data;
    } catch (error) {
        console.error("상영관 조회 실패: ", error);
        throw error;
    }
}

/**
 * 게시글 조회
 * param : multiplexId  멀티플렉스 구분
 * param : areaId       지역 구분
 * param : cinemaId     영화관 구분
 */
export const getPostList = async(cinemaId, screenId, orderType, page, size) => {
    try{
        const params = { cinemaId, screenId,orderType, page, size };
        const response = await axiosApi.get('/rcmd/postList', { params })
        return response.data;
    } catch (error) {
        console.error("게시글 조회 실패: ", error);
        throw error;
    }
}