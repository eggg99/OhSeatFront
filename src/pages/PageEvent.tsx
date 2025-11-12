import { Link, Outlet } from "react-router-dom";

export default function PageEvent () {
    return (
        <div className="os_sub_contents">
            <div>
                <h2>이벤트</h2>
            </div>
            {/* 브레드크럼 - 해야짐 */}
            <Outlet />
        </div>
    )
}