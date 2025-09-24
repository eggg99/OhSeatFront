import { axiosApi } from "@/apis/utils/instance";

/**
 * 씨네광장 카테고리별 게시글 전체 조회
 * param : categoryId   카테고리시퀀스
 */
export const getCineSqaureList = async(categoryId) => {
    try{
        const params = { categoryId };
        const response = await axiosApi.get('/cinesquare/list', { params })
        return response.data;
    } catch (error) {
        console.error("씨네광장 카테고리별 게시글 전체 조회 실패: ", error);
    }
}

/**
 * 씨네광장 게시글 단건 조회
 * param : postId   게시글 시퀀스
 */
export const getCineSqaureItem = async(postId) => {
    try{
        const response = await axiosApi.get(`/cinesquare/${postId}`, { })
        return response.data;
    } catch (error) {
        console.error("씨네광장 게시글 단건 조회 실패: ", error);
    }
}

/**
 * 씨네광장 게시글 작성
 * param : categoryId   카테고리시퀀스
 * param : title        제목
 * param : content      내용
 */
export const postCineSquare = async(categoryId, title, content) => {
    try{
        const response = await axiosApi.post("/cinesquare", { 
            categoryId,
            title,
            content
        })
        return response.data;
    } catch (error) {
        console.error("게시글 등록 실패: ", error);
    }
}

/**
 * 씨네광장 게시글 수정
 * param : postId   게시글 시퀀스
 * param : categoryId   카테고리시퀀스
 * param : title        제목
 * param : content      내용
 */
export const putCineSquare = async(postId, categoryId, title, content) => {
    try{
        const response = await axiosApi.put(`/cinesquare/${postId}`, { 
            categoryId,
            title,
            content
        })
        return response.data;
    } catch (error) {
        console.error("게시글 수정 실패: ", error);
    }
}

/**
 * 씨네광장 게시글 삭제
 * param : postId   게시글 시퀀스
 */
export const deleteCineSquare = async(postId) => {
    try{
        const response = await axiosApi.delete(`/cinesquare/${postId}`, { })
        return response.data;
    } catch (error) {
        console.error("게시글 삭제 실패: ", error);
    }
}