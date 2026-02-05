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

export interface NoticeListType {
  noticeList: NoticeData[];
}