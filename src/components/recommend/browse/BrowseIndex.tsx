export default function BrowseIndex() {
    return (
        <div>
            <section className="flex flex-col">
                <div>최근 언급 많이 되는 영화관(최근 일주일 기준)</div>

                <div className="flex flex-row">
                    <div className="border">브랜드명</div>
                    <div className="border">영화관 지점명</div>
                    <div className="border">영화관 주소</div>
                    <div className="border">게시글 수</div>
                    <div className="border">좋아요 수(관련게시글통합)</div>
                </div>
            </section>

            <section>
                <div>하위 메뉴 연결 버튼들</div>
            </section>
        </div>
    )
}