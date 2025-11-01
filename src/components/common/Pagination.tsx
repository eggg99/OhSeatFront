import * as React from "react"
import '@/index.css';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"

type PaginationProps = {
  currentPage: number; // 0 기반
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationComponent = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <Pagination className="pagination_wrap">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={() => onPageChange(i+1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => currentPage < totalPages - 1 && onPageChange(currentPage + 2)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
