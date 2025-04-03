import { Route, Routes } from "react-router-dom";

import PageUser from './pages/PageUser';
import PageMain from "./pages/PageMain";
import PageNotFound from "./pages/PageNotFound";
import Login from './components/Login';
import Join from './components/Join';
import FindId from "./components/FindId";
import FindPw from "./components/FindPw";

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
            </Route>
            <Route path="/recommend" element={<PageUser />} />
            <Route path="/chatting" element={<PageUser />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        </main>
    )
}

export default AppRoutes;