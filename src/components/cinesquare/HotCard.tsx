import React from "react";

interface CardProps {
    title : string;         // 제목
    location : string;      // 위치
    thumbnail?: string;     // 썸네일 없는 경우 optional
    onClick?: () => void;   // 클릭 이벤트 받도록
}

export default function HotCard({ title, location, thumbnail, onClick }: CardProps) {
    return (
        <li onClick={onClick}>
            <a>
                <h4>{title}</h4>
                <i>{location}</i>

                {thumbnail && (
                    <div className="img_thumbnail_wrap">
                        <img src={thumbnail} alt={title} />
                    </div>
                )}
            </a>
        </li>
    )
}