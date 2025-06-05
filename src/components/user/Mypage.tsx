import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowBigLeft } from "lucide-react"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { getUser, updateUser, deleteUser } from "@/apis/api/user"
import { useNavigate } from 'react-router-dom';

export default function Mypage(){
    const navigate = useNavigate(); // 이동을 위한 훅

    const [formData, setFormData] = useState({
        userId:localStorage.getItem('userId'),
        name: '',
        email: '',
        nickname: '',
        password: '',
        password2: '',
        phoneNumber: '',
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        getData(); // 마운트 될 때 데이터 가져오기
    }, []);

    const getData = async () => {
        try {
            const response = await getUser(formData);
            console.log('getData' , response);
            setFormData(response); // 받아온 데이터 저장
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

        if (formData.password !== formData.password2) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }
        
        try {
            const response = await updateUser(formData);
            console.log('updateUser', response);
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
                    <Input type="password" placeholder="비밀번호" id="password" name="password" onChange={handleChange}/>
                </div>
                <div className='input-group'>
                    <Input type="password" placeholder="비밀번호 확인" id="password2" name="password2" onChange={handleChange}/>
                </div>
                <div className='input-group'>
                    <Input type="text" placeholder="핸드폰번호" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                </div>
                {message && <p className="text-center mt-2 text-sm text-red-500">{message}</p>}
                <button className="btn btn-primary w-full text-sm" type="submit">수정하기</button>
            </form>
            <div>
                <button className="btn btn-secondary text-sm " onClick={handleDelete}>탈퇴하기</button>
            </div>
        </div>
    )
}
