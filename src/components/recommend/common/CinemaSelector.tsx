import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface CinemaSelectorProps {
    cinemaList: any[];
    selectedCinema: any | null;
    onCinemaChange: (cinema: any) => void;
}

export default function CinemaSelector({ cinemaList, selectedCinema, onCinemaChange }: CinemaSelectorProps) {
    const [emblaRef] = useEmblaCarousel({ loop: false }); // 좌우 스와이프만
    if (cinemaList.length === 0) return <p>극장이 없습니다.</p>;

    return(
        <div className="content-wrapper py-4">
            <div className="flex justify-center gap-4 flex-wrap">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        {/* 반복 렌더링 */}
                        {cinemaList.map((cinema) => {
                            const isChecked = selectedCinema?.cinemaId === cinema.cinemaId;
                            return (
                                <div className="embla__slide" key={cinema.cinemaId}>
                                    <div className="checkbox-item">
                                        <input
                                            type="radio"
                                            id={cinema.cinemaId}
                                            name="cinema"
                                            className="checkbox"
                                            checked={isChecked}
                                            onChange={() => onCinemaChange(cinema)} // ✅ 객체 전체 전달
                                        />
                                        <label
                                            htmlFor={cinema.cinemaId}
                                            className={`terms-label ${isChecked ? "checked" : ""}`}
                                            >
                                            {cinema.cinemaName}
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}