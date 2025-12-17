import { axiosApi } from "@/apis/utils/instance";

/**
 * 이벤트 게시글 전체 조회
 * param : searchType       검색 카테고리
 * param : searchValue      검색 내용
 */
export const getEventList = async (param) => {
    try{
        const response = await axiosApi.get(`/event/list`, { params: param })
        return response.data;
    } catch (error) {
        console.error("이벤트 게시글 전체 조회 실패: ", error);
    }
}

/**
 * 이벤트 게시글 단건 조회
 * param : eventId      이벤트 시퀀스
 */
export const getEventItem = async (eventId) => {
    try{
        const response = await axiosApi.get(`/event/${eventId}`, {})
        return response.data;
    } catch (error) {
        console.error("이벤트 게시글 상세 조회 실패: ", error);
    }
}

/**
 * 이벤트 게시글 작성
 * param : data         게시글 내용
 * param : files        파일 첨부
 */
export const postEvent = async (formData) => {
    try{
        const response = await axiosApi.post('/event', formData)
        return response.data;
    } catch (error) {
        console.error("이벤트 게시글 등록 실패: ", error);
    }
}