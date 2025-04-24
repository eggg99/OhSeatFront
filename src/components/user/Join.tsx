import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp"
import { ArrowBigLeft } from "lucide-react"
import { Link } from "react-router-dom";

export default function Join(){
    return(
        <form className='login-form join shadow rounded-xl border bg-card'>
            <Link to="/user/login"><ArrowBigLeft className="absolute top-1 left-1 w-8 h-8" /></Link>
            <h1 className='title'>회원가입</h1>
            <div className='input-group'>
                <Input type="text" placeholder="이름" id="name" name="name" required/>
            </div>
            <div className='input-group'>
                <div className="flex w-full items-center space-x-2">
                    <Input type="email" placeholder="이메일" />
                    <Button type="submit">전송</Button>
                </div>
            </div>
            <div className='input-group'>
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
            </div>
            <div className='input-group'>
                <div className="flex w-full items-center space-x-2">
                    <Input type="email" placeholder="닉네임" />
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
                <Input type="text" placeholder="핸드폰번호" id="phone" name="phone" required/>
            </div>
            <div className="input-group">
                <Label className="text-slate-300" htmlFor="phone">프로필사진</Label>
                <Input type="file" id="profile" name="profile" accept="image/*" />
            </div>
            <button className="btn btn-primary w-full text-sm">회원가입</button>
        </form>
    )
}
