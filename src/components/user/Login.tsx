import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login } from "@/apis/api/user";
export default function Login(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login(formData);
            // ✅ 성공 후 이동
            alert('회원가입이 완료되었습니다!');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <form 
            onSubmit={handleSubmit} 
            className='login-form shadow rounded-xl border bg-card'
        >
            <h1 className='title'>로그인</h1>

            <div className='input-group'>
                <Input type="email" placeholder="이메일" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className='input-group'>
                <Input type="password" placeholder="비밀번호" name="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <button className="btn btn-primary w-full text-sm" type="submit">로그인</button>
            <div className='link-group space-x-1'>
                <Link to="/user/join">
                    <Button variant="link" className="p-0">회원가입</Button>
                </Link>
                <span>/</span>
                <Link to="/user/find/id">
                    <Button variant="link" className="p-0">아이디찾기</Button> 
                </Link>
                <span>/</span>
                <Link to="/user/find/pw">
                    <Button variant="link" className="p-0">비밀번호찾기</Button>
                </Link>
            </div>
            <Button className="w-full">네이버 간편 로그인</Button>
        </form>
    )
}