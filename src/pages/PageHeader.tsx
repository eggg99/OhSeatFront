import React from 'react';
import Logo from '../components/common/Logo';
import { Link } from "react-router-dom";

const Header = () => {
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
                <div className="login_btn_wrap">
                    <Link to="/user/join"   className="btn btn-primary btn-jelly white">회원가입</Link>
                    <Link to="/user/login"  className="btn btn-secondary btn-jelly white">로그인</Link>
                    <Link to="/user/mypage"  className="btn btn-secondary btn-jelly white">마이페이지(temp)</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;