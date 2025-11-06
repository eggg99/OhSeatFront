import React, { useRef, useState, ChangeEvent } from "react";

interface FileUploadProps {
  	onFilesChange: (files: File[]) => void; // 부모에게 알릴 콜백
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesChange }) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [files, setFiles] = useState<File[]>([]);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const selectedFiles = Array.from(e.target.files);
			const newFiles = [...files, ...selectedFiles];
			setFiles(newFiles);
			onFilesChange(newFiles); // ✅ 부모에게 전달
		}
	};

	const handleDeleteFile = (index: number) => {
		const updated = files.filter((_, i) => i !== index);
		setFiles(updated);
		onFilesChange(updated); // ✅ 삭제 후에도 부모에 반영
	};

  	return (
		<div>
			<button type="button" onClick={handleButtonClick}>
				이미지 첨부 버튼
			</button>

			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				multiple
				style={{ display: "none" }}
			/>

			<div style={{ marginTop: "12px" }}>
				{files.map((file, index) => (
				<div
					key={index}
					style={{
					padding: "6px 10px",
					marginBottom: "4px",
					border: "1px solid #ddd",
					borderRadius: "8px",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "300px",
					}}
				>
					<div>
						<strong>{file.name}</strong>
						<div style={{ fontSize: "0.85rem", color: "#666" }}>
							{(file.size / 1024).toFixed(1)} KB
						</div>
						<div style={{ fontSize: "0.85rem", color: "#666" }}>
							{(file.size / 1024).toFixed(1)} KB
						</div>
					</div>
					<button
						type="button"
						onClick={() => handleDeleteFile(index)}
						style={{
							background: "transparent",
							border: "none",
							color: "red",
							cursor: "pointer",
						}}
						>✕</button>
				</div>
				))}
			</div>
		</div>
	);
};