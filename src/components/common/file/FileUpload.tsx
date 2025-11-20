import React, { useRef, useState, useEffect, ChangeEvent } from "react";

interface FileUploadProps {
    onFilesChange: (files: File[]) => void;
    onRepresentativeChange?: (index: number) => void;
    initialFiles?: {
        fileId: number;
        fileName: string;
        fileUrl: string;
        isRepresentative: "Y" | "N";
        fileSize: number;
    }[];
    onDeleteExisting?: (fileId: number) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
      onFilesChange,
      onRepresentativeChange,
      initialFiles,
      onDeleteExisting,
    }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [existingFiles, setExistingFiles] = useState(initialFiles || []);
    const [representativeIndex, setRepresentativeIndex] = useState<number | null>(null);

    // 초기 대표이미지 설정
    useEffect(() => {
        setExistingFiles(initialFiles || []);
        const existingRepIdx = initialFiles?.findIndex(f => f.isRepresentative === "Y");
        if (existingRepIdx !== undefined && existingRepIdx !== -1) {
            setRepresentativeIndex(existingRepIdx);
        } else {
            // 등록 모드: 기존 파일 없으면 새 파일 첫 번째를 대표로 지정
            if (newFiles.length > 0) setRepresentativeIndex(0);
            else setRepresentativeIndex(null);
        }
    }, [initialFiles]);

    const handleButtonClick = () => fileInputRef.current?.click();

    // 새 파일 추가
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const updated = [...newFiles, ...selectedFiles];
            setNewFiles(updated);
            onFilesChange(updated);

            // 등록 모드에서만 새 파일이 첫 번째일 경우 대표 이미지 지정
            if (representativeIndex === null && existingFiles.length === 0) {
                setRepresentativeIndex(0);
            }
        }
    };

    // 기존 파일 삭제
    const handleDeleteExisting = (index: number) => {
        const deletedFile = existingFiles[index];
        setExistingFiles(existingFiles.filter((_, i) => i !== index));
        onDeleteExisting?.(deletedFile.fileId);
        if (representativeIndex === index) setRepresentativeIndex(null);
    };

    // 새 파일 삭제
    const handleDeleteNew = (index: number) => {
        const updated = newFiles.filter((_, i) => i !== index);
        setNewFiles(updated);
        onFilesChange(updated);
        if (representativeIndex === index + existingFiles.length) setRepresentativeIndex(null);
    };

    // 대표 이미지 선택
    const handleSetRepresentative = (index: number, isExisting: boolean) => {
        setRepresentativeIndex(index);
        onRepresentativeChange?.(index);

        if (isExisting) {
            const updated = existingFiles.map((f, i) => ({
                ...f,
                isRepresentative: (i === index ? "Y" : "N") as "Y" | "N",
            }));
            setExistingFiles(updated);
        }
    };

    return (
        <div className="os_file_wrap">
            <button type="button" className="os_file_plus" onClick={handleButtonClick}>
                이미지 첨부하기
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple hidden />

            <ul className="os_file_list">
                {/* 기존 파일 */}
                {existingFiles.map((file, index) => (
                    <li key={`exist-${file.fileId}`}>
                        <img
                            src={`http://localhost:8000/${file.fileUrl}`}
                            alt={file.fileName}
                        />
                        <span>{file.fileName}</span>
                        <i>{(file.fileSize / 1024).toFixed(1)} KB</i>
                        <button
                            type="button"
                            onClick={() => handleSetRepresentative(index, true)}
                            className="os_file_delete"
                            style={{ background: file.isRepresentative === "Y" ? "#007bff" : "transparent", color: file.isRepresentative === "Y" ? "#fff" : "#007bff",}}
                        >대표</button>
                        <button
                            type="button"
                            className="os_file_delete"
                            onClick={() => handleDeleteExisting(index)}
                        >삭제</button>
                    </li>
                ))}

                {/* 새 파일 */}
                {newFiles.map((file, index) => (
                    <li key={`new-${index}`}>
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            style={{ width: 80, height: 80, objectFit: 'cover' }}
                        />
                        <span>{file.name}</span>
                        <i>{(file.size / 1024).toFixed(1)} KB</i>
                        <button
                            type="button"
                            onClick={() => handleSetRepresentative(index + existingFiles.length, false)}
                            className="os_file_delete"
                            style={{ background:
                                    representativeIndex === index + existingFiles.length ? "#007bff" : "transparent",
                                color:
                                    representativeIndex === index + existingFiles.length ? "#fff" : "#007bff",}}
                        >대표</button>
                        <button
                            type="button"
                            onClick={() => handleDeleteNew(index)}
                            className="os_file_delete"
                        >삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
