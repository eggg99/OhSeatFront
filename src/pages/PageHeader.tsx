import Logo from '../components/common/Logo';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [userNick, setUserNick] = useState<string | null>(null);

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
        setUserNick(localStorage.getItem('userNick'));
    }, []);

    const logout = () => {
        localStorage.clear();
        setUserId(null);
        setUserNick(null);
    }

    return (
        <header className="App_header">
            <div className="inner">
                <Logo />
                <nav className="menu_wrap">
                    <ul>
                        <li><Link to="/recommend">좌석추천</Link></li>
                        <li><Link to="/chatting">채팅</Link></li>
                    </ul>
                </nav>
                {userId ? (
                    <>
                    <span>{userNick}님 환영합니다 🎉</span>
                    <Link to="/user/mypage"  className="btn btn-secondary btn-jelly white">마이페이지</Link>
                    <button className="btn btn-primary btn-jelly white" onClick={logout}>로그아웃</button>
                    </>
                ) : (
                    <>
                    <Link to="/user/join"   className="btn btn-primary btn-jelly white">회원가입</Link>
                    <Link to="/user/login"  className="btn btn-secondary btn-jelly white">로그인</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;