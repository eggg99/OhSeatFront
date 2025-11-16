import { useState } from "react";
import { FileUpload } from "../common/file/FileUpload";

export default function EventReg () {

    // 업로드 파일 + 대표 이미지
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [representativeIndex, setRepresentativeIndex] = useState<number | null>(null);

    // 파일 상태 업데이트 함수
    const handleFilesChange = (files: File[]) => {
		setUploadFiles(files);
		// 대표 이미지 초기화: 기존 인덱스가 벗어나면 null 처리
		if (representativeIndex !== null && representativeIndex >= files.length) {
			setRepresentativeIndex(null);
		}

         if (files.length > 0) {
            setRepresentativeIndex(0);
        } else {
            setRepresentativeIndex(null);
        }
	};

    // 대표이미지 선택
    const handleRepresentativeChange = (index: number) => {
		setRepresentativeIndex(index);
	};

    return (
        <div className="os_sub_contents">
            <div className="flex gap-3">
                <div>
                    <select>
                        <option value="">선택</option>
                        <option value="1">시사회</option>
                        <option value="2">예매권</option>
                    </select>
                </div>
                <div>
                    <input type="text" placeholder="게시글 제목"/>
                </div>
                <div className="flex gap-2">
                    <input type="date" placeholder="시작일자"/>
                    <input type="date" placeholder="종료일자"/>
                </div>
            </div>

            <div>
                <FileUpload
                    onFilesChange={handleFilesChange}
                    onRepresentativeChange={handleRepresentativeChange}
                />
            </div>

            <div>
                <button>등록</button>
            </div>
        </div>
    )
}