import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes;