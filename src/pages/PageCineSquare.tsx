import { Outlet } from "react-router-dom";
import '@/styles/login.scss';


export default function PageCineSquare () {
    return (
        <div className="detail-wrapper">
            <Outlet />
        </div>
    );
};

