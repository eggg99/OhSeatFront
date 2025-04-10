import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Login(){
    return(
        <form className='login-form shadow rounded-xl border bg-card'>
            <h1 className='title'>로그인</h1>
            <div className='input-group'>
                <Input type="text" placeholder="아이디" required/>
            </div>
            <div className='input-group'>
                <Input type="password" placeholder="비밀번호" required/>
            </div>
            <button className="btn btn-primary w-full text-sm">로그인</button>
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