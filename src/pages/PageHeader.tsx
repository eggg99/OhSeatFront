import { userStore }            from '@/store/userStore';
import { Link, useNavigate }    from "react-router-dom";
import Logo                     from '@/components/common/Logo';

const Header = () => {
    const navigate = useNavigate();
    const { userId, userNick, clearUser } = userStore();

    const logout = () => {
        alert('로그아웃 되었습니다');
        clearUser();
        navigate('/');
    }

    return (
        <header className="App_header">
            <div className="inner">
                <Logo />
                <nav className="menu_wrap">
                    <ul>
                        <li className="menu_item">
                        <Link to="/recm/browse">영화관 좌석 추천</Link>
                            <ul className="submenu">
                                <li><Link to="/recm/browse">둘러보기(pick!)</Link></li>
                                <li><Link to="/recm/cgv">CGV</Link></li>
                                <li><Link to="/recm/megabox">메가박스</Link></li>
                                <li><Link to="/recm/lotte">롯데시네마</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/chatting">채팅</Link></li>
                        <li><Link to="/cinesquare/list">씨네광장</Link></li>
                        <li><Link to="/chatting">이벤트</Link></li>
                    </ul>
                </nav>
                
                {userId ? (
                    <>
                    <span>{userNick}</span>
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