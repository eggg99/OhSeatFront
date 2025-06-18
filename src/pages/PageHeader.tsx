import { userStore } from '@/store/userStore';
import Logo from '../components/common/Logo';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    const { userId, userNick, clearUser } = userStore();

    const logout = () => {
        alert('로그아웃 되었습니다');
        clearUser();
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