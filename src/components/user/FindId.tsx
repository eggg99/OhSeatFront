import { Input } from "@/components/ui/input"
import { ArrowBigLeft } from "lucide-react"
import { Link } from "react-router-dom";

export default function FindId() {
    return (
        <form className='login-form shadow rounded-xl border bg-card'>
            <Link to="/user/login"><ArrowBigLeft className="absolute top-1 left-1 w-8 h-8" /></Link>
            <h1 className='title'>아이디 찾기</h1>
            <div className='input-group'>
                <Input type="text" placeholder="이름" id="name" name="name" required/>
            </div>
            <div className='input-group'>
                <Input type="text" placeholder="핸드폰번호" id="phone" name="phone" required/>
            </div>
            <button type="submit" className="btn btn-primary">아이디 찾기</button>
        </form>
    )
}