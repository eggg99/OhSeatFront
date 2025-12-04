import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HotCard from "./HotCard";

export default function CineSquareHotList(){
    const navigate = useNavigate();
    const list = () => navigate(`/cinesquare/list?category=0`);
    const cineSquareHotList = [
        { postId: 1, title: "씨네광장 인기글 제목 예시 썸네일의 고양이 귀엽다 호로롥", location: "경기도 수원시", thumbnail: "/img/cat.jpg" },
        { postId: 2, title: "씨네광장 인기글 제목 예시 텍스트 입니다.", location: "경기도 화성시" },
        { postId: 3, title: "씨네광장 인기글 제목 예시 텍스트 입니다.", location: "서울특별시" },
    ]

    return (
    <div className="os_sub_contents">
        <div className="os_freetalk_wrap clear">
            <div className="os_freetalk_subtitle">
                <button onClick={list} className="go_before_button">목록으로 돌아가기</button>

                <h3>인기글</h3>
            </div>

            <div className="os_freetalk_hot2">
                <ul className="os_freetalk_hot_list">
                    {cineSquareHotList.length > 0 ? (
                        cineSquareHotList.map((item, idx) => (
                            <HotCard
                                key={idx}
                                title={item.title}
                                location={item.location}
                                thumbnail={item.thumbnail}
                                onClick={() => navigate(`/cinesquare/${item.postId}`)}
                            />
                        ))
                    ) : (
                        <li>인기글이 없습니다</li>
                    )}
                </ul>
            </div>
        </div>
    </div>
    )
}