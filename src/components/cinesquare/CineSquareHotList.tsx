import {useEffect, useState, useRef} from "react";
import {getCineSquareHotList} from "@/apis/api/cinesquare";
import { useNavigate } from "react-router-dom";
import HotCard from "./HotCard";
import {CineSquareData} from "../../types/CineSquare";

export default function CineSquareHotList(){
    const navigate = useNavigate();
    const [cineSquareHotList, setCineSquareHotList] = useState<CineSquareData[]>([]);
    const list = () => navigate(`/cinesquare/list?category=0`);

    useEffect(() => {
        getHotList();
    }, []);

    const getHotList = async () => {
        try {
            const response = await getCineSquareHotList();

            if (response && response.length > 0) {
                setCineSquareHotList(response);
            }
        } catch (error) {
            console.error('게시글 조회 실패' , error);
        }
    }

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
                                key={`hotcard-${idx}`}
                                title={item.title}
                                location={`${item.city} ${item.district}`}
                                file={item.representativeFile ?? null}
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