import type { MouseEvent }      from 'react';
import { useEffect, useState }  from 'react';
import { userStore }            from '@/store/userStore';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo                     from '@/components/common/Logo';

const Header = () => {
    const navigate = useNavigate(); // 이동을 위한 훅
    const location = useLocation();
    const { userId, userNick, clearUser } = userStore();
    const isAdmin = userStore((state) => state.isAdmin);
    const [openMenu, setOpenMenu] = useState<'recommend' | 'event' | null>(null);

    useEffect(() => {
        setOpenMenu(null);
    }, [location.pathname]);

    const toggleMenu = (menu: 'recommend' | 'event') => (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setOpenMenu((current) => current === menu ? null : menu);
    };

    const closeMenu = () => {
        setOpenMenu(null);
    };

    const logout = () => {
        alert('로그아웃 되었습니다');
        clearUser();
        navigate('/');
    }

    return (
        <header className="os_header">
            <div className="inner">
                <Logo />
                
                <ul className="os_gnb">
                    <li
                        className={`two_depth ${openMenu === 'recommend' ? 'on' : ''}`}
                        onMouseEnter={() => setOpenMenu('recommend')}
                        onMouseLeave={closeMenu}
                    >
                        <Link to="/recommend/browse" onClick={toggleMenu('recommend')}>영화관 좌석 추천</Link>
                        <ul className="os_gnb2">
                            <li><Link to="/recommend/browse" onClick={closeMenu}>둘러보기(pick!)</Link></li>
                            <li><Link to="/recommend/cgv" onClick={closeMenu}>CGV</Link></li>
                            <li><Link to="/recommend/megabox" onClick={closeMenu}>메가박스</Link></li>
                            <li><Link to="/recommend/lottecinema" onClick={closeMenu}>롯데시네마</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/cinesquare/list">씨네광장</Link></li>
                    <li
                        className={`two_depth ${openMenu === 'event' ? 'on' : ''}`}
                        onMouseEnter={() => setOpenMenu('event')}
                        onMouseLeave={closeMenu}
                    >
                        <Link to="/event/browse" onClick={toggleMenu('event')}>이벤트</Link>
                        <ul className="os_gnb2">
                            <li><Link to="/event/browse" onClick={closeMenu}>이벤트 둘러보기</Link></li>
                            <li><Link to="/event/announcement/browse" onClick={closeMenu}>이벤트 당첨발표</Link></li>
                        </ul>
                    </li>
                </ul>

                <div className="os_user_wrap">
                    <ul className='os_user_list clear'>
                        {userId ? (
                            <>
                            <li><span className="os_nickname">{isAdmin ? '관리자' : userNick}</span></li>
                            <li><Link to="/user/mypage"  className="os_mypage_button">마이페이지</Link></li>
                            <li><a href="#" className="os_logout_button" onClick={logout}>로그아웃</a></li>
                            </>
                        ) : (
                            <>
                            <li><Link to="/user/join"   className="os_join_button">회원가입</Link></li>
                            <li><Link to="/user/login"  className="os_login_button">로그인</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
