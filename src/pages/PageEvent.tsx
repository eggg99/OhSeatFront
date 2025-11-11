import { Link, Outlet } from "react-router-dom";

export default function PageEvent () {
    return (
        <div className="os_sub_contents">
            <div>
                <h2>이벤트</h2>
            </div>
            {/* 브레드크럼 */}
            <div className="flex">
                <Link to="/">홈</Link>
                <Link to="/event/browse">이벤트</Link>
                <Link to="/event/browse">이벤트 둘러보기</Link>
            </div>
            {/* 브레드크럼 */}
            <Outlet />
        </div>
    )
}