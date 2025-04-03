import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./pages/PageHeader";
import Footer from "./pages/PageFooter";
import AppRoutes from "./routes.js";


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
