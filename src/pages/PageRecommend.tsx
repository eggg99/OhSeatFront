import { Outlet } from "react-router-dom";

export default function PageRecommend() {
  
  return (
    <div className="flex flex-col ">
        <div>
            <Outlet/>
        </div>
    </div>
  )
};