import { Suspense } from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/home'
import About from './pages/about'
import Login from './pages/login/login'
import Help from './pages/help/help'
import AdminCategories from './pages/admin/categories';
import AdminProducts from './pages/admin/products';
import AdminWrapper from './components/AdminWrapper';
import ProductsList from './components/ProductsList'

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
            <Route
                path="help"
                element={
                    <Suspense fallback={<></>}>
                        <Help />
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
                <Route
                    path='products'
                    element={
                        <Suspense fallback={<></>}>
                            <AdminProducts />
                        </Suspense>
                    }
                />
            </Route>
            <Route
                path="/:category/:subcategory"
                element={
                    <Suspense fallback={<></>}>
                        <ProductsList />
                    </Suspense>
                }
            />
        </Route>
    )
);
