import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from 'react-toastify'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import App from "./App.tsx";

import './style/main.scss'
import 'react-toastify/dist/ReactToastify.css'
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
        <ToastContainer
            position="bottom-left"
            autoClose={2000}
        />
    </React.StrictMode>
);
