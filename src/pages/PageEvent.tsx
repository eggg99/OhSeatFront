import { Link, Outlet } from "react-router-dom";

export default function PageEvent () {
    return (
        <div className="os_sub_contents">
            <div>
                <h2>이벤트</h2>
            </div>
            <div className="flex">
                <caption>브레드크럼 영역</caption>
                <Link to="/">홈</Link>
                <Link to="/event">이벤트</Link>
                <Link to="/event/list">이벤트 둘러보기</Link>
            </div>
            <Outlet />
        </div>
    )
}