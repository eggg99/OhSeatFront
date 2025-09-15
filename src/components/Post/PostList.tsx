import '@/styles/custom.scss';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import { PostPage } from "@/types/Post";

interface PostListProps {
    pageData: PostPage | null;  // null 허용
    onPageChange: (page: number) => void; // 페이지 클릭 이벤트
    onOrderChange: (order:string) => void;
}

export default function PostList({ pageData, onPageChange, onOrderChange }: PostListProps) {
    if (!pageData || pageData.content.length === 0) {
        return <p>좌석 추천 데이터가 없습니다.</p>;
    }

    return (
        <section>
            <div className="flex-[6] flex p-4 flex-col content-wrapper vtcal gap-4">
                {/* 정렬 UI */}
                <div className="self-end p-2">
                    <button onClick={() =>onOrderChange('latest')}>최신순</button> | 
                    <button onClick={() =>onOrderChange('views')}>조회순</button> | 
                    <button onClick={() =>onOrderChange('comments')}>댓글순</button>
                </div>

                {/* 게시글 테이블 */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>제목</TableHead>
                            <TableHead>작성자</TableHead>
                            <TableHead>작성일</TableHead>
                            <TableHead>조회수</TableHead>
                            <TableHead>댓글</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageData.content.map((data) => (
                            <TableRow key={data.postId}>
                                <TableCell>
                                    <Link to={`/recommend/${data.postId}`}>{data.title}</Link>
                                </TableCell>
                                <TableCell>{data.authorNickname}</TableCell>
                                <TableCell>{data.createdAt}</TableCell>
                                <TableCell>{data.views}회</TableCell>
                                <TableCell>{data.commentCount}개</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* 페이지네이션 */}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => pageData.number > 0 && onPageChange(pageData.number - 1)}
                            />
                        </PaginationItem>

                        {Array.from({ length: pageData.totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={i === pageData.number} // 0 기반
                                    onClick={() => onPageChange(i)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => pageData.number < pageData.totalPages - 1 && onPageChange(pageData.number + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    );
}
