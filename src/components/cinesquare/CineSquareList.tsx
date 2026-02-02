import {useEffect, useState, useRef} from "react";
import {getCineSqaureList, getCineSquareHotList, likeCineSquare} from "@/apis/api/cinesquare";
import {Link, useNavigate} from "react-router-dom";
import Location from "@/components/common/Location";
import {FilePreview} from '@/components/common/file/FilePreview';
import { userStore } from "@/store/userStore";
import HotCard from './HotCard';
import { deleteAdminPost } from "@/apis/api/admin";
import { CATEGORY } from '@/constants/category_cine';

const PAGE_SIZE = 10;

export default function CineSqaureList() {
    const navigate = useNavigate();
    const isLogin = userStore((state) => state.isLogin);
    const isAdmin = userStore((state) => state.isAdmin);
    const [isEditMode, setIsEditMode] = useState(false);        // 편집모드 상태
    const [cineSquareHotList, setCineSquareHotList] = useState<any[]>([]);
    const [cineSquareList, setCineSquareList] = useState<any[]>([]);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [lastPostId, setLastPostId] = useState<number | null>(null);
    const [orderType, setOrderType] = useState<string>('');
    const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]);       // 관리자용 삭제할 게시글 배열

    const loaderRef = useRef<HTMLDivElement | null>(null);  // 무한스크롤의 관찰 대상 div를 가리키는 참조
    const [isLoading, setIsLoading] = useState(false);      // 로딩 중 여부
    const [hasMore, setHasMore] = useState(true);           // 더 불러올 데이터가 있는지 여부

    const getList = async () => {
        // 로딩중 or 불러올 데이터 X
        if (isLoading || !hasMore) return;   // 중복 요청 방지
        // 로딩중으로 만들기
        setIsLoading(true);

        const param = {
            categoryId: categoryId,
            lastPostId: lastPostId,
            orderType: orderType
        }

        // ✅ 처음 요청이 아닐 때만 lastPostId 포함
        if (lastPostId !== null) {
            param.lastPostId = lastPostId;
        }

        try {
            const response = await getCineSqaureList(param);

            // 불러올 데이터 O
            if (response && response.length > 0) {
                // 기존 리스트에 가져온 데이터 추가
                setCineSquareList(prev => [...prev, ...response]);
                // 마지막 postId 갱신시키기
                setLastPostId(response[response.length - 1].postId);

                // ✅ 불러온 데이터가 페이지 사이즈보다 작으면 마지막 페이지
                if (response.length < PAGE_SIZE) {
                    setHasMore(false);
                }
            }
            // 불러올 데이터 X 
            else {
                setHasMore(false);
            }
        } finally {
            // 로딩중 화면 끄기
            setIsLoading(false)
        }
    }

    // reset + 첫 fetch 전용 함수
    const fetchFirstPage = async () => {
        setIsLoading(true);

        const param = {
            categoryId,
            orderType,
            lastPostId: null,
        };

        try {
            const response = await getCineSqaureList(param);

            if (response && response.length > 0) {
                setCineSquareList(response);
                setLastPostId(response[response.length - 1].postId);
                setHasMore(response.length >= PAGE_SIZE);
            } else {
                setCineSquareList([]);
                setHasMore(false);
            }
        } finally {
            setIsLoading(false);
        }
    };


    const getHotList = async () => {
        try {
            const response = await getCineSquareHotList();

            if (response && response.length > 0) {
                setCineSquareHotList(response);
            }
        } catch (error) {
            console.error('게시글 조회 실패' , error);
        }
    }

    const handleCategory = (newCategoryId: number) => setCategoryId(newCategoryId)

    // 정렬 변경
    const handleOrderChange = (newOrder: string) => setOrderType(newOrder);

    // 관리자용 체크박스 선택/해제 핸들러
    const handleSelectPost = (postId: number) => {
        setSelectedPostIds((prev) =>
          prev.includes(postId)
            ? prev.filter((id) => id !== postId) // 이미 있으면 제거
            : [...prev, postId]                  // 없으면 추가
        );
    };

    const toggleEditMode = () => {
        setIsEditMode(prev => {
            const next = !prev;

            // edit mode 끄는 순간 → 선택 초기화
            if (!next) {
                setSelectedPostIds([]);
            }

            return next;
        });
    };

    // 관리자용 체크박스 선택한 게시글 삭제
    const deleteArray = async () => {
        if (selectedPostIds.length === 0) {
            alert ('선택된 게시글이 없습니다');
            return false;
        }
        try {
            const param = {
                boardType : 'CINESQUARE',
                postIds : selectedPostIds,
            }
            await deleteAdminPost(param);
            alert ('삭제되었습니다');

            setSelectedPostIds([]);
            setIsEditMode(false);

            // ✅ 리스트 완전 리프레시
            await resetAndFetchList();
        } catch (error) {
            console.log(error);
        }
    }

    // 리스트 초기화 함수
    const resetAndFetchList = async () => {
        setCineSquareList([]);
        setLastPostId(null);
        setHasMore(true);

        await fetchFirstPage(); // 직접 첫 페이지 호출
    }


    // 첫 진입 시, 리스트 불러오기
    useEffect(() => {
        resetAndFetchList();
        getHotList();
    }, [categoryId, orderType]);

    // Intersection Observer로 무한 스크롤 감지
    useEffect(() => {
        // 어떤 요소가 다른 요소와 겹치는지 비동기식으로 알려주는 브라우저 api
        // entries : 관찰중인 요소의 변화 목록 
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];      // 하나의 요소만 관찰하므로 첫번째 항목만 target 지정
            // 조건 : 관찰대상이 화면에 보이는지 && 더 불러올 데이터가 있는지 && 불러오는 중이 아닌지
            if (target.isIntersecting && hasMore && !isLoading) {
                getList();
            }
        }, {
            // 관찰 요소가 얼마만큼 보일 때 콜백을 트리거할지 정하는 값
            // 0.0 ~ 1.0 사이
            threshold: 0.5,   // 50% 보이면 트리거
        });
        // div가 화면에 보이게 되면 알려주는 동작 시작
        // 실제 DOM 노드와 연결되어 있으면 요소를 observer가 관찰하도록 등록
        if (loaderRef.current) observer.observe(loaderRef.current);

        // 컴포넌트 언마운트 or effect가 재실행되기전에 정리함수 호출
        return () => {
            // 관찰을 멈추고 리소스 정리
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [hasMore, isLoading]);


    const search = () => {
        navigate("/cinesquare/search")
    }

    // 좋아요 처리 //여기에 postId 매개변수로 넣기
    const handleLike = async (postId: number) => {
        try {
            await likeCineSquare(postId);

            setCineSquareList(prev =>
                prev.map(item =>
                    item.postId === postId
                        ? {
                            ...item,
                            isLiked: !item.isLiked,
                            likeCount: !item.isLiked
                                ? item.likeCount + 1
                                : Math.max(item.likeCount - 1, 0),
                        }
                        : item
                )
            );
        } catch (error) {
            console.error("좋아요 처리 실패", error);
        }
    };

    return (
        <div className="os_sub_contents">
            <div className="os_freetalk_wrap clear">
                <div className="os_timeline_wrap">

                    <section className="location_wrap clear">
                        <Location onClick={search} />

                        <div className="post_edit_wrap clear">
                            {isAdmin && (
                                <>
                                <button
                                  type="button"
                                  className={`edit_button ${isEditMode ? 'on' : ''}`}
                                  onClick={toggleEditMode}
                                >
                                    편집 모드
                                </button>
                                {isEditMode && (
                                    <button
                                        type="button"
                                        className="del_select_button"
                                        onClick={() => deleteArray()}
                                    >
                                        선택 게시글 삭제
                                    </button>
                                )}
                                </>
                            )}
                        </div>
                    </section>

                    <section className="os_freetalk_tabmenu">
                        <ul className="os_freetalk_list clear">
                            {CATEGORY.map((category) => (
                              <li
                                key={category.id}
                                className={categoryId === category.id ? 'on' : ''}
                              >
                                  <a
                                    href="#"
                                    onClick={() => handleCategory(category.id)}
                                  >
                                      {category.name}
                                  </a>
                              </li>
                            ))}
                        </ul>
                        <div className="post_filter_wrap2 clear">
                                <select 
                                    value={orderType}
                                    onChange={(e) => handleOrderChange(e.target.value)}
                                >
                                    <option value={'latest'}>최신순</option>
                                    <option value={'liked'}>추천순</option>
                                    <option value={'views'}>조회순</option>
                                    <option value={'comments'}>댓글순</option>
                                </select>
                            </div>
                    </section>

                    <section className="os_freetalk_hot">
                        <h3>씨네광장 인기글</h3>

                        {/*인기글만 모아보는 화면 생성 필요*/}
                        <Link to={"/cinesquare/hot"} className="freetalk_hot_button">더보기</Link>

                        <ul className="os_freetalk_hot_list">
                            {cineSquareHotList.length > 0 ? (
                                cineSquareHotList.map((item, idx) => (
                                    <HotCard
                                        key={`hotcard-${idx}`}
                                        title={item.title}
                                        location={`${item.city} ${item.district}`}
                                        file={item.representativeFile}
                                        onClick={() => navigate(`/cinesquare/${item.postId}`)}
                                    />
                                ))
                            ) : (
                                <li>인기글이 없습니다</li>
                            )}
                        </ul>
                    </section>

                    {cineSquareList && cineSquareList.length > 0 ? (
                        cineSquareList.map((item: any, index: number) => (
                            <section
                              className={`
                                os_freetalk_section 
                                ${isEditMode ? 'edit_mode cursor-pointer' : ''}
                                ${selectedPostIds.includes(item.postId) ? 'checked' : ''}
                             `}
                              key={`cine-square-${index}`}
                              onClick={() => {
                                  if (isEditMode) {
                                      handleSelectPost(item.postId);
                                  }
                              }}
                            >
                                <p className="category">{item.categoryName}</p>
                                <h3 className="title">{item.title}</h3>

                                <ul className="post_info_list clear">
                                    <li><i>{item.authorNickname}</i></li>
                                    <li><span>{item.createdAt ? item.createdAt.split("T")[0].replace(/-/g, ".") : ""}</span></li>
                                    <li><p>{item?.city} {item?.district}</p></li>
                                </ul>

                                <Link to={`/cinesquare/${item.postId}`} className="cursor-pointer">
                                    <div className="freetalk_text_wrap">
                                        <pre>{item.content}</pre>
                                    </div>
                                    {item?.representativeFile && (
                                        <div className="freetalk_img_wrap">
                                            <FilePreview file={item?.representativeFile ?? []} previewType={"THUMBNAIL"}/>
                                            {item.totalFiles > 1 && (
                                                <span>{item.totalFiles - 1}개 이미지 더보기</span>
                                            )}
                                        </div>
                                    )}
                                </Link>

                                <div className="freetalk_like_comment clear">
                                    <div className="left">
                                        <div className="post_like_button">
                                            <input
                                                type="checkbox"
                                                id={`like-${item.postId}`}
                                                hidden
                                                checked={item.isLiked}
                                                onChange={() => handleLike(item.postId)}
                                            />
                                            <label htmlFor={`like-${item.postId}`} className="like-btn">
                                                좋아요 <span>{item?.likeCount ?? 0}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <Link to={`/cinesquare/${item.postId}#comment`}
                                           className="post_comment_button">댓글 <span>{item?.commentCount ?? 0}</span></Link>
                                    </div>
                                </div>
                            </section>
                        ))
                    ) : (
                        <section className="os_freetalk_section">
                            <p>게시글이 없습니다</p>
                        </section>
                    )}

                </div>

                {/*광고 영역*/}
                <div className="os_ad_wrap"></div>

                <div className="os_freetalk_floating">
                    {isLogin && (
                      <>
                          <a
                            href="#"
                            className={`os_freetalk_edit_button ${isEditMode ? 'on' : ''}`}
                            onClick={toggleEditMode}
                          >
                              <i className="blind">편집 모드</i>
                          </a>
                          {isEditMode && (
                            <a
                              href="#"
                              className={`os_freetalk_del_button`}
                              onClick={() => deleteArray()}
                            >
                                <i className="blind">삭제</i>
                            </a>
                          )}
                      </>
                    )}

                    <a href="#" className="os_freetalk_top_button"><i className="blind">위로</i></a>
                    {isLogin && (
                      <>
                        <Link
                            to="/cinesquare/reg"
                            className="os_freetalk_write_button"
                        >
                            <i className="blind">글쓰기</i>
                        </Link>
                      </>
                    )}
                </div>
            </div>
        </div>
    )
}