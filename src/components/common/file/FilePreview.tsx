import React from "react";

interface UploadedFile {
	fileId: number;
	fileName: string;
	fileUrl: string;
	fileSize: number;
	fileType: string;
	isRepresentative: string; // "Y" | "N"
}

interface FilePreviewProps {
    file: UploadedFile;
    baseUrl?: string;
    previewType: 'ALL' | 'THUMBNAIL';
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, baseUrl = "http://localhost:8000/", previewType }) => {
    if (!file) return null;

    if (previewType === 'THUMBNAIL' && file.isRepresentative === 'N') return null;

    const src = `${baseUrl.replace(/\/$/, '')}/${file.fileUrl.replace(/^\//, '')}`;

    return <img src={src} alt={file.fileName} />;
};
