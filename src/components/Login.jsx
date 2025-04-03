import { Link } from "react-router-dom";

export default function Login(){
    return(
        <form className='login-form'>
            <h1 className='title'>로그인</h1>
            <div className='input-group'>
                <label htmlFor="id">아이디</label>
                <input type="text" id="id" name="id" required />
            </div>
            <div className='input-group'>
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="btn btn-primary">로그인</button>
            <div className='link-group'>
                <Link to="/user/join">회원가입 / </Link>
                <Link to="/user/find/id">아이디찾기 / </Link>
                <Link to="/user/find/pw">비밀번호찾기</Link>
            </div>
            <button type="submit" className="btn btn-secondary">네이버 간편 로그인</button>
        </form>
    )
}
