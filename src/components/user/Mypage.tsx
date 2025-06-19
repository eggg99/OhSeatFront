import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { getUser, updateUser, deleteUser } from "@/apis/api/user"
import { useNavigate } from 'react-router-dom';
import { userStore } from "@/store/userStore";

export default function Mypage(){
    const navigate = useNavigate(); // 이동을 위한 훅
    const { userId, clearUser } = userStore();

    const [formData, setFormData] = useState({
        userId:userId,          // 유저 아이디
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

    const [message, setMessage] = useState('');

    useEffect(() => {
        getData(); // 마운트 될 때 데이터 가져오기
    }, []);

    const getData = async () => {
        try {
            const response = await getUser(formData);
            setFormData(prev => ({
                ...prev,              // 기존 값 유지 (특히 password)
                ...response,          // 응답으로 덮어쓰기
                password: prev.password,   // password는 기존 값 유지
                password2: prev.password2, // 필요하면 이것도 유지
                validPassword: prev.validPassword,
            }));
        } catch (error) {
            console.error(error);
        }
    }

    // 수정 시 state 업데이트용 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        switch(name) {
            case "password" : 
                const isValid = passwordRegex.test(value);
                setFormData(prev => ({
                    ...prev,
                    validPassword: isValid,
                }));

                setErrorMessages(prev => ({
                    ...prev,
                    password: isValid ? "" : "",
                }));
            case "password2" : 
                setErrorMessages(prev => ({
                    ...prev,
                    password2: formData.password !== value ? "비밀번호와 비밀번호확인이 같지 않아요" : "",
                }));
        }
    };

    // 수정 버튼 클릭 시 호출되는 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData.password);
        if(!formData.validPassword && (formData.password || formData.password2)){
            alert("비밀번호를 확인해주세요");
            return false;
        }
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
                    <div className="text-red-500">{errorMessages.password && <div className="error-msg">{errorMessages.password}</div>}</div>
                </div>
                <div className='input-group'>
                    <Input type="password" placeholder="비밀번호 확인" id="password2" name="password2" onChange={handleChange}/>
                    <div className="text-red-500">{errorMessages.password2 && <div className="error-msg">{errorMessages.password2}</div>}</div>
                </div>
                <div className='input-group'>
                    <Input type="text" placeholder="핸드폰번호" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                </div>
                <button className="btn btn-primary w-full text-sm" type="submit">수정하기</button>
            </form>
            <div>
                <button className="btn btn-secondary text-sm " onClick={handleDelete}>탈퇴하기</button>
            </div>
        </div>
    )
}
