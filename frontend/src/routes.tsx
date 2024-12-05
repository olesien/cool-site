import { Suspense } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login/login";
import Help from "./pages/help/help";
import AdminCategories from "./pages/admin/categories";
import AdminProducts from "./pages/admin/products";
import AdminWrap from "./components/AdminWrap";
import AdminContact from "./pages/admin/contactform";

import Categories from "./pages/products/categories";
import { SearchResult } from "./pages/search/searchResult";
import { GetUserWishlist } from "./components/UserWishlist";
import ProductView from "./pages/products/productView";
import Register from "./pages/register/register";

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
                path="/about"
                element={
                    <Suspense fallback={<></>}>
                        <About />
                    </Suspense>
                }
            />
            <Route
                path="/product/:productId"
                element={
                    <Suspense fallback={<></>}>
                        <ProductView />
                    </Suspense>
                }
            />
            <Route
                path="/login"
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
            <Route
                path="/register"
                element={
                    <Suspense fallback={<></>}>
                        <Register />
                    </Suspense>
                }
            />
            <Route path="/admin" element={<AdminWrap />}>
                <Route
                    path="categories"
                    element={
                        <Suspense fallback={<></>}>
                            <AdminCategories />
                        </Suspense>
                    }
                />
                <Route
                    path="products"
                    element={
                        <Suspense fallback={<></>}>
                            <AdminProducts />
                        </Suspense>
                    }
                />
                 <Route
                    path="contact"
                    element={
                        <Suspense fallback={<></>}>
                            <AdminContact />
                        </Suspense>
                    }
                />
            </Route>

            <Route
                path="wishlist/:userId"
                element={
                    <Suspense fallback={<></>}>
                        <GetUserWishlist />
                    </Suspense>
                }
            />

            <Route
                path="/:category/:subcategory"
                element={
                    <Suspense fallback={<></>}>
                        <Categories />
                    </Suspense>
                }
            />
            <Route
                path="products/search/:searchWord"
                element={
                    <Suspense fallback={<></>}>
                        <SearchResult />
                    </Suspense>
                }
            />
        </Route>
    )
);
