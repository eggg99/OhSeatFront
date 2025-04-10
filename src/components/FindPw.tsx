import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
export default function FindPw(){
    return (
        <form className='login-form'>
            <h1 className='title'>비밀번호 찾기</h1>
            <div className='input-group'>
                <Input type="text" placeholder="이름" id="name" name="name" required/>
            </div>
            <div className='input-group'>
                <Input type="text" placeholder="핸드폰번호" id="phone" name="phone" required/>
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
            <button type="submit" className="btn btn-primary">비밀번호 찾기</button>
        </form>
    )
}