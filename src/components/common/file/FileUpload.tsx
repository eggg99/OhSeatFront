import React, { useRef, useState, useEffect, ChangeEvent } from "react";

interface FileUploadProps {
    onFilesChange: (files: File[]) => void;

    onRepresentativeChange?: (rep: {
        type: "existing" | "new";
        index: number;
        fileId?: number;
    }) => void;

    initialFiles?: {
        fileId: number;
        fileName: string;
        fileUrl: string;
        fileSize: number;
        fileType : string;
        isRepresentative: "Y" | "N";
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
    const [representative, setRepresentative] = useState<{ type: "existing" | "new"; fileId: number | null } | null>(null);

    // 초기 대표 파일 세팅
    useEffect(() => {
        setExistingFiles(initialFiles || []);
        const repIdx = initialFiles?.findIndex(f => f.isRepresentative === "Y");
        if (repIdx !== undefined && repIdx !== -1) {
            setRepresentative({ type: "existing", fileId: initialFiles![repIdx].fileId });
        } else {
            setRepresentative(null);
        }
    }, [initialFiles]);

    const handleButtonClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selected = Array.from(e.target.files);
            const updated = [...newFiles, ...selected];
            setNewFiles(updated);
            onFilesChange(updated);

            // 기존 파일 없고 대표 파일이 없으면 새 파일 0번째를 대표로
            if (!representative && existingFiles.length === 0)
                setRepresentative({type: "new", fileId: 0});
        }
    };

    // 대표 버튼 클릭 함수
    const handleSetRepresentative = (type: "existing" | "new", index: number) => {
        if (type === "existing") {
            const fileId = existingFiles[index].fileId;
            setRepresentative({ type, fileId });
            setExistingFiles(existingFiles.map((f, i) => ({ ...f, isRepresentative: i === index ? "Y" : "N" })));
            onRepresentativeChange?.({ type, index, fileId });
        } else {
            setRepresentative({ type, fileId: index });
            setExistingFiles(existingFiles.map(f => ({ ...f, isRepresentative: "N" })));
            onRepresentativeChange?.({ type, index });
        }
    };

    // 기존 파일 삭제
    const handleDeleteExisting = (index: number) => {
        const deleted = existingFiles[index];
        const updatedFiles = existingFiles.filter((_, i) => i !== index);
        setExistingFiles(updatedFiles);
        onDeleteExisting?.(deleted.fileId);
    };

    // 기존/새 파일 변화 감지 후 대표 자동 지정
    useEffect(() => {
        if (
            representative &&
            ((representative.type === "existing" && existingFiles.some(f => f.fileId === representative.fileId)) ||
                (representative.type === "new" && representative.fileId! < newFiles.length))
        ) {
            // 대표가 아직 유효하면 아무것도 안함
            return;
        }

        // 대표가 없거나 삭제된 경우
        if (existingFiles.length > 0) {
            // 기존 파일이 있으면 첫 번째 기존 파일을 대표로
            setRepresentative({ type: "existing", fileId: existingFiles[0].fileId });
            onRepresentativeChange?.({ type: "existing", index: 0, fileId: existingFiles[0].fileId });
            setExistingFiles(prev =>
                prev.map((f, i) => ({ ...f, isRepresentative: i === 0 ? "Y" : "N" }))
            );
        } else if (newFiles.length > 0) {
            // 기존 파일 없으면 새 파일 첫 번째를 대표로
            setRepresentative({ type: "new", fileId: 0 });
            onRepresentativeChange?.({ type: "new", index: 0 });
        } else {
            setRepresentative(null);
        }
    }, [existingFiles, newFiles]);

    // 새로 올린 파일 삭제
    const handleDeleteNew = (index: number) => {
        const updated = newFiles.filter((_, i) => i !== index);
        setNewFiles(updated);
        onFilesChange(updated);
    }

    return (
        <div className="os_file_wrap">
            <button type="button" className="os_file_plus" onClick={handleButtonClick}>
                이미지 첨부하기
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple hidden />

            <ul className="os_file_list">
                {existingFiles.map((file, idx) => (
                    <li key={`exist-${file.fileId}`} className="clear">
                        <span>{file.fileName}</span>
                        <i>{(file.fileSize / 1024).toFixed(1)} KB</i>
                        <button
                            type="button"
                            onClick={() => handleSetRepresentative("existing", idx)}
                            className="os_file_delete"
                            style={{
                                background:
                                    representative?.type === "existing" && file.fileId === representative.fileId
                                        ? "#007bff"
                                        : "transparent",
                                color:
                                    representative?.type === "existing" && file.fileId === representative.fileId
                                        ? "#fff"
                                        : "#007bff",
                            }}
                        >
                            대표
                        </button>
                        <button type="button" onClick={() => handleDeleteExisting(idx)} className="os_file_delete">
                            삭제
                        </button>
                    </li>
                ))}

                {newFiles.map((file, idx) => (
                    <li key={`new-${idx}`} className="clear">
                        <span>{file.name}</span>
                        <i>{(file.size / 1024).toFixed(1)} KB</i>

                        <button
                            type="button"
                            onClick={() => handleSetRepresentative("new", idx)}
                            className="os_file_delete"
                            style={{
                                background:
                                    representative?.type === "new" && representative.fileId === idx
                                        ? "#007bff"
                                        : "transparent",
                                color:
                                    representative?.type === "new" && representative.fileId === idx
                                        ? "#fff"
                                        : "#007bff",
                            }}
                        >
                            대표
                        </button>
                        <button type="button" onClick={() => handleDeleteNew(idx)} className="os_file_delete">
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
