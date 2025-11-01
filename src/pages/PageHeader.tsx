import { userStore }            from '@/store/userStore';
import { Link }                 from "react-router-dom";
import Logo                     from '@/components/common/Logo';

const Header = () => {
    const { userId, userNick, clearUser } = userStore();

    const logout = () => {
        alert('로그아웃 되었습니다');
        clearUser();
    }

    return (
        <header className="os_header">
            <div className="inner">
                <Logo />
                
                <ul className="os_gnb">
                    <li>
                        <Link to="/recommend/browse">영화관 좌석 추천</Link>
                        <ul className="os_gnb2">
                            <li><Link to="/recommend/browse">둘러보기(pick!)</Link></li>
                            <li><Link to="/recommend/cgv">CGV</Link></li>
                            <li><Link to="/recommend/megabox">메가박스</Link></li>
                            <li><Link to="/recommend/lottecinema">롯데시네마</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/chatting">채팅</Link></li>
                    <li><Link to="/cinesquare/list">씨네광장</Link></li>
                    <li>
                        <Link to="/chatting">이벤트</Link>
                        <ul className="os_gnb2">
                            <li><Link to="/">이벤트 둘러보기</Link></li>
                            <li><Link to="/">이벤트 당첨발표</Link></li>
                        </ul>
                    </li>
                </ul>
                
                {userId ? (
                    <>
                    <span className="os_nickname">{userNick}</span>
                    <Link to="/user/mypage"  className="os_login_button mypage">마이페이지</Link>
                    <button className="os_login_button logout" onClick={logout}>로그아웃</button>
                    </>
                ) : (
                    <>
                    <Link to="/user/join"   className="os_login_button mypage">회원가입</Link>
                    <Link to="/user/login"  className="os_login_button logout">로그인</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;