import { axiosApi } from "@/apis/utils/instance";

/**
 * 메인 박스오피스 순위 조회
 * param : categoryId   카테고리시퀀스
 */
export const getBoxoffice = async(param) => {
    try{
        const response = await axiosApi.get('/boxoffice/list', { params: param })
        return response.data;
    } catch (error) {
        console.error("박스오피스 조회 실패: ", error);
    }
}

