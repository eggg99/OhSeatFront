import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { getUser, updateUser, deleteUser } from "@/apis/api/user"
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from "@/store/userStore";
import { Button } from "../ui/button";

export default function Mypage(){
    const navigate = useNavigate(); // 이동을 위한 훅
    const { userId, clearUser } = userStore();

    const [formData, setFormData] = useState({
        userId:userId,          // 유저 아이디
        name: '',               // 이름
        email: '',              // 이메일
        nickname: '',           // 닉네임
        phoneNumber: '',        // 핸드폰번호
    });

    useEffect(() => {
        getData(); // 마운트 될 때 데이터 가져오기
    }, []);

    const getData = async () => {
        try {
            const response = await getUser(formData);
            setFormData(response);
        } catch (error) {
            console.error(error);
        }
    }

    // 수정 시 state 업데이트용 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 수정 버튼 클릭 시 호출되는 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await updateUser(formData);
            alert('회원정보 수정이 완료되었습니다');
        } catch (error) {
            console.error(error);
        }
    }

    // 회원 탈퇴 버튼 클릭 시 호출되는 핸들러
    const handleDelete = async() => {
        const confirmDelete = window.confirm("정말 탈퇴하시겠습니까?");
        if(!confirmDelete) return;

        try{
            await deleteUser(formData.userId);
            alert("탈퇴가 처리되었습니다.");
            clearUser();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="flex flex-col items-center">
            <form 
                onSubmit={handleSubmit}
                className='login-form join shadow rounded-xl border bg-card'
            >
                <h1 className='title'>마이페이지</h1>
                
                <div className='input-group'>
                    <Link to="/user/changePw" className="w-1/4 m-0 bg-black text-white text-center rounded-sm p-1 outline-2 outline-offset-4">비밀번호 수정</Link>
                </div>
                <div className='input-group'>
                    <Input type="text" placeholder="이름" value={formData.name} disabled/>
                </div>
                <div className='input-group'>
                    <Input type="email" placeholder="이메일" value={formData.email} disabled />
                </div>
                <div className='input-group'>
                    <div className="flex w-full items-center space-x-2">
                        <Input type="text" placeholder="닉네임" name="nickname" value={formData.nickname} onChange={handleChange}/>
                    </div>
                </div>
                <div className='input-group'>
                    <Input type="text" placeholder="핸드폰번호" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                </div>
                <button className="btn btn-primary w-full text-sm" type="submit">수정하기</button>
            </form>
            <div>
                <button className="btn text-sm " onClick={handleDelete}>탈퇴하기</button>
            </div>
        </div>
    )
}
