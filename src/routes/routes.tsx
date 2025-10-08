import { Route, Routes } from "react-router-dom";

// 공통 페이지
import PageMain from "@/pages/PageMain";
import PageNotFound from "@/pages/PageNotFound";

// 유저 관련
import PageUser from '@/pages/PageUser';
import Login from '@/components/user/Login';
import Join from '@/components/user/Join';
import FindEmail from "@/components/user/FindEmail";
import FindPw from "@/components/user/FindPw";
import FindResult from "@/components/user/FindResult";
import ChangePw from "@/components/user/ChangePw";
import Mypage from "@/components/user/Mypage";

// 추천(Recommend) 관련
import PageRecommend from "@/pages/PageRecommend";
import BrowseIndex from "@/components/recommend/browse/BrowseIndex";
import BrandIndex from "@/components/recommend/brand/BrandIndex";
import PostDetail from "@/components/recommend/post/PostDetail";
import PostReg from "@/components/recommend/post/PostReg";
import PostUpdate from "@/components/recommend/post/PostUpdate";

// 시네스퀘어 관련
import PageCineSquare from "@/pages/PageCineSquare";
import CineSqaureList from "../components/cinesquare/CineSquareList";
import CineSquareDetail from "../components/cinesquare/CineSquareDetail";
import CineSquareEdit from "../components/cinesquare/CineSqaureEdit";
import CineSquareReg from "../components/cinesquare/CineSqaureReg";


function AppRoutes(){
    return(
        <main className="App_main">
        <Routes >
            {/* 메인 */}
            <Route path="/" element={<PageMain />} />
            
            {/* 유저관련 */}
            <Route path="/user" element={<PageUser />}>
                <Route path="join" element={<Join />} />
                <Route path="find-email" element={<FindEmail />} />
                <Route path="find-password" element={<FindPw />} />
                <Route path="find-result" element={<FindResult />} />
                <Route path="login" element={<Login />} />
                <Route path="mypage" element={<Mypage />} />
                <Route path="change-password" element={<ChangePw />} />
            </Route>

            {/* 좌석추천 */}
            <Route path="/recommend" element={<PageRecommend />}>
                <Route path="browse" element={<BrowseIndex />} />
                <Route path=":brand" element={<BrandIndex />} />                    {/* 리스트 */}
                <Route path=":brand/:postId" element={<PostDetail />} />            {/* 상세 */}
                <Route path=":brand/reg" element={<PostReg />} />                   {/* 등록 */}
                <Route path=":brand/edit/:postId" element={<PostUpdate />} />       {/* 수정 */}
            </Route>

            {/* 씨네광장 */}
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