import { axiosApi } from "@/apis/utils/instance";

/**
 * 최근 일주일간 언급 많이 된 영화관
 */
export const getTrendingCinema = async() => {
    try{
        const response = await axiosApi.get('/rcmd/trendingCinema', { })
        return response.data;
    } catch (error) {
        console.error("최근 일주일간 언급 많이 된 영화관 조회 실패: ", error);
    }
}

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
    }
}

/**
 * 게시글 상세 조회
 * param : postId       게시글 아이디
 */
export const getPostDetail = async(postId) => {
    try{
        const response = await axiosApi.get(`/rcmd/postDetail/${postId}`)
        return response.data;
    } catch (error) {
        console.error("게시글 상세 조회 실패: ", error);
    }
}

/**
 * 게시글 등록
 * param : authorId     게시글 작성자 아이디
 * param : multiplexId  멀티플렉스 구분
 * param : areaId       지역 구분
 * param : cinemaId     영화관 구분
 * param : screenId     상영관 구분
 * param : title        제목
 * param : content      내용
 */
export const insertPost = async(authorId,multiplexId,areaId,cinemaId,screenId,title,content) => {
    try{
        const response = await axiosApi.post("/rcmd/post/reg", { 
            authorId,
            multiplexId,
            areaId,
            cinemaId,
            screenId,
            title,
            content
        })
        return response.data;
    } catch (error) {
        console.error("게시글 등록 실패: ", error);
        return false;
    }
}

/**
 * 게시글 수정
 * param : multiplexId  멀티플렉스 구분
 * param : areaId       지역 구분
 * param : cinemaId     영화관 구분
 * param : screenId     상영관 구분
 * param : title        제목
 * param : content      내용
 * param : postId       게시글 아이디
 */
export const updatePost = async (multiplexId,areaId,cinemaId,screenId,title,content, postId) => {
    try {
        const response = await axiosApi.post(`/rcmd/post/edit/${postId}`, {
            multiplexId,areaId,cinemaId,screenId,title,content
        });
        return response.data;
    } catch (error) {
        if (error.response && error.status === 401) {
            alert(error.response.data.message);
            return false;
        } else {
            console.error('비밀번호 변경 에러:', error);
            alert('비밀번호 변경 실패! 다시 시도해주세요.');
            return false;
        }
    }
}

/**
 * 게시글 삭제
 * param : postId       게시글 아이디
 */
export const deletePost = async (postId) => {
    try{
        const response = await axiosApi.delete(`/rcmd/post/${postId}`)
        return response.data;
    } catch (error) {
        console.error("게시글 삭제 실패: ", error);
    }        
}


/**
 * 게시글 상세 - 댓글 리스트 조회
 * param : postId       게시글 아이디
 */
export const getCommentList = async(postId) => {
    try{
        const params = { postId }
        const response = await axiosApi.get('/rcmd/commentList', { params })
        return response.data;
    } catch (error) {
        console.error("댓글 리스트 조회 실패: ", error);
    }
}

/**
 * 게시글 상세 - 댓글 등록
 * param : content      댓글 내용
 * param : postId       게시글 아이디
 * param : commenterId  댓글 작성자 아이디
 */
export const postComment = async(content, postId, commenterId) => {
    try{
        const response = await axiosApi.post("/rcmd/comment", { 
            content,
            postId,
            commenterId,
        })
        return response.data;
    } catch (error) {
        console.error("게시글 댓글 등록 실패: ", error);
    }
}

/**
 * 게시글 상세 - 댓글 삭제
 * param : commentId      댓글 아이디
 */
export const deleteComment = async(commentId) => {
    try{
        const response = await axiosApi.delete(`/rcmd/comment/${commentId}`)
        return response.data;
    } catch (error) {
        console.error("게시글 삭제 실패: ", error);
    }      
}

/**
 * 조회수 증가
 * param : postId       게시글 아이디
 */
export const postIncrementViews = async (postId) => {
    try{
        const response = await axiosApi.post(`/rcmd/incrementViews/${postId}`, {})
        return response.data;
    } catch (error) {
        console.error("조회수 증가 실패: ", error);
    }
}

/**
 * 좋아요/좋아요취소
 * param : postId       게시글 아이디
 */
export const updatePostLike = async (postId) => {
    try{
        const response = await axiosApi.post(`/rcmd/post/like/${postId}`, {})
        return response.data;
    } catch (error) {
        console.error("좋아요 실패: ", error);
    }
}

/**
 * 최신 게시글 3개 조회
 * param : postId       게시글 아이디
 */
export const top3Post = async () => {
    try {
        const response = await axiosApi.get(`/rcmd/post/top3List`, {});
        return response.data;
    } catch (error) {
        console.error("최신 게시글 3개 조회 실패: ", error);
    }
}


/**
 * 관리자 게시글 삭제
 * param : postId       게시글 아이디
 */
export const deletePostAdmin = async (postId) => {
    try{
        const response = await axiosApi.delete(`admin/recommend/post/${postId}`)
        return response.data;
    } catch (error) {
        console.error("게시글 삭제 실패: ", error);
    }
}
