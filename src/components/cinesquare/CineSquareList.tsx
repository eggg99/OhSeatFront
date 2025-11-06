import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState, useRef } from "react";
import { getCineSqaureList } from "@/apis/api/cinesquare";
import { Link, useNavigate } from "react-router-dom";
import Location from "@/components/common/Location";

const PAGE_SIZE = 10;

export default function CineSqaureList () {
    const navigate = useNavigate();
    const [cineSquareList, setCineSquareList] = useState<any[]>([]);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [lastPostId, setLastPostId] = useState<number | null>(null);
    const [orderType, setOrderType] = useState<string>('');
    
    const loaderRef = useRef<HTMLDivElement | null>(null);  // 무한스크롤의 관찰 대상 div를 가리키는 참조
    const [isLoading, setIsLoading] = useState(false);      // 로딩 중 여부
    const [hasMore, setHasMore] = useState(true);           // 더 불러올 데이터가 있는지 여부

    const getList = async() => {
        // 로딩중 or 불러올 데이터 X
        if(isLoading || !hasMore) return;   // 중복 요청 방지
        // 로딩중으로 만들기
        setIsLoading(true);

        const param = {
            categoryId : categoryId,
            lastPostId : lastPostId,
            orderType : orderType
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

    const handleCategory = (newCategoryId : number) => setCategoryId(newCategoryId)

    // 정렬 변경
    const handleOrderChange = (newOrder: string) => setOrderType(newOrder);

    // 첫 진입 시, 리스트 불러오기
    useEffect(() => {
        setCineSquareList([]);
        setLastPostId(null);
        setHasMore(true);
        getList();
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
            threshold : 0.5,   // 50% 보이면 트리거
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

    return(
        <section>
            <div className="os_sub_contents">
                {/* 위치 */}
                <div>
                    <button onClick={search} className="btn btn-primary">위치검색</button>
                    <Location></Location>
                </div>
                    <div className="w-20">
                        {/* 카테고리 */}
                        <select>
                            <option onClick={() =>handleCategory(0)}>전체</option>
                            <option onClick={() =>handleCategory(1)}>공지사항</option>
                            <option onClick={() =>handleCategory(2)}>자유수다</option>
                            <option onClick={() =>handleCategory(3)}>구인구직</option>
                        </select>
                        
                        {/* 정렬 UI */}
                        <select>
                            <option onClick={() =>handleOrderChange('latest')}>최신순</option>
                            <option onClick={() =>handleOrderChange('views')}>조회순</option>
                            <option onClick={() =>handleOrderChange('comments')}>댓글순</option>
                        </select>
                    </div>

                    {/* 게시글 테이블 */}
                    <table>
                        <thead>
                            <tr>
                                <th>카테고리명</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cineSquareList && cineSquareList.length > 0 ? (
                                cineSquareList.map((item: any, index: number) => (
                                    <tr key={`${item.postId}-${index}`}
                                        onClick={() => navigate(`/cinesquare/${item.postId}`)} 
                                        className="cursor-pointer hover:bg-gray-100 h-24">
                                        <td>{item.postId} , {item.categoryName}</td>
                                        <td>
                                            <Link to={`/cinesquare/${item.postId}`}>{item.title}</Link>
                                        </td>
                                        <td>{item.authorNickname}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.views}회</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500">
                                        내용이 없습니다 🥲
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* 로딩 데이터 */}
                    <div
                        ref={loaderRef}
                        className="h-10 mt-8 flex justify-center items-center text-gray-400"
                    >
                        {isLoading ? "불러오는 중..." : hasMore ? "" : "마지막 글이에요!"}
                    </div>

                    <button><Link to={`/cinesquare/reg`}>등록</Link></button>
                </div>
            </section>
    )
}