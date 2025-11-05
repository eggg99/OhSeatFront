import { Outlet } from "react-router-dom";

const PageUser = () => {
    return (
        <div className="os_sub_contents">
            <Outlet />
        </div>
    );
};

export default PageUser;  