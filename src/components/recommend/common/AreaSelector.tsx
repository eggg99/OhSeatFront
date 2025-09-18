import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "@/styles/custom.scss";
import { AREA_LIST } from "@/constants/area";

interface AreaSelectorProps {
    onAreaChange: (areaId: string) => void;
}

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
                        {AREA_LIST.map(({ id, label }) => {
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
