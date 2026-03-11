import { axiosApi } from "@/apis/utils/instance";

// 공지사항 리스트 조회 - 좌석추천 - 유저용
export const getRecommendNotice = async (targetBoard) => {
    try{
        const response = await axiosApi.get(`/notices/top`, {params: { targetBoard }})
        return response.data;
    } catch (error) {
        console.error("좌석추천 공지사항 전체 조회 실패: ", error);
    }
}

// 공지사항 조회 - 좌석추천 - 관리자용
export const getNoticeList = async (targetBoard, page) => {
    try{
        const response = await axiosApi.get(`/admin/notices`, {params: { targetBoard, page }})
        return response.data;
    } catch (error) {
        console.error("씨네광장 공지사항 전체 조회 실패: ", error);
    }
}

// 공지사항 리스트 상세 - 유저용
export const getNotice = async (id, param) => {
    try{
        const response = await axiosApi.get(`/notices/${id}`, param)
        return response.data;
    } catch (error) {
        console.error("공지사항 상세 조회 실패: ", error);
    }
}

// 공지사항 리스트 상세 - 관리자용
export const getNoticeDetail = async (id) => {
    try{
        const response = await axiosApi.get(`/admin/notices/${id}`, {})
        return response.data;
    } catch (error) {
        console.error("공지사항 상세 조회 실패: ", error);
    }
}

// 공지사항 등록
export const insertNotice = async (param) => {
    try{
        const response = await axiosApi.post(`/admin/notices`, param)
        return response.data;
    } catch (error) {
        console.error("공지사항 저장 실패: ", error);
    }
}

// 공지사항 수정
export const updateNotice = async (id, param) => {
    try{
        const response = await axiosApi.put(`/admin/notices/${id}`, param)
        return response.data;
    } catch (error) {
        console.error("공지사항 수정 실패: ", error);
    }
}

// 공지사항 삭제
export const deleteNotice = async (id, param) => {
    try{
        const response = await axiosApi.delete(`/admin/notices/${id}`, param)
        return response.data;
    } catch (error) {
        console.error("공지사항 삭제 실패: ", error);
    }
}

// 게시글 여러개 삭제
export const deleteAdminPost = async (param) => {
    try{
        const response = await axiosApi.delete(`/admin/posts/bulk`, {data: param})
        return response.data;
    } catch (error) {
        console.error("공지사항 삭제 실패: ", error);
    }
}

// 고정 여부 변경
export const updatePinned = async(id, param) => {
    try{
        const response = await axiosApi.patch(`/admin/notices/${id}/pin`, param)
        return response.data;
    } catch (error) {
        console.error("게시글 삭제 실패: ", error);
    }
}

// 활성화 여부 변경
export const updateActive = async(id, param) => {
    try{
        const response = await axiosApi.patch(`/admin/notices/${id}/active`, param)
        return response.data;
    } catch (error) {
        console.error("게시글 삭제 실패: ", error);
    }
}