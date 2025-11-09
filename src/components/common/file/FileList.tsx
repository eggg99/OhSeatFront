import React from "react";

interface UploadedFile {
	fileId: number;
	fileName: string;
	fileUrl: string;
	fileSize: number;
	fileType: string;
	isRepresentative: string; // "Y" | "N"
}

interface UploadedFileListProps {
	files: UploadedFile[];
	baseUrl?: string; // e.g. "http://localhost:8000/"
}

export const FileList: React.FC<UploadedFileListProps> = ({ files, baseUrl = "http://localhost:8000/" }) => {
	if (!files || files.length === 0) {
		return <div>파일이 없습니다 🥲</div>;
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
			{files.map((file) => (
				<div
					key={file.fileId}
					style={{
						display: "flex",
						alignItems: "center",
						border: "1px solid #ddd",
						borderRadius: "8px",
						padding: "6px 10px",
						width: "320px",
						background: file.isRepresentative === "Y" ? "#f0f8ff" : "white",
					}}
				>
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
					<div>
						<div>
							<strong>{file.fileName}</strong>
							{file.isRepresentative === "Y" && (
								<span style={{ marginLeft: "6px", color: "#007bff" }}>대표</span>
							)}
						</div>
						<div style={{ fontSize: "0.85rem", color: "#666" }}>
							{(file.fileSize / 1024).toFixed(1)} KB
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
