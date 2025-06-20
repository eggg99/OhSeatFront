import { useState } from "react";
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom';

export default function ChangePw(){
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
            originPwd: '',          // 기존 비밀번호
            password: '',           // 새로운 비밀번호
            password2: '',          // 새로운 비밀번호 확인
    
            validPassword : false,  // 비밀번호 정규식 충족 여부
    });

    const [errorMessages, setErrorMessages] = useState({
        password: "",
        password2: "",
    });

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{8,16}$/;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;       
        setInputValue({                         
            ...inputValue,                      
            [name] : value,                     
        });

        switch(name) {
            case "password" : 
                const isValid = passwordRegex.test(value);
                setInputValue(prev => ({
                    ...prev,
                    validPassword: isValid,
                }));

                setErrorMessages(prev => ({
                    ...prev,
                    password: isValid ? "" : "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요",
                }));
            case "password2" : 
                setErrorMessages(prev => ({
                    ...prev,
                    password2: inputValue.password !== value ? "비밀번호와 비밀번호확인이 같지 않아요" : "",
                }));
        }
    };

    const handleSubmit = () => {
        try {
            alert('비밀번호 변경이 완료되었습니다.');
            navigate('/user/mypage');
        } catch (error) {
            alert('회원가입 실패! 다시 시도해주세요.');
            console.error(error);
        }
    };

    return(
        <form
            onSubmit={handleSubmit}
            className="login-form join shadow rounded-xl border bg-card"
        >
            <h1 className='title'>비밀번호 변경</h1>

            <div className='input-group'>
                <Input type="password" 
                    placeholder="기존 비밀번호" 
                    name="originPwd" 
                    value={inputValue.originPwd} 
                    onChange={handleInput}
                    required
                />
            </div>

            <div className='input-group'>
                <Input type="password" 
                    placeholder="새로운 비밀번호" 
                    name="password" 
                    value={inputValue.password} 
                    onChange={handleInput}
                    required
                />
                <div className="text-red-500">{errorMessages.password && <div className="error-msg">{errorMessages.password}</div>}</div>
            </div>
            <div className='input-group'>
                <Input type="password" 
                    placeholder="새로운 비밀번호 확인" 
                    name="password2" 
                    value={inputValue.password2} 
                    onChange={handleInput}
                    required
                />
                <div className="text-red-500">{errorMessages.password2 && <div className="error-msg">{errorMessages.password2}</div>}</div>
            </div>
            <button 
                className="btn btn-primary w-full text-sm" 
                type="submit"
            >
                    비밀번호 변경
            </button>
        </form>
    )
}
