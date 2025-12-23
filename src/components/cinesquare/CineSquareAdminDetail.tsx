import { getNotice, deleteNotice} from "@/apis/api/admin";
import { CineSquareData } from "@/types/CineSquare";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userStore } from "@/store/userStore";

export default function CineSquareAdminDetail(){
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const userId = userStore((state) => state.userId);
    const isLogin = userStore((state) => state.isLogin);
    const isAdmin = userStore((state) => state.isAdmin);

    const [detailValue, setDetailValue] = useState<CineSquareData>();
    const hasViewed = useRef(false);
    const [isMenuOn, setMenuOn] = useState(false);

    // 목록으로
    const list = () => {
        navigate(`/cinesquare/list?category=0`);
    }

    const handleViews = async () => {
        // 로그인한 유저만 조회수 증가 가능 => 민정이한테 만들어달라하기
        if(userId){
            // await postIncrementViews(id);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if(id && !hasViewed.current) {
                hasViewed.current = true; // 한 번만 실행되도록 막음
                await getData();
            }
        };
        fetchData();
    }, [id]);

    // 게시글 내용 불러오기
    const getData = async () => {
        try {
            const response = await getNotice(id);

            const dateObj = new Date(response.createdAt);
            const date = dateObj.toISOString().slice(0, 10).replace(/-/g, "."); // YYYY.MM.DD
            const time = dateObj.toTimeString().slice(0, 5); // HH:mm

            setDetailValue({
                ...response,
                createdAtDate: date,
                createdAtTime: time
            });
        } catch (error) {
            console.error(error);
        }
    }

    // 게시글 삭제
    const handleDelete = async() => {
        const result = confirm("삭제하시겠습니까?");
        try {
            if(result){
                const response = await deleteNotice(id);
                alert(response);
                list();
            }
        } catch (error) {
            console.error(error);
        }
    }

    // 수정 / 삭제 메뉴 버튼 클릭
    const handleInnerToggle = () => {
        setMenuOn((prev) => !prev);
    };

    return(
        <div className="os_sub_contents">
            <div className="os_freetalk_wrap clear">
                <div className="os_freetalk_subtitle">
                    <button onClick={list} className="go_before_button">목록으로 돌아가기</button>

                    <h3>씨네광장 소식</h3>
                </div>

                <div className="theater_detail_board_wrap2">
                    <div className="detail_header">
                        <a href="#" className="category_go_button">{detailValue?.categoryName}</a>

                        <h3>{detailValue?.title}</h3>

                        <div className="post_user_wrap">
                            <p>{detailValue?.authorNickname}</p>
                            <span>{detailValue?.createdAtDate} <i>{detailValue?.createdAtTime}</i></span>

                            <span>{detailValue?.city} {detailValue?.district}</span>
                        </div>

                        <div className="post_control_wrap clear">
                            <a href="#" className="post_hits_button">조회수
                                <span>{detailValue?.views ?? 0}</span>
                            </a>

                            <a href="#" className="post_comment_button">댓글
                                <span>{detailValue?.commentCount ?? 0}</span>
                            </a>

                            {isLogin && detailValue?.authorId == userId && (
                                <a href="#" className={`post_setting_button ${isMenuOn ? "on" : ""}`} onClick={handleInnerToggle}>
                                    <span className="blind">더보기</span>
                                </a>
                            )}

                            <div className="post_setting_wrap">
                                {detailValue?.authorId == userId && isAdmin &&
                                    <ul className="post_setting_list">
                                        <li><a onClick={handleDelete} className="cursor-pointer">게시글 삭제</a></li>
                                        <li><Link to={`/cinesquare/admin/edit/${id}`}>게시글 수정</Link></li>
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="detail_contents">
                        <pre>{detailValue?.content}</pre>
                    </div>

                    <div className="detail_footer">
                        <div className="post_reaction_wrap clear">
                            <a href="#" className="post_hits_button">조회수 <span>{detailValue?.views}</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}