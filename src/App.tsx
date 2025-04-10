import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./pages/PageHeader.js";
import Footer from "./pages/PageFooter.js";
import AppRoutes from "./routes.jsx";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <AppRoutes />
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
