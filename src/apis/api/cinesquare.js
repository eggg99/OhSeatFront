import { axiosApi } from "@/apis/utils/instance";

/**
 * 씨네광장 카테고리별 게시글 전체 조회
 * param : categoryId   카테고리시퀀스
 */
export const getCineSqaureList = async(param) => {
    try{
        const response = await axiosApi.get('/cinesquare/list', { params: param })
        return response.data;
    } catch (error) {
        console.error("씨네광장 카테고리별 게시글 전체 조회 실패: ", error);
    }
}

/**
 * 씨네광장 카테고리별 인기글 조회
 * param : categoryId   카테고리시퀀스
 */
export const getCineSquareHotList = async() => {
    try{
        const response = await axiosApi.get('/cinesquare/ranking/week', {})
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
        const response = await axiosApi.get(`/cinesquare/${postId}`, {})
        return response.data;
    } catch (error) {
        console.error("씨네광장 게시글 단건 조회 실패: ", error);
    }
}

/**
 * 씨네광장 게시글 작성
 * param : data : 게시글 내용
 * param : files : 파일 첨부
 */
export const postCineSquare = async (formData) => {
    try {
        const response = await axiosApi.post("/cinesquare", formData);
        return response.data;
    } catch (error) {
        console.error("게시글 등록 실패: ", error);
    }
};

/**
 * 씨네광장 게시글 수정
 * param : postId   게시글 시퀀스
 * param : categoryId   카테고리시퀀스
 * param : title        제목
 * param : content      내용
 */
export const putCineSquare = async(postId, formData) => {
    try{
        const response = await axiosApi.put(`/cinesquare/${postId}`, formData)
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

/**
 * 위치 정보 가져오기
 * param : longitude    x축
 * param : latitude     y축
 */
export const getLocation = async (param) => {
    try{
        const response = await axiosApi.get(`/cinesquare/location`, { params: param });
        return response.data;
    } catch (error) {
        console.error("위치 정보 가져오기 실패: ", error);
    }
}

/**
 * 위치 정보 가져오기
 * param : longitude    x축
 * param : latitude     y축
 */
export const searchLocation = async (param) => {
    try{
        const response = await axiosApi.get(`/cinesquare/searchLocation`, { params: param });
        return response.data;
    } catch (error) {
        console.error("위치 정보 가져오기 실패: ", error);
    }
}

/**
 * 댓글 리스트
 * param : cinesquareId     게시글 아이디
 */
export const getCommentList = async (cinesquareId) => {
    try{
        const response = await axiosApi.get(`/cinesquare/${cinesquareId}/comments`, {});
        return response.data;
    } catch (error) {
        console.error("댓글 리스트 조회 실패: ", error);
    }
}

/**
 * 댓글 작성
 * param : cinesquareId     게시글 아이디
 */
export const postComment = async(cinesquareId, param) => {
    try{
        const response = await axiosApi.post(`/cinesquare/${cinesquareId}/comments`, param)
        return response.data;
    } catch (error) {
        console.error("게시글 댓글 등록 실패: ", error);
    }
}

/**
 * 댓글 수정
 * param : commentId     댓글 아이디
 */
export const patchComment = async(commentId, param) => {
    try{
        const response = await axiosApi.patch(`/cinesquare/comments/${commentId}`, param)
        return response.data;
    } catch (error) {
        console.error("게시글 댓글 등록 실패: ", error);
    }
}

/**
 * 댓글 삭제
 * param : commentId     댓글 아이디
 */
export const delComment = async (commentId) => {
    try{
        const response = await axiosApi.delete(`/cinesquare/comments/${commentId}`, {});
        return response.data;
    } catch (error) {
        console.error("댓글 리스트 조회 실패: ", error);
    }
}

/**
 * 게시글 상세 - 댓글 삭제
 * param : commentId      댓글 아이디
 */
export const deleteComment = async(commentId) => {
    try{
        const response = await axiosApi.delete(`/cinesquare/comments/${commentId}`)
        return response.data;
    } catch (error) {
        console.error("게시글 댓글 삭제 실패: ", error);
    }      
}

/**
 * 좋아요/좋아요취소
 * param : commentId    게시글 아이디
 */
export const likeCineSquare = async(cinesquareId) => {
    try{
        const response = await axiosApi.post(`/cinesquare/${cinesquareId}/like`,{})
        return response.data;
    } catch (error) {
        console.error("게시글 댓글 등록 실패: ", error);
    }
}

/* 파일 첨부 */
export const fileUpload = async (formData) => {
    try{
        const response = await axiosApi.post(`/files/upload`,formData)
        return response.data;
    } catch (error) {
        console.error("게시글 댓글 등록 실패: ", error);
    }
}

