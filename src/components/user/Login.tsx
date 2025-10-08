import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginUser } from "@/apis/api/user";
import { userStore } from "@/store/userStore";
export default function Login(){
    const navigate = useNavigate();
    const { setUser } = userStore();

    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const value = e.target.value.replace(/ /g,"")
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await loginUser(inputValue);
        if (!response) {
            // 로그인 실패한 경우: 아무 동작 안함
            return;
        } else {
            alert('로그인이 완료되었습니다!');
            setUser({
                'userId': response.userId, 
                'userNick': response.nickname, 
                'userEmail': response.email, 
                'token':response.token, 
                'isLogin':true
            })
            navigate('/');
        }
    }

    return(
        <form 
            onSubmit={handleSubmit} 
            className='login-form shadow rounded-xl border bg-card'
        >
            <h1 className='title'>로그인</h1>

            <div className='input-group'>
                <Input type="email" placeholder="이메일" name="email" value={inputValue.email} onChange={handleInput} required/>
            </div>
            <div className='input-group'>
                <Input type="password" placeholder="비밀번호" name="password" value={inputValue.password} onChange={handleInput} required/>
            </div>
            <button className="btn btn-primary w-full text-sm" type="submit">로그인</button>
            <div className='link-group space-x-1'>
                <Link to="/user/join">
                    <Button variant="link" className="p-0">회원가입</Button>
                </Link>
                <span>/</span>
                <Link to="/user/find-email">
                    <Button variant="link" className="p-0">아이디찾기</Button> 
                </Link>
                <span>/</span>
                <Link to="/user/find-password">
                    <Button variant="link" className="p-0">비밀번호찾기</Button>
                </Link>
            </div>
            <Button className="w-full">네이버 간편 로그인</Button>
        </form>
    )
}