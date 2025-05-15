export default function RecommendDetail(){
    return (
        <form className="detail-form shadow rounded-xl border bg-card flex flex-row">
            <div className="flex flex-row w-full justify-evenly">
                <div>제목</div>
                <div className="flex flex-row">
                    <div>조회수</div>
                    <div>댓글</div>
                </div>
            </div>
            <div>
                프로필사진 | 닉네임
            </div>
            <div>
                내용내용
            </div>
            <div>
                목록 | 삭제 | 수정
            </div>
            <div>
                댓글
            </div>
            <div>
                프로필사진 | 닉네임 | 댓글댓글
            </div>
            <div>
                댓글내용내용
            </div>
        </form>
    )
}