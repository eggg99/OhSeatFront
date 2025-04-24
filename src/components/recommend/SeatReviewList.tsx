import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  import datas from '../../assets/sample/data/ReviewData.json'
  
  export default function SeatReviewList() {
    return (
        <div className="flex-[6] flex p-4 flex-col content-wrapper vtcal gap-4">
        <div className="self-end p-2">
            조회순 | 댓글순 | 최신순
        </div>
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
                    {datas.map((data) => (
                        <TableRow key={data.id}>
                        <TableCell>{data.title}</TableCell>
                        <TableCell>{data.author}</TableCell>
                        <TableCell>{data.date}</TableCell>
                        <TableCell>{data.views}</TableCell>
                        <TableCell>{data.comments}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
      <Pagination>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext href="#" />
            </PaginationItem>
        </PaginationContent>
        </Pagination>
    </div>
      
    )
  }
  