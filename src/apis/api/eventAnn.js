import { axiosApi } from "@/apis/utils/instance";

/**
 * 이벤트 당첨확인 전체 조회
 * param : searchType       검색 카테고리
 * param : searchValue      검색 내용
 */
export const getEventAnnouncementList = async (param) => {
    try{
        const response = await axiosApi.get(`/event/announcement/list`, { params: param })
        return response.data;
    } catch (error) {
        console.error("이벤트 당첨확인 게시글 전체 조회 실패: ", error);
    }
}

/**
 * 이벤트 당첨확인 단건 조회
 * eventAnnouncementId      이벤트 시퀀스
 */
export const getEventAnnouncementItem = async (announcementId) => {
    try{
        const response = await axiosApi.get(`/event/announcement/${announcementId}`, {})
        return response.data;
    } catch (error) {
        console.error("이벤트 당첨확인 게시글 상세 조회 실패: ", error);
    }
}

/**
 * 이벤트 당첨확인 작성
 * param : data             게시글 내용
 * param : files            파일 첨부
 */
export const postEventAnnouncement = async (param) => {
    try{
        const response = await axiosApi.post('/admin/event/announcement', param)
        return response.data;
    } catch (error) {
        console.error("이벤트 당첨확인 게시글 등록 실패: ", error);
    }
}

/**
 * 이벤트 당첨확인 수정
 * eventAnnouncementId      이벤트 시퀀스
 * param : data             게시글 내용
 * param : files            파일 첨부
 */
export const putEventAnnouncement = async (announcementId, param) => {
    try{
        const response = await axiosApi.put(`/admin/event/announcement/${announcementId}`, param)
        return response.data;
    } catch (error) {
        console.error("이벤트 당첨확인 게시글 등록 실패: ", error);
    }
}

/**
 * 이벤트 당첨확인 삭제
 * eventAnnouncementId      이벤트 시퀀스
 */
export const deleteEventAnnouncement = async (announcementId) => {
    try{
        const response = await axiosApi.delete(`/admin/event/announcement/${announcementId}`, {})
        return response.data;
    } catch (error) {
        console.error("이벤트 당첨확인 게시글 등록 실패: ", error);
    }
}

/**
 * 이벤트 당첨확인 좋아요
 * param : data             게시글 내용
 * param : files            파일 첨부
 */
export const postEventAnnouncementLike = async (announcementId) => {
    try{
        const response = await axiosApi.post(`/event/announcement/${announcementId}/like`, {})
        return response.data;
    } catch (error) {
        console.error("이벤트 당첨확인 게시글 등록 실패: ", error);
    }
}

/**
 * 이벤트 당첨확인 좋아요 취소
 * eventAnnouncementId      이벤트 시퀀스
 */
export const deleteEventAnnouncementLike = async (announcementId) => {
    try{
        const response = await axiosApi.delete(`/event/announcement/${announcementId}/like`, {})
        return response.data;
    } catch (error) {
        console.error("이벤트 당첨확인 게시글 등록 실패: ", error);
    }
}