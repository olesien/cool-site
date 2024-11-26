import { Suspense } from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import Layout from './components/layout';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login/login';
import AdminCategories from './pages/admin/categories';
import AdminWrapper from './components/adminwrapper';

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
                path='/about'
                element={
                    <Suspense fallback={<></>}>
                        <About />
                    </Suspense>
                }
            />
            <Route
                path='/login'
                element={
                    <Suspense fallback={<></>}>
                        <Login />
                    </Suspense>
                }
            />
            <Route path="/admin" element={<AdminWrapper />}>
                <Route
                    path='categories'
                    element={
                        <Suspense fallback={<></>}>
                            <AdminCategories />
                        </Suspense>
                    }
                />
            </Route>
        </Route>
    )
);
