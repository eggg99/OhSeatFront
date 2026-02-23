export interface  NoticeData {
  noticeId : number
  targetBoard : string
  title : string
  authorId : number
  authorNickName : string
  createdAt : string
  views : number
  isPinned : number
  isActive: number
}

export interface NoticePage {
  content: NoticeData[];
  totalPages: number;
  totalElements: number;
  number: number; // 현재 페이지 (1부터 시작)
  size: number;
  first: boolean;
  last: boolean;
}

export interface  NoticeDetailData {
  noticeId : number
  targetBoard : string
  title : string
  content : string,
  authorId : number
  authorNickName : string
  createdAt : string
  createdAtDate?: string; // 날짜
  createdAtTime?: string; // 시간
  views : number
}
