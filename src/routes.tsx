import { Route, Routes } from "react-router-dom";

import PageUser from '@/pages/PageUser';
import PageMain from "@/pages/PageMain";
import PageNotFound from "@/pages/PageNotFound";
import Login from '@/components/user/Login';
import Join from '@/components/user/Join';
import FindEmail from "@/components/user/FindEmail";
import FindPw from "@/components/user/FindPw";
import FindResult from "@/components/user/FindResult";
import ChangePw from "@/components/user/ChangePw";
import Mypage from "@/components/user/Mypage";

import PageRecommend from "@/pages/PageRecommend";

import PageRecm from "@/pages/PageRecm";
import PageRecmDetail from "@/pages/PageRecmDetail";
import PostDetail from "@/components/post/PostDetail";
import PostReg from "@/components/post/PostReg";
import PostUpdate from "@/components/post/PostUpdate";

import PageCineSquare from "@/pages/PageCineSquare";
import CineSqaureList from "./components/cinesquare/CineSquareList";
import CineSquareDetail from "./components/cinesquare/CineSquareDetail";
import CineSquareEdit from "./components/cinesquare/CineSqaureEdit";
import CineSquareReg from "./components/cinesquare/CineSqaureReg";


function AppRoutes(){
    return(
        <main className="App_main">
        <Routes > 
            <Route path="/" element={<PageMain />} />
            <Route path="/user" element={<PageUser />}>
                <Route path="join" element={<Join />} />
                <Route path="find/email" element={<FindEmail />} />
                <Route path="find/pw" element={<FindPw />} />
                <Route path="find/result" element={<FindResult />} />
                <Route path="login" element={<Login />} />
                <Route path="mypage" element={<Mypage />} />
                <Route path="ChangePw" element={<ChangePw />} />
            </Route>

            <Route path="/recm/browse" element={<PageRecommend />} />
            <Route path="/recm/:brand" element={<PageRecm />}/>
            <Route path="/recm/:brand/dtl" element={<PageRecmDetail />}>
                <Route path=":postId" element={<PostDetail />} />
                <Route path="reg" element={<PostReg />} />
                <Route path="edit/:postId" element={<PostUpdate />} />
            </Route>
            <Route path="/cinesquare" element={<PageCineSquare/>}>
                <Route path="list" element={<CineSqaureList/>}/>
                <Route path=":postId" element={<CineSquareDetail/>}/>
                <Route path="reg" element={<CineSquareReg/>}/>
                <Route path="edit/:postId" element={<CineSquareEdit/>}/>
            </Route>

            <Route path="/chatting" element={<PageUser />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        </main>
        
    )
}

export default AppRoutes;