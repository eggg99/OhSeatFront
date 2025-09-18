import '@/styles/recommend.scss';
import { Outlet, useParams } from "react-router-dom";

export default function PageRecmDetail(){
    const { brand } = useParams<{ brand: string }>();
    return (
        <div className="detail-wrapper">
            <Outlet context={{ brand: brand as string }} />
        </div>
        
    )
}