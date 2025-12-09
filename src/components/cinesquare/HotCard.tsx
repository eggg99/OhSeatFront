import React from "react";
import {FilePreview} from '@/components/common/file/FilePreview';

interface UploadedFile {
    fileId: number;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    fileType: string;
    isRepresentative: string; // "Y" | "N"
}

interface CardProps {
    title : string;         // 제목
    location : string;      // 위치
    file?: UploadedFile;     // 썸네일 없는 경우 optional
    onClick?: () => void;   // 클릭 이벤트 받도록
}

export default function HotCard({ title, location, file, onClick }: CardProps) {
    return (
        <li onClick={onClick}>
            <a className="cursor-pointer">
                <h4>{title}</h4>
                <i>{location}</i>

                {file && (
                    <div className="img_thumbnail_wrap">
                        <FilePreview file={file ?? []} previewType={"THUMBNAIL"}/>
                    </div>
                )}
            </a>
        </li>
    )
}