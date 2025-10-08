import { Input } from "@/components/ui/input"
import { ArrowBigLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"

export default function FindResult() {

    return (
        <div 
            className='login-form shadow rounded-xl border bg-card'
        >
            <h1 className='title'>이메일 찾기</h1>
            
            <div className='input-group'>
                <div className="text-center">이메일 찾기가 완료되었습니다.</div>
                <div className="flex gap-1 gap-x-8 justify-center">
                    <div>이메일</div>
                    <div>a@naver.com</div>
                </div>
            </div>

            <Link to="/user/login">
                <button className="btn btn-primary w-full text-sm">로그인 화면으로 이동하기</button>
            </Link>
            <Link to="/user/find-password">
                <button className="btn btn-primary w-full text-sm">비밀번호 찾기</button>
            </Link>
        </div>
    )
}