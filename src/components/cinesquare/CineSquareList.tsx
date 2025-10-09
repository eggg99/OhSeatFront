import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { getCineSqaureList } from "@/apis/api/cinesquare";
import { Link, useNavigate } from "react-router-dom";
import { CineSquarePage } from "@/types/CineSquare";

export default function CineSqaureList () {
    const navigate = useNavigate();
    const [cineSquareList, setCineSquareList] = useState<CineSquarePage | null >(null);
    const [page, setPage] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(1);
    const [orderType, setOrderType] = useState<string>("latest");
    const size = 10;

    const getList = async() => {
        const response = await getCineSqaureList(categoryId);
        console.log(response);
        setCineSquareList(response);
    }

    const handleCategory = (newCategoryId : number) => setCategoryId(newCategoryId)

    // 페이지 변경
    const handlePageChange = (newPage: number) => setPage(newPage);

    // 정렬 변경
    const handleOrderChange = (newOrder: string) => setOrderType(newOrder);
    
    // 첫 진입 시, 리스트 불러오기
    useEffect(() => {
        getList();
    }, [categoryId]);

    return(
        <section>
                <div className="flex-[6] flex p-4 flex-col content-wrapper vtcal gap-4">
                    {/* 정렬 UI */}
                    <div className="self-end p-2">
                        <button onClick={() =>handleOrderChange('latest')}>최신순</button> | 
                        <button onClick={() =>handleOrderChange('views')}>조회순</button> | 
                        <button onClick={() =>handleOrderChange('comments')}>댓글순</button>
                    </div>
                    {/* 카테고리 */}
                    <div className="self-end p-2">
                        <button onClick={() =>handleCategory(1)}>공지사항</button> | 
                        <button onClick={() =>handleCategory(2)}>자유수다</button> | 
                        <button onClick={() =>handleCategory(3)}>구인구직</button>
                    </div>

                    {/* 게시글 테이블 */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>카테고리명</TableHead>
                                <TableHead>제목</TableHead>
                                <TableHead>작성자</TableHead>
                                <TableHead>작성일</TableHead>
                                <TableHead>조회수</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cineSquareList && cineSquareList.content.length > 0 ? (
                                cineSquareList.content.map((item:any) => (
                                    <TableRow key={item.postId} 
                                        onClick={() => navigate(`/cinesquare/${item.postId}`)} 
                                        className="cursor-pointer hover:bg-gray-100">
                                        <TableCell>{item.categoryName}</TableCell>
                                        <TableCell>
                                            <Link to={`/cinesquare/${item.postId}`}>{item.title}</Link>
                                        </TableCell>
                                        <TableCell>{item.authorNickname}</TableCell>
                                        <TableCell>{item.createdAt}</TableCell>
                                        <TableCell>{item.views}회</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                                        내용이 없습니다 🥲
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* 페이지네이션 */}
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => cineSquareList && cineSquareList.number > 0 && handlePageChange(cineSquareList.number - 1)}
                                />
                            </PaginationItem>

                            {cineSquareList &&
                                Array.from({ length: cineSquareList.totalPages }, (_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            href="#"
                                            isActive={i === cineSquareList.number} // 0 기반
                                            onClick={() => handlePageChange(i)}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={() => cineSquareList && cineSquareList.number < cineSquareList.totalPages - 1 && handlePageChange(cineSquareList.number + 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <button><Link to={`/cinesquare/reg`}>등록</Link></button>
                </div>
            </section>
    )
}