import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowBigLeft } from "lucide-react"
import { Link } from "react-router-dom";

export default function Join(){
    return(
        <form className='login-form join shadow rounded-xl border bg-card'>
            <Link to="/"><ArrowBigLeft className="absolute top-1 left-1 w-8 h-8" /></Link>
            <h1 className='title'>마이페이지</h1>
            <div className='input-group'>
                <Input type="text" placeholder="이름" id="name" name="name" disabled/>
            </div>
            <div className='input-group'>
                <Input type="email" placeholder="이메일" disabled />
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
            <button className="btn btn-primary w-full text-sm">수정하기</button>
            <div className='link-group space-x-1 self-end'>
                <Link to="/">
                    <Button variant="link" className="p-0">탈퇴하기</Button>
                </Link>
            </div>
        </form>
    )
}
