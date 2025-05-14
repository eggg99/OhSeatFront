import { Route, Routes } from "react-router-dom";

import PageUser from './pages/PageUser';
import PageMain from "./pages/PageMain";
import PageNotFound from "./pages/PageNotFound";
import Login from './components/user/Login';
import Join from './components/user/Join';
import FindId from "./components/user/FindId";
import FindPw from "./components/user/FindPw";
import Mypage from "./components/user/Mypage";
import PageRecommend from "./pages/PageRecommend";
import PageRecommendDetail from "./pages/PageRecommendDetail";

function AppRoutes(){
    return(
        <main className="App_main">
        <Routes >
            <Route path="/" element={<PageMain />} />
            <Route path="/user" element={<PageUser />}>
                <Route path="join" element={<Join />} />
                <Route path="find/id" element={<FindId />} />
                <Route path="find/pw" element={<FindPw />} />
                <Route path="login" element={<Login />} />
                <Route path="mypage" element={<Mypage />} />
            </Route>
            <Route path="/recommend" element={<PageRecommend />} />
            <Route path="/recommend/:id" element={<PageRecommendDetail />} />
            <Route path="/chatting" element={<PageUser />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        </main>
    )
}

export default AppRoutes;