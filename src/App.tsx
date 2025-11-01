import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./pages/PageHeader.js";
import Footer from "./pages/PageFooter.js";
import AppRoutes from "@/routes/routes.js";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()       // react query

function App() {
    return (
        <div className="wrap">
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <BrowserRouter>
                    <Header />
                    <AppRoutes />
                    <Footer />
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
}

export default App;
