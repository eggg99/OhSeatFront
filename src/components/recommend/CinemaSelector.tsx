import { useState } from "react";
import '../../styles/custom.scss'

interface CinemaSelectorProps {
    cinemaList: any[];
    selectedCinema: any | null;
    onCinemaChange: (cinema: any) => void;
}

export default function CinemaSelector({ cinemaList, selectedCinema, onCinemaChange }: CinemaSelectorProps) {
    if (cinemaList.length === 0) return <p>극장이 없습니다.</p>;

    return(
        <div className="content-wrapper py-4">
            <div className="flex justify-center gap-4 flex-wrap">
                {cinemaList.map((cinema) => {
                    const isChecked = selectedCinema?.cinemaId === cinema.cinemaId;
                    return (
                        <div className="checkbox-item" key={cinema.cinemaId}>
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
                    );
                })}
            </div>
        </div>
    )
}