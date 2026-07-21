import type {fileData} from "@/types/CineSquare";

export interface EventData {
  eventId : number;           // 시퀀스
  categoryId : number;        // 카테고리
  title : string;             // 제목
  startDt : string;           // 시작일
  endDt : string;             // 종료일
  end : boolean;               // 마감여부
  imgUrl : string | null;     // 썸네일이미지
}

export interface EventDataPage {
  content : EventData[];
  totalPages : number;
  totalElements : number;
  number: number;
  size : number;
  first : boolean;
  last : boolean;
}

export interface EventDataDetail {
  eventId: number,
  categoryId: number,
  authorId: number,
  title: string,
  annCount: number,
  startDt: string,
  endDt: string,
  views: number,
  likeCount: number,
  liked: boolean,
  prevSeq: number,
  nextSeq: number,
  end: boolean
  files : fileData[];
}



// "files": [
//   {
//     "fileId": 88,
//     "fileName": "8fa93648-adb4-459e-9efe-0ca84ef83960.jpg",
//     "fileUrl": "uploads\\9956a82d-c43a-4d9d-b273-9d46e2c15f77.jpg",
//     "fileSize": 57620,
//     "fileRole": "POSTER",
//     "fileType": "jpg",
//     "isRepresentative": "N"
//   },
//   {
//     "fileId": 89,
//     "fileName": "90d2dabc-87ea-4040-aed9-650934338f2e.jpg",
//     "fileUrl": "uploads\\8b453bc3-535d-48d6-9779-30f63bcf9a1c.jpg",
//     "fileSize": 74811,
//     "fileRole": "THUMB",
//     "fileType": "jpg",
//     "isRepresentative": "N"
//   },
//   {
//     "fileId": 90,
//     "fileName": "104a045e-ec54-4caa-a352-2821fea5749b.jpg",
//     "fileUrl": "uploads\\a3329fe3-b58e-4bd9-8e6d-1d305d445e2c.jpg",
//     "fileSize": 170741,
//     "fileRole": "BANNER",
//     "fileType": "jpg",
//     "isRepresentative": "N"
//   },
//   {
//     "fileId": 91,
//     "fileName": "7035cda4-db88-4f87-8904-3d2905859606.jpg",
//     "fileUrl": "uploads\\9193a9ae-d693-44cc-8adc-0145d9fef185.jpg",
//     "fileSize": 48778,
//     "fileRole": "CONTENT",
//     "fileType": "jpg",
//     "isRepresentative": "N"
//   }
// ],
