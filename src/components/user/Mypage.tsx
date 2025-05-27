import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowBigLeft } from "lucide-react"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { mypage } from "@/apis/api/user"

export default function Mypage(){
    const [formData] = useState({
        userId: '1',
    });

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        nickname: '',
        phoneNumber: '',
    });

    useEffect(() => {
        getData(); // 마운트 될 때 데이터 가져오기
    }, []);

    const getData = async () => {
        try {
            const response = await mypage(formData);
            console.log('getData' , response);
            setUserInfo(response); // 받아온 데이터 저장
        } catch (error) {
            console.error(error);
        }
    }

    // 닉네임, 폰번호 수정 시 state 업데이트용 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return(
        <form className='login-form join shadow rounded-xl border bg-card'>
            <Link to="/"><ArrowBigLeft className="absolute top-1 left-1 w-8 h-8" /></Link>
            <h1 className='title'>마이페이지</h1>
            <div className='input-group'>
                <Input type="text" placeholder="이름" value={userInfo.name} disabled/>
            </div>
            <div className='input-group'>
                <Input type="email" placeholder="이메일" value={userInfo.email} disabled />
            </div>
            <div className='input-group'>
                <div className="flex w-full items-center space-x-2">
                    <Input type="email" placeholder="닉네임" name="nickname" value={userInfo.nickname} onChange={handleChange}/>
                    <Button type="submit">중복</Button>
                </div>
            </div>
            <div className='input-group'>
                <Input type="password" placeholder="비밀번호" id="password" name="password"/>
            </div>
            <div className='input-group'>
                <Input type="password" placeholder="비밀번호 확인" id="password2" name="password2"/>
            </div>
            <div className='input-group'>
                <Input type="text" placeholder="핸드폰번호" name="phoneNumber" value={userInfo.phoneNumber} onChange={handleChange}/>
            </div>
            <button className="btn btn-primary w-full text-sm">수정하기</button>
            <div className='link-group space-x-1 self-end'>
                <Link to="/">
                    <Button variant="link" className="p-0">탈퇴하기</Button>
                </Link>
            </div>
        </form>
    )
}
