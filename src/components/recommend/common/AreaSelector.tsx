import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "@/styles/custom.scss";

interface AreaSelectorProps {
    onAreaChange: (areaId: string) => void;
}

const areaList = [
    { id: "11", label: "서울" },
    { id: "12", label: "경기" },
    { id: "13", label: "인천" },
    { id: "14", label: "강원" },
    { id: "15", label: "대전/충청" },
    { id: "16", label: "대구" },
    { id: "17", label: "부산/울산" },
    { id: "18", label: "경상" },
    { id: "19", label: "광주/전라/제주" },
]

export default function AreaSelector({ onAreaChange }: AreaSelectorProps) {
    const [selectedAreaId, setSelectedAreaId] = useState<string>();
    const [emblaRef] = useEmblaCarousel({ loop: false }); // 좌우 스와이프만

    const handleChange = (id: string) => {
        setSelectedAreaId(id);
        onAreaChange(id);
    };

    return (
        <div className="content-wrapper py-4">
            <div className="flex justify-center gap-4 flex-wrap">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        {/* 반복 렌더링 */}
                        {areaList.map(({ id, label }) => {
                            const isChecked = selectedAreaId === id;
                            return (
                                <div className="embla__slide" key={id}>
                                    <div className="checkbox-item">
                                        <input
                                            type="radio"
                                            id={id}
                                            name="area"
                                            className="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleChange(id)}
                                        />
                                        <label
                                            htmlFor={id}
                                            className={`terms-label ${isChecked ? "checked" : ""}`}
                                        >{label}</label>

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
