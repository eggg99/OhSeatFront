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
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, baseUrl = "http://localhost:8000/" }) => {
    if (!file || file.isRepresentative === 'N') {
        return '';
    }

    return (
        <img
            src={`${baseUrl}${file.fileUrl}`}
            alt={file.fileName}
            style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "6px",
                marginRight: "10px",
            }}
        />
    );
};
