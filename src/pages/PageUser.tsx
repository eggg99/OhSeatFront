import { Outlet } from "react-router-dom";
import '../styles/login.scss';


const PageUser = () => {
    return (
        <div className='login-wrapper'>
            <Outlet />
        </div>
    );
};

export default PageUser;  