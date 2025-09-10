import { useState } from "react";

interface CinemaSelectorProps {
    cinemaList: any[];
}

export default function CinemaSelector({ cinemaList }: CinemaSelectorProps){
    const [selectedCinemaId, setSelectedCinemaId] = useState<string | null>(null);

    const handleChange = (id: string) => {
        setSelectedCinemaId(id);
    };

    if (cinemaList.length === 0) {
        return <p>영화를 상영하는 극장이 없습니다.</p>;
    }
    return(
        <div className="content-wrapper py-4">
            <div className="flex justify-center gap-4 flex-wrap">
                {/* 반복 렌더링 */}
                {cinemaList.map(({id, label}) => {
                    const isChecked = selectedCinemaId === id;


                    return(
                        <div className="checkbox-item">
                            <input
                                type="checkbox"
                                id={id}
                                className="checkbox"
                                onChange={() => handleChange(id)}
                            />
                            <label
                                htmlFor={id}
                                className={`terms-label ${isChecked ? "checked" : ""}`}
                            >{label}
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}