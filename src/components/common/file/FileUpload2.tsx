import React, { useRef, ChangeEvent } from "react";
import { fileData } from "@/types/CineSquare";

interface FileUploadProps {
    mode: "create" | "edit";

    /** 서버에 이미 존재하는 파일 (수정 화면용) */
    existingFile?: fileData | null;

    /** 새로 선택한 파일 */
    newFile?: File | null;

    /** 새 파일 선택 / 삭제 시 호출 */
    onChange: (file: File | null) => void;

    /** 기존 파일 삭제 시 호출 */
    onDeleteExisting?: () => void;
}

export const FileUpload2: React.FC<FileUploadProps> = ({
                                                           mode,
                                                           existingFile = null,
                                                           newFile = null,
                                                           onChange,
                                                           onDeleteExisting,
                                                       }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const hasImage = !!existingFile || !!newFile;

    /* ---------- 파일 선택 ---------- */
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];
        onChange(file);

        // 동일 파일 재선택 가능하게
        e.target.value = "";
    };

    /* ---------- 기존 파일 삭제 ---------- */
    const handleDeleteExisting = () => {
        onDeleteExisting?.();
    };

    /* ---------- 새 파일 삭제 ---------- */
    const handleDeleteNew = () => {
        onChange(null);
    };

    return (
      <div className="file_name_wrap clear">
          {/* 아무 파일도 없을 때 */}
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

          {/* 기존 파일 (서버 파일) */}
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

          {/* 새로 선택한 파일 */}
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
            hidden
            onChange={handleFileChange}
          />
      </div>
    );
};
