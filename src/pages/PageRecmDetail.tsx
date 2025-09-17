import PostDetail from "@/components/post/PostDetail";
import '@/styles/recommend.scss';
import { Outlet, useParams } from "react-router-dom";

const multiplexMap: Record<string, number> = {
  cgv: 1,
  megabox: 2,
  lotte: 3,
};

export default function PageRecmDetail(){
    const { brand } = useParams<{ brand: string }>();
    return (
        <div className="detail-wrapper">
            <Outlet context={{ brand: brand as string }} />
            {/* {brand && <PostDetail brand={brand} />} */}
        </div>
        
    )
}