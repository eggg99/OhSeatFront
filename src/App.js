import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes.js";
import { createTheme, ThemeProvider }from "@mui/material"

const theme = createTheme({
    typography:{
        fontFamily: "'Pretendard-Regular', 'CookieRun-Regular', 'esamanru-Medium','Ownglyph_ParkDaHyun', 'MonoplexKR-Regular', sans-serif"
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <AppRoutes />       
                    <Footer />
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
