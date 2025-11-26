export default function EventAnnouncementDetail () {
    return (
        <div className="os_sub_contents">
                <div className="os_sub_navigation clear">
                    <h1>이벤트 당첨발표</h1>

                    <ul className="breadcrumbs_list clear">
                        <li className="home"><a href="#"><i className="blind">홈</i></a></li>
                        <li><a href="#">이벤트</a></li>
                        <li><a href="#">이벤트 당첨발표</a></li>
                    </ul>
                </div>

                <div className="theater_total_board_wrap">
                    <div className="post_button_wrap clear">
                        <div className="left"></div>

                        <div className="right">
                            <a href="#" className="post_button before">이전글</a>
                            <a href="#" className="post_button after">다음글</a>
                            <a href="os_sub_4_2.html" className="post_button">목록</a>
                        </div>
                    </div>

                    <div className="theater_detail_board_wrap">
                        <div className="detail_header">
                            {/* <!--지금은 시사회를 넣어놨지만 예매권으로도 쓰임 해당 버튼을 누를 시 시사회라고 한다면 시사회 이벤트들만 필터링되어 있는 이벤트 목록 화면으로--> */}
                            <a href="#" className="category_go_button">시사회</a>

                            <h3>이벤트 당첨발표 메뉴의 게시글 제목이 오는 자리입니다</h3>

                            <div className="post_user_wrap">
                                <p>게시글 작성자 닉네임</p>
                                <span>2025.11.12 <i>15:24</i></span>
                            </div>

                            <div className="post_control_wrap clear">
                                <a href="#" className="post_hits_button">조회수 <span>25</span></a>

                                {/* <!--더보기 버튼에 클래스네임으로 on이 붙으면 아래 게시글 삭제, 수정이 보입니다--> */}
                                <a href="#" className="post_setting_button"><span className="blind">더보기</span></a>

                                <div className="post_setting_wrap">
                                    <ul className="post_setting_list">
                                        <li><a href="#">게시글 삭제</a></li>
                                        <li><a href="#">게시글 수정</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="detail_contents">
                            <pre>영화관 좌석 추천 메뉴의 게시글 내용 예시 입니다. 
pre 태그를 감싼 div에 최소 높이 200px이 들어가 있습니다.</pre>
                        </div>

                        <div className="detail_footer">
                            <div className="post_reaction_wrap clear">
                                <div className="post_like_button">
                                    <input type="checkbox" id="like" hidden />
                                    <label htmlFor="like" className="like-btn">좋아요 <span>0</span></label>                                    
                                </div>
                                <a href="#" className="post_hits_button">조회수 <span>25</span></a>
                            </div>
                        </div>
                    </div>                    

                    <div className="post_button_wrap clear">
                        <div className="left">
                            <a href="#" className="post_button write">글쓰기</a>
                        </div>

                        <div className="right">
                            <a href="os_sub_4_2.html" className="post_button">목록</a>
                            <a href="#" className="post_button top">TOP</a>                            
                        </div>
                    </div>                    
                </div>
            </div>
    )
}