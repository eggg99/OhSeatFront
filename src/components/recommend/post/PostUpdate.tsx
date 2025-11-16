import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { userStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { getPostDetail, getCinemaList, getScreenList, updatePost } from "@/apis/api/recommend";

type brand = {
  brand: string;
};

const multiplexes = [
    {value: "1", label: "CGV"},
    {value: "2", label: "메가박스"},
    {value: "3", label: "롯데시네마"},
]
const areas = [
    { value: "11", label: "서울" },
    { value: "12", label: "경기" },
    { value: "13", label: "인천" },
    { value: "14", label: "강원" },
    { value: "15", label: "대전/충청" },
    { value: "16", label: "대구" },
    { value: "17", label: "부산/울산" },
    { value: "18", label: "경상" },
    { value: "19", label: "광주/전라/제주" },
]

export default function PostUpdate() {
    const navigate = useNavigate();
    const { userId } = userStore();
    const { brand } = useParams<{ brand: string }>();
    const { postId } = useParams<{ postId: string }>(); 
    const [selectedMultiplex, setSelectedMultiplex] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedCinema, setSelectedCinema] = useState("");
    const [selectedScreen, setSelectedScreen] = useState("");
    const [cinemas, setCinemas] = useState<{ value: string; label: string }[]>([]);
    const [screens, setScreens] = useState<{ value: string; label: string }[]>([]);
    const [inputValue, setInputValue] = useState({
        title: "",
        content: "",
    });

    // input 이벤트
    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({ ...prev, [name]: value }));
    };

    // 멀티플렉스 변경
    const handleMultiplexChange = (value: string) => {
        setSelectedMultiplex(value);
        setSelectedArea("");
        setSelectedCinema("");
        setSelectedScreen("");
    };

     // 지역 변경
    const handleAreaChange = async (value: string) => {
        setSelectedArea(value);
        setSelectedCinema("");
        setSelectedScreen("");

        const response = await getCinemaList(selectedMultiplex, value);
        setCinemas(
            response.map((c: any) => ({
                value: c.cinemaId,
                label: c.cinemaName,
            }))
        );
    };
     // 영화관 변경
    const handleCinemaChange = async (value: string) => {
        setSelectedCinema(value);
        setSelectedScreen("");

        const response = await getScreenList(selectedMultiplex, value);
        setScreens(
            response.map((c: any) => ({
                value: c.screenId,
                label: c.screenName,
            }))
        );
    };
    // 상영관 변경
    const handleScreenChange = (value: string) => {
        setSelectedScreen(value);
    };

    // 게시글 불러오기
    const getData = async () => {
        if (!postId) return;
        const response = await getPostDetail(postId);

        // response 안에 들어오는 데이터 구조 맞게 수정 필요!
        setInputValue({
            title: response.title,
            content: response.content,
        });
        setSelectedMultiplex(response.multiplexId);
        setSelectedArea(response.areaId);

        // 영화관 리스트 불러와서 선택값 셋팅
        const cinemaRes = await getCinemaList(response.multiplexId, response.areaId);
        setCinemas(cinemaRes.map((c: any) => ({ value: c.cinemaId, label: c.cinemaName })));
        setSelectedCinema(response.cinemaId);

        // 상영관 리스트 불러와서 선택값 셋팅
        const screenRes = await getScreenList(response.multiplexId, response.cinemaId);
        setScreens(screenRes.map((s: any) => ({ value: s.screenId, label: s.screenName })));
        setSelectedScreen(response.screenId);
    };

    useEffect(() => {
        if(postId) getData();
    }, [postId]);

    // 수정하기 버튼
    const handleUpdate = async () => {
        if (!inputValue.title) {
            alert("제목을 입력해주세요");
            return;
        }
        if (!inputValue.content) {
            alert("내용을 입력해주세요");
            return;
        }

        await updatePost(
            selectedMultiplex,
            selectedArea,
            selectedCinema,
            selectedScreen,
            inputValue.title,
            inputValue.content,
            postId // postId도 같이 넘겨줘야 할 수 있음
        );

        alert("게시글이 수정되었습니다.");
        navigate(`/recommend/${brand}/${postId}`); // 수정 후 상세 페이지로 이동
    };

    return (
        <div className="os_sub_contents">
            <div className="hot_theater_weekly">
                <div>
                    <input
                        type="text"
                        name="title"
                        value={inputValue.title}
                        onChange={handleInput}
                        placeholder="제목을 입력하세요"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <div>
                        <select value={selectedMultiplex} onChange={(e) => handleMultiplexChange(e.target.value)}>
                            <option value="" disabled hidden>
                                멀티플렉스를 선택하세요
                            </option>
                            {multiplexes.map((m) => (
                                <option key={m.value} value={m.value}>
                                    {m.label}
                                </option>
                            ))}
                        </select>

                        <select value={selectedArea} onChange={(e) => handleAreaChange(e.target.value)} disabled={!selectedMultiplex}>
                            <option value="" disabled hidden>
                                지역을 선택하세요
                            </option>
                            {areas.map((a) => (
                                <option key={a.value} value={a.value}>
                                    {a.label}
                                </option>
                            ))}
                        </select>

                        <select value={selectedCinema} onChange={(e) => handleCinemaChange(e.target.value)} disabled={!selectedArea}>
                            <option value="" disabled hidden>
                                영화관을 선택하세요
                            </option>
                            {cinemas.map((c) => (
                                <option key={c.value} value={c.value}>
                                    {c.label}
                                </option>
                            ))}
                        </select>

                        <select value={selectedScreen} onChange={(e) => handleScreenChange(e.target.value)} disabled={!selectedCinema}>
                            <option value="" disabled hidden>
                                상영관을 선택하세요
                            </option>
                            {screens.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <textarea
                        name="content"
                        placeholder="내용을 입력하세요"
                        value={inputValue.content}
                        onChange={handleInput}
                        cols={6}
                        rows={5}
                        className="w-full"
                        required
                    />
                </div>
                <div>
                    <button onClick={handleUpdate}>수정하기</button>
                </div>
            </div>
        </div>
    )
}