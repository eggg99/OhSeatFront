import { Input } from "@/components/ui/input"
import { ArrowBigLeft } from "lucide-react"
import { Link } from "react-router-dom";
import { use, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { registerUser } from "@/apis/api/user";

export default function Join(){
    const navigate = useNavigate(); // 이동을 위한 훅

    const [inputValue, setInputValue] = useState({
        name: '',               // 이름
        email: '',              // 이메일
        nickname: '',           // 닉네임
        password: '',           // 비밀번호
        password2: '',          // 비밀번호 확인
        phoneNumber: '',        // 핸드폰번호

        validPassword : false,  // 비밀번호 정규식 충족 여부
    });

    const [errorMessages, setErrorMessages] = useState({
        password: "",
        password2: "",
    });


    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{8,16}$/;

    // 입력 필드 변경 시, 상태 반영을 위한 핸들러
    // e: React.ChangeEvent<HTMLInputElement> : 이벤트 객체의 HTMLInputElement 타입 명시
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;       // 이벤트가 발생한 <input>요소의 name, value를 꺼내기
        setInputValue({                         
            ...inputValue,                      // 기존 값을 그대로 복사하여 바꾸려는 필드만 덮어씌우도록함
            [name] : value,                     // 해당 name에 새로운 value를 할당함
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
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!inputValue.validPassword){
            alert("비밀번호를 확인해주세요");
            return false;
        }
        const response = await registerUser(inputValue);
        if(!response){
            // 회원가입이 실패한 경우 : 아무 동작 안함
            return;
        } else {
            alert('회원가입이 완료되었습니다!');
            navigate('/user/login');
        }
    };

    return(
        <form 
            onSubmit={handleSubmit}
            className='login-form join shadow rounded-xl border bg-card'
        >
            <Link to="/user/login">
                <ArrowBigLeft className="absolute top-1 left-1 w-8 h-8" />
            </Link>
            <h1 className='title'>회원가입</h1>

            <div className='input-group'>
                <Input type="text" 
                    placeholder="이름" 
                    name="name" 
                    value={inputValue.name} 
                    onChange={handleInput} 
                    required 
                    maxLength={30}
                />
            </div>
            <div className='input-group'>
                <div className="flex w-full items-center space-x-2">
                    <Input type="email" placeholder="이메일" name="email" value={inputValue.email} onChange={handleInput} required maxLength={240}/>
                </div>
            </div>
            <div className='input-group'>
                <div className="flex w-full items-center space-x-2">
                    <Input type="text" placeholder="닉네임" name="nickname" value={inputValue.nickname} onChange={handleInput} required maxLength={80}/>
                </div>
            </div>
            <div className='input-group'>
                <Input type="password" 
                    placeholder="비밀번호" 
                    name="password" 
                    value={inputValue.password} 
                    onChange={handleInput}
                    required
                />
                <div className="text-red-500">{errorMessages.password && <div className="error-msg">{errorMessages.password}</div>}</div>
            </div>
            <div className='input-group'>
                <Input type="password" placeholder="비밀번호 확인" name="password2" value={inputValue.password2} onChange={handleInput} required/>
                <div className="text-red-500">{errorMessages.password2 && <div className="error-msg">{errorMessages.password2}</div>}</div>
                
            </div>
            <div className='input-group'>
                <Input type="text" placeholder="휴대폰번호(- 제외)" name="phoneNumber" value={inputValue.phoneNumber} onChange={handleInput} required maxLength={12}/>
            </div>
            <button 
                className="btn btn-primary w-full text-sm" 
                type="submit"
            >
                    회원가입
            </button>
        </form>
    )
}


