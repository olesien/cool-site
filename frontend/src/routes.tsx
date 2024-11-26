import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// LAYOUT
const Layout = lazy(async () => await import("@/components/layout"));

// PAGE
const Home = lazy(async () => await import("@/pages/home"));
// PAGE
const Help = lazy(async () => await import("@/pages/help/help"));

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
        path="help"
        element={
          <Suspense fallback={<></>}>
            <Help />
          </Suspense>
        }
      />
    </Route>
  )
);
