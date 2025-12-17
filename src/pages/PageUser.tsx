import { Outlet } from "react-router-dom";
import '@/styles/css/user.scss'

const PageUser = () => {
    return (
        <div className="os_sub_contents">
            <Outlet />
        </div>
    );
};

export default PageUser;  