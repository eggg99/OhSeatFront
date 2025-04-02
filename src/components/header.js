import { Link } from "react-router-dom";
function Header(){
    return (
        <header className="App_header">
            <div className="inner">
                <h1 className="logo"><a href="/">OhSeat</a></h1>
                <nav className="menu_wrap">
                    <ul>
                        <li><Link to="/">좌석추천</Link></li>
                        <li><Link to="/">채팅</Link></li>
                    </ul>
                </nav>
                <div className="login_btn_wrap">
                    <Link to="/join" className="btn btn-primary btn-jelly white">회원가입</Link>
                    <Link to="/login" className="btn btn-secondary btn-jelly white">로그인</Link>
                </div>
            </div>
        </header>
    )
}

export default Header;