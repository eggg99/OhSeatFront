import { axiosApi } from "@/apis/utils/instance";

export const getNoticeList = async (targetBoard, param) => {
    try{
        const param = {targetBoard}
        const response = await axiosApi.get(`/notices`, {param})
        return response.data;
    } catch (error) {
        console.error("공지사항 전체 조회 실패: ", error);
    }
}

export const getNotice = async (id, param) => {
    try{
        const response = await axiosApi.get(`/notices/${id}`, param)
        return response.data;
    } catch (error) {
        console.error("공지사항 상세 조회 실패: ", error);
    }
}

export const insertNotice = async (param) => {
    try{
        const response = await axiosApi.post(`/admin/notices`, param)
        return response.data;
    } catch (error) {
        console.error("공지사항 저장 실패: ", error);
    }
}

export const updateNotice = async (id, param) => {
    try{
        const response = await axiosApi.post(`/admin/notices/${id}`, param)
        return response.data;
    } catch (error) {
        console.error("공지사항 수정 실패: ", error);
    }
}

export const deleteNotice = async (id, param) => {
    try{
        const response = await axiosApi.delete(`/admin/notices/${id}`, param)
        return response.data;
    } catch (error) {
        console.error("공지사항 삭제 실패: ", error);
    }
}