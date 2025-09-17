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
        console.error("영화관 리스트 조회 실패: ", error);
    }
}

/**
 * 상영관 리스트 조회
 * param : multiplexId  멀티플렉스 구분
 * param : cinemaId     영화관 구분
 */
export const getScreenList = async(multiplexId, cinemaId) => {
    try{
        const params = { multiplexId, cinemaId };
        const response = await axiosApi.get('/rcmd/screenList', { params })
        return response.data;
    } catch (error) {
        console.error("상영관 리스트 조회 실패: ", error);
    }
}

/**
 * 게시글 리스트 조회
 * param : multiplexId  멀티플렉스 구분
 * param : areaId       지역 구분
 * param : cinemaId     영화관 구분
 * param : screenId     상영관 구분
 * param : orderType    정렬 기준
 * param : page         페이지
 * param : size         사이즈 - 한 페이지당 불러오는 게시글 수
 */
export const getPostList = async(multiplexId, areaId, cinemaId, screenId, orderType, page, size) => {
    try{
        const params = { multiplexId, areaId, cinemaId, screenId,orderType, page, size };
        const response = await axiosApi.get('/rcmd/postList', { params })
        return response.data;
    } catch (error) {
        console.error("게시글 조회 실패: ", error);
        throw error;
    }
}

export const getPostDetail = async(postId) => {
    try{
        const response = await axiosApi.get(`/rcmd/postDetail/${postId}`)
        return response.data;
    } catch (error) {
        console.error("게시글 상세 조회 실패: ", error);
        throw error;
    }
}

export const getCommentList = async(postId) => {
    try{
        const params = { postId }
        const response = await axiosApi.get('/rcmd/commentList', { params })
        return response.data;
    } catch (error) {
        console.error("댓글 리스트 조회 실패: ", error);
        throw error;
    }
}

export const putComment = async(content, postId, commenterId) => {
    try{
        const response = await axiosApi.put("/rcmd/comment", { 
            content,
            postId,
            commenterId,
        })
    } catch (error) {
        console.error("게시글 댓글 등록 실패: ", error);
        throw error;
    }
}

export const putPost = async(authorId,multiplexId,areaId,cinemaId,screenId,title,content) => {
    try{
        const response = await axiosApi.put("/rcmd/post", { 
            authorId,
            multiplexId,
            areaId,
            cinemaId,
            screenId,
            title,
            content
        })
    } catch (error) {
        console.error("게시글 등록 실패: ", error);
        throw error;
    }
}