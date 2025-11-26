export default function EventDetail () {
    return (
        <div className="os_sub_contents">
                <div className="os_sub_navigation clear">
                    <h1>이벤트 둘러보기</h1>

                    <ul className="breadcrumbs_list clear">
                        <li className="home"><a href="#"><i className="blind">홈</i></a></li>
                        <li><a href="#">이벤트</a></li>
                        <li><a href="#">이벤트 둘러보기</a></li>
                    </ul>
                </div>

                <div className="theater_total_board_wrap">
                    <div className="post_button_wrap clear">
                        <div className="left"></div>

                        <div className="right">
                            <a href="#" className="post_button before">이전글</a>
                            <a href="#" className="post_button after">다음글</a>
                            <a href="#" className="post_button">목록</a>
                        </div>
                    </div>

                    <div className="theater_detail_board_wrap">
                        <div className="detail_header">
                            {/* 지금은 시사회를 넣어놨지만 예매권으로도 쓰임 해당 버튼을 누를 시 시사회라고 한다면 시사회 이벤트들만 필터링되어 있는 이벤트 목록 화면으로 */}
                            <a href="#" className="category_go_button">시사회</a>

                            <h3>이벤트 둘러보기 메뉴의 게시글 제목이 오는 자리입니다</h3>

                            <div className="event_overview_wrap">
                                <ul className="event_overview_list clear">
                                    <li className="date"><p>2025.10.11 ~ 2025.10.20</p></li>
                                    <li className="draw"><span>당첨인원 <i>20명</i></span></li>
                                    <li className="state">
                                        <i className="on_going">진행중</i>
                                        <i className="closed">종료</i>
                                        {/* <!--진행중 혹은 종료가 일자 맞춰서 보이게끔--> */}
                                    </li>
                                </ul>
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
                            <pre><img src="./img/251114_event.jpg"/></pre>
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
                            <a href="#" className="post_button">목록</a>
                            <a href="#" className="post_button top">TOP</a>                            
                        </div>
                    </div>                    
                </div>
            </div>
    )
}