import { Outlet } from "react-router-dom";

const PageUser = () => {
    return (
        <div className='login-wrapper'>
            <Outlet />
        </div>
    );
};

export default PageUser;  