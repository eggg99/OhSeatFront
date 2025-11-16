import * as React from "react"

type PaginationProps = {
    currentPage : number, 
    totalPages : number, 
    onPageChange: (page: number) => void;
}

export const Pagination = ( {currentPage, totalPages, onPageChange} : PaginationProps)  => {
    return (
        <div className="pagination_wrap">
            <ul className="pagination_list">
                {/* 이전버튼 */}
                <li>
                    <a 
                        href="#" 
                        className="before"
                        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
                    >
                        <i className="blind">이전</i>
                    </a>
                </li>
                {/* 이전버튼 */}

                {Array.from({ length : totalPages}, (_, i) => (
                    <li 
                        key={i}
                        className={`${i === currentPage ? 'on' : ''}`}
                    >
                        <a 
                            href="#"
                            onClick={() => onPageChange(i+1)}
                        >
                            {i+1}
                        </a>
                    </li>
                ))}


                {/* 다음버튼 */}
                <li>
                    <a 
                        href="#" 
                        className="after"
                        onClick={() => currentPage > 0 && onPageChange(currentPage + 1)}
                    >
                        <i className="blind">다음</i>
                    </a>
                </li>
                {/* 다음버튼 */}
            </ul>
        </div>
    );
}