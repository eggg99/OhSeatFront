import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp"
import { ArrowBigLeft } from "lucide-react"
import { Link } from "react-router-dom";
import { use, useState } from "react"
import { join } from "@/apis/api/user"
import { useNavigate } from 'react-router-dom';

export default function Join(){
    const navigate = useNavigate(); // ✅ 이동을 위한 훅

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        nickname: '',
        password: '',
        password2: '',
        phoneNumber: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.password2) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await join(formData);
            console.log(response);
            // ✅ 성공 후 이동
            alert('회원가입이 완료되었습니다!');
            navigate('/user/login');
        } catch (error) {
            setMessage('회원가입 실패! 다시 시도해주세요.');
            console.error(error);
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
                <Input type="text" placeholder="이름" name="name" value={formData.name} onChange={handleChange} required/>
            </div>
            <div className='input-group'>
                <div className="flex w-full items-center space-x-2">
                    <Input type="email" placeholder="이메일" name="email" value={formData.email} onChange={handleChange} required />
                    {/* <Button type="submit">전송</Button> */}
                </div>
            </div>
            {/* <div className='input-group'>
                <Label className="text-slate-300" htmlFor="email_otp">인증번호</Label>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div> */}
            <div className='input-group'>
                <div className="flex w-full items-center space-x-2">
                    <Input type="text" placeholder="닉네임" name="nickname" value={formData.nickname} onChange={handleChange} required/>
                    {/* <Button type="submit">중복</Button> */}
                </div>
            </div>
            <div className='input-group'>
                <Input type="password" placeholder="비밀번호" name="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <div className='input-group'>
                <Input type="password" placeholder="비밀번호 확인" name="password2" value={formData.password2} onChange={handleChange} required/>
            </div>
            <div className='input-group'>
                <Input type="text" placeholder="핸드폰번호" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required/>
            </div>
            {/* <div className="input-group">
                <Label className="text-slate-300" htmlFor="phone">프로필사진</Label>
                <Input type="file" id="profile" name="profile" accept="image/*" />
            </div> */}
            <button className="btn btn-primary w-full text-sm" type="submit">회원가입</button>
            {message && <p className="text-center mt-2 text-sm text-red-500">{message}</p>}
        </form>
    )
}


