import { Input } from "@/components/ui/input"
import { ArrowBigLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { findPw } from "@/apis/api/user";
import { userStore } from "@/store/userStore";
import ReCAPTCHA from 'react-google-recaptcha';

export default function FindPw(){
    const navigate = useNavigate(); // 이동을 위한 훅
    const { setUser } = userStore();
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };

    const [inputValue, setInputValue] = useState({
            name: '',               // 이름
            phoneNumber: '',        // 핸드폰번호
            email: '',              // 이메일
    });

    // 입력 필드 변경 시, 상태 반영을 위한 핸들러
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const value = e.target.value.replace(/ /g,"") // 공백 제거된 값

        setInputValue({                         
            ...inputValue,                      // 기존 값을 그대로 복사하여 바꾸려는 필드만 덮어씌우도록함
            [name] : value,                     // 해당 name에 새로운 value를 할당함
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaToken) {
            alert('캡차 인증을 완료해주세요.');
            return;
        }
        // captchaToken을 함께 전달
        const response = await findPw({ ...inputValue, captchaToken });
        
        if(!response){
            return;
        } else {
            alert(response.message);
            
            setUser({'token':response.changePwToken})
            navigate('/user/change-password');
        }
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className='login-form shadow rounded-xl border bg-card'
        >
            <Link to="/user/login">
                <ArrowBigLeft className="absolute top-1 left-1 w-8 h-8" />
            </Link>
            <h1 className='title'>비밀번호 찾기</h1>

            <div className='input-group'>
                <Input type="text" placeholder="이름" name="name" value={inputValue.name} onChange={handleInput} required maxLength={30}/>
            </div>
            <div className='input-group'>
                <Input type="text" placeholder="휴대폰번호(- 제외)" name="phoneNumber" value={inputValue.phoneNumber} onChange={handleInput} required maxLength={12}/>
            </div>
            <div className='input-group'>
                <Input type="email" placeholder="이메일" name="email" value={inputValue.email} onChange={handleInput} required/>
            </div>
            <ReCAPTCHA
                sitekey={import.meta.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY || ""}
                onChange={handleCaptchaChange}
            />
            <button className="btn btn-primary w-full text-sm" type="submit">비밀번호 찾기</button>
        </form>
    )
}