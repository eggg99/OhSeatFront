export const CATEGORY_LABEL: Record<number, string> = {
  1: '시사회',
  2: '예매권',
};

export interface AnnouncementData {
  eventId : number;           // 시퀀스
  categoryId : number;        // 카테고리
  title : string;             // 제목
  createdAt  : string;        // 작성일
  content : string;           // 내용
  views: number;              // 조회수
}

export interface AnnouncementPage {
  content : AnnouncementData[];
  totalPages : number;
  totalElements : number;
  number: number;
  size : number;
  first : boolean;
  last : boolean;
}

export interface AnnouncementDataDetail {
  eventId : number;           // 시퀀스
  categoryId : number;        // 카테고리
  title : string;         // 제목
  createdAtDate?: string; // 날짜
  createdAtTime?: string; // 시간
  content : string;       // 내용
  likeCount:number;       // 좋아요개수
  liked : boolean;        // 좋아요여부
  prevSeq : number;       // 이전글
  nextSeq : number;       // 다음글
  views : number;         // 조회수
}