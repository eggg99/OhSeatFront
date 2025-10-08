import { useState } from "react";
import { Input } from "@/components/ui/input"
import { getCinemaList, getScreenList, putPost } from "@/apis/api/recommend";
import { userStore } from "@/store/userStore";

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

export default function PostReg(){
    const [selectedMultiplex, setSelectedMultiplex] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedCinema, setSelectedCinema] = useState("");
    const [selectedScreen, setSelectedScreen] = useState("");
    const [cinemas, setCinemas] = useState<{value: string, label: string}[]>([]);
    const [screens, setScreens] = useState<{value: string, label: string}[]>([]);
    const userId = userStore((state) => state.userId);
    const isLogin = userStore((state) => state.isLogin);
    const [inputValue, setInputValue] = useState({
        title:'',
        content:''
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    };

    // 멀티플렉스 변경
    const handleMultiplexChange = (value: string) => {
        setSelectedMultiplex(value);

        // 하위 초기화
        setSelectedArea("");
        setSelectedCinema("");
        setSelectedScreen("");
    };

    // 지역 변경
    const handleAreaChange = async (value: string) => {
        setSelectedArea(value);

        // 하위 초기화
        setSelectedCinema("");
        setSelectedScreen("");

        const response = await getCinemaList(selectedMultiplex, value);

        setCinemas(response.map((c:any) => ({
            value: c.cinemaId,
            label: c.cinemaName,
        })));
    };

    
    // 영화관 변경
    const handleCinemaChange = async (value: string) => {
        setSelectedCinema(value);

        // 하위 초기화
        setSelectedScreen("");
        const response = await getScreenList(selectedMultiplex, value);
        setScreens(response.map((c:any) => ({
            value: c.screenId,
            label: c.screenName,
        })));
    };

    // 상영관 변경
    const handleScreenChange = (value: string) => {
        setSelectedScreen(value);
    };

    const handleSubmit = async () => {
        if(!isLogin) {alert('로그인을 해주세요'); return;}
        else if(!inputValue.title){alert('제목을 입력해주세요'); return;}
        else if(!selectedMultiplex){alert('멀티플렉스를 선택해주세요'); return;}
        else if(!selectedArea){alert('지역을 선택해주세요'); return;}
        else if(!selectedCinema){alert('영화관을 선택해주세요'); return;}
        else if(!selectedScreen){alert('상영관을 선택해주세요'); return;}
        else if(!inputValue.content){alert('내용을 입력해주세요'); return;}
        const response = await putPost(
            userId,
            selectedMultiplex,
            selectedArea,
            selectedCinema,
            selectedScreen,
            inputValue.title,
            inputValue.content
        );
    }
    
    return(
        <div className="detail-form shadow rounded-xl border bg-card flex flex-col">
            <div className="flex gap-3">
                <span>제목</span>
                <Input 
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
                        <option value="" disabled hidden>멀티플렉스를 선택하세요</option>
                        {multiplexes.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>

                    <select value={selectedArea} onChange={(e) => handleAreaChange(e.target.value)} disabled={!selectedMultiplex}>
                        <option value="" disabled hidden>지역을 선택하세요</option>
                        {areas.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                    </select>

                    <select value={selectedCinema} onChange={(e) => handleCinemaChange(e.target.value)} disabled={!selectedArea}>
                        <option value="" disabled hidden>영화관을 선택하세요</option>
                        {cinemas.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>

                    <select value={selectedScreen} onChange={(e) => handleScreenChange(e.target.value)} disabled={!selectedCinema}>
                        <option value="" disabled hidden>상영관을 선택하세요</option>
                        {screens.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </div>
            </div>
            <div className="">
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
                <button onClick={() => handleSubmit()}>작성</button>
            </div>
        </div>
    )
}