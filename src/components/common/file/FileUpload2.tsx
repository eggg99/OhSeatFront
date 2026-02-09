import React, { useRef, useState, useEffect, ChangeEvent } from "react";

type ExistingFile = {
    fileId: number;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    fileType: string;
};

interface FileUploadProps {
    mode: "create" | "edit";

    file: File | null;              // 새로 선택한 파일
    initialFile?: ExistingFile | null; // 수정 화면에서만 사용

    onFileChange: (file: File | null) => void;
    onDeleteExisting?: () => void;
}


export const FileUpload2: React.FC<FileUploadProps> = ({
    mode = "create",
    file = null,
    initialFile = null,
    onFileChange,
    onDeleteExisting,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [existingFile, setExistingFile] = useState<FileUploadProps["initialFile"]>(null);
    const [newFile, setNewFile] = useState<File | null>(null);

    /* ------------------ 초기 파일 세팅 ------------------ */
    useEffect(() => {
        setExistingFile(initialFile ?? null);
    }, [initialFile]);

    /* ------------------ 파일 선택 ------------------ */
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];

        // 기존 파일 있으면 삭제 처리
        if (existingFile) {
            onDeleteExisting?.();
            setExistingFile(null);
        }

        setNewFile(file);
        onFileChange(file);

        e.target.value = "";
    };

    /* ------------------ 기존 파일 삭제 ------------------ */
    const handleDeleteExisting = () => {
        if (!existingFile) return;

        onDeleteExisting?.();
        setExistingFile(null);
    };

    /* ------------------ 새 파일 삭제 ------------------ */
    const handleDeleteNew = () => {
        setNewFile(null);
        onFileChange(null);
    };

    const hasImage = !!existingFile || !!newFile;

    return (
      <div className="file_name_wrap clear">
          {!hasImage && (
            <>
                <p>등록 버튼을 눌러 이미지 파일을 첨부해주세요</p>
                <div className="file_button_wrap clear">
                    <button
                      type="button"
                      className="os_file_upload"
                      onClick={() => fileInputRef.current?.click()}
                    >
                        등록
                    </button>
                </div>
            </>
          )}

          {existingFile && (
            <>
                <span>{existingFile.fileName}</span>
                <i>{(existingFile.fileSize / 1024).toFixed(1)} KB</i>
                <div className="file_button_wrap clear">
                    <button
                      type="button"
                      className="os_file_delete"
                      onClick={handleDeleteExisting}
                    >
                        삭제
                    </button>
                </div>
            </>
          )}

          {newFile && (
            <>
                <span>{newFile.name}</span>
                <i>{(newFile.size / 1024).toFixed(1)} KB</i>
                <div className="file_button_wrap clear">
                    <button
                      type="button"
                      className="os_file_delete"
                      onClick={handleDeleteNew}
                    >
                        삭제
                    </button>
                </div>
            </>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
      </div>
    );
};
