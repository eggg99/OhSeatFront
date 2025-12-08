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
    const [representative, setRepresentative] = useState<{
        type: "existing" | "new";
        index: number;
    } | null>(null);

    useEffect(() => {
        setExistingFiles(initialFiles || []);
        const repIdx = initialFiles?.findIndex(f => f.isRepresentative === "Y");
        if (repIdx !== undefined && repIdx !== -1) {
            setRepresentative({ type: "existing", index: repIdx });
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

            if (!representative && existingFiles.length === 0)
                setRepresentative({ type: "new", index: 0 });
        }
    };

    const handleSetRepresentative = (type: "existing" | "new", index: number) => {
        setRepresentative({ type, index });

        if (type === "existing") {
            const updated = existingFiles.map((f, i) => ({
                ...f,
                isRepresentative: i === index ? "Y" as const : "N" as const,
            }));
            setExistingFiles(updated);

            onRepresentativeChange?.({
                type,
                index,
                fileId: updated[index].fileId,
            });
        } else {
            const newIdx = index;
            const file = newFiles[newIdx];

            const updated = existingFiles.map((f) => ({
                ...f,
                isRepresentative: "N" as const,
            }));
            setExistingFiles(updated);

            onRepresentativeChange?.({
                type,
                index: newIdx,
            });
        }
    };

    const handleDeleteExisting = (index: number) => {
        const deleted = existingFiles[index];
        setExistingFiles(existingFiles.filter((_, i) => i !== index));
        onDeleteExisting?.(deleted.fileId);

        if (representative?.type === "existing" && representative.index === index)
            setRepresentative(null);
    };

    const handleDeleteNew = (index: number) => {
        const updated = newFiles.filter((_, i) => i !== index);
        setNewFiles(updated);
        onFilesChange(updated);

        if (representative?.type === "new" && representative.index === index)
            setRepresentative(null);
    };

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
                                    representative?.type === "existing" && representative.index === idx
                                        ? "#007bff"
                                        : "transparent",
                                color:
                                    representative?.type === "existing" && representative.index === idx
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
                                    representative?.type === "new" && representative.index === idx
                                        ? "#007bff"
                                        : "transparent",
                                color:
                                    representative?.type === "new" && representative.index === idx
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
