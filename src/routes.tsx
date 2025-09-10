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
import RecommendAll from "./components/recommend/RecommendAll";
import RecommendCgv from "./components/recommend/RecommendCgv";
import RecommendMegabox from "./components/recommend/RecommendMegabox";
import RecommendLottecinema from "./components/recommend/RecommendLottecinema";



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
                <Route path="all" element={<RecommendAll />}/>
                <Route path="cgv" element={<RecommendCgv />} />
                <Route path="megabox" element={<RecommendMegabox />} />
                <Route path="lottecinema" element={<RecommendLottecinema />} />
            </Route>
            <Route path="/recommend/:id" element={<PageRecommendDetail />} />
            <Route path="/chatting" element={<PageUser />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        </main>
    )
}

export default AppRoutes;