import { Route, Routes } from "react-router-dom";

import PageUser from './pages/PageUser';
import PageMain from "./pages/PageMain";
import PageNotFound from "./pages/PageNotFound";
import Login from './components/user/Login';
import Join from './components/user/Join';
import FindEmail from "./components/user/FindEmail";
import FindPw from "./components/user/FindPw";
import FindResult from "./components/user/FindResult";
import ChangePw from "./components/user/ChangePw";
import Mypage from "./components/user/Mypage";

import PageRecommend from "./pages/PageRecommend";
import PageRecommendDetail from "./pages/PageRecommendDetail";
import RecommendBrowse from "./components/recommend/browse/RecommendBrowse";
import RecommendCgv from "./components/recommend/cgv/RecommendCgv";
import RecommendMegabox from "./components/recommend/megabox/RecommendMegabox";
import RecommendLotte from "./components/recommend/lotte/RecommendLotte";
import PostList from "./components/post/PostList";
import PostDetail from "./components/post/PostDetail";

import PageRecm from "@/pages/PageRecm";
import RecmCgv from "@/components/recommend/cgv/RecmCgv";


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

            <Route path="/recommend" element={<PageRecommend />}>
                <Route path="browse" element={<RecommendBrowse />}/>
                <Route path="cgv" element={<RecommendCgv />}>
                    <Route index element={<PostList />} />
                    <Route path=":postId" element={<PostDetail />} />
                </Route>
                <Route path="megabox" element={<RecommendMegabox />} />
                <Route path="lottecinema" element={<RecommendLotte />} />
            </Route>
            <Route path="/chatting" element={<PageUser />} />
            <Route path="*" element={<PageNotFound />} />



            <Route path="/recm/:brand" element={<PageRecm />}>
            </Route>
        </Routes>
        </main>
    )
}

export default AppRoutes;