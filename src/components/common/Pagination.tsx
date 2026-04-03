import * as React from "react"

type PaginationProps = {
    currentPage : number, 
    totalPages : number, 
    onPageChange: (page: number) => void;
    pageBase?: 0 | 1;
}

export const Pagination = ( {currentPage, totalPages, onPageChange, pageBase = 1} : PaginationProps)  => {
    const firstPage = pageBase;
    const lastPage = totalPages > 0 ? totalPages - 1 + pageBase : pageBase;

    return (
        <div className="pagination_wrap">
            <ul className="pagination_list">
                {/* 이전버튼 */}
                <li>
                    <button
                        type="button"
                        className="before"
                        onClick={() => {
                            if (currentPage > firstPage) {
                                onPageChange(currentPage - 1);
                            }
                        }}
                    >
                        <i className="blind">이전</i>
                    </button>
                </li>
                {/* 이전버튼 */}

                {Array.from({ length : totalPages}, (_, i) => {
                    const pageNumber = i + pageBase;

                    return (
                    <li
                        key={i}
                        className={`${pageNumber === currentPage ? 'on' : ''}`}
                    >
                        <button
                            type="button"
                            onClick={() => {
                                onPageChange(pageNumber);
                            }}
                        >
                            {i+1}
                        </button>
                    </li>
                    );
                })}


                {/* 다음버튼 */}
                <li>
                    <button
                        type="button"
                        className="after"
                        onClick={() => {
                            if (currentPage < lastPage) {
                                onPageChange(currentPage + 1);
                            }
                        }}
                    >
                        <i className="blind">다음</i>
                    </button>
                </li>
                {/* 다음버튼 */}
            </ul>
        </div>
    );
}
