import { lazy, Suspense } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';

// LAYOUT
const Layout = lazy(async () => await import('@/components/layout'));

// PAGE
const Home = lazy(async () => await import('@/pages/home/index'));

// LOGIN
const Login = lazy(async () => await import('@/pages/login/login'))

export const publicRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route
                index
                element={
                    <Suspense fallback={<></>}>
                        <Home />
                    </Suspense>
                }
            />
            <Route
                path="login"
                element={
                    <Suspense fallback={<></>}>
                        <Login />
                    </Suspense>
                }
            />
        </Route>
    )
);
