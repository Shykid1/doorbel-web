import { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/dashboard";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import AboutPage from "@/pages/About";
import Contact from "@/pages/Contact";
import DeliveryOrdersPage from "@/pages/Orders";
// import Topnav from "@/components/shared/topnav";

export default function AppRouter() {
  const publicRoutes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/orders",
      element: <DeliveryOrdersPage />,
    },
  ];

  const authRoutes = [
    {
      path: "/auth",
      element: <Auth />,
    },
  ];

  const protectedRoutes = [
    {
      path: "/dashboard",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: <Dashboard />,
          index: true,
        },
      ],
    },
  ];

  const routes = useRoutes([
    ...publicRoutes,
    ...authRoutes,
    ...protectedRoutes,
  ]);

  return routes;
}
