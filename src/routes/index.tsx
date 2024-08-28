import { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/dashboard";
import Home from "@/pages/Home";
import Topnav from "@/components/shared/topnav";

export default function AppRouter() {
  const publicRoutes = [
    {
      path: "/",
      element: <Topnav />,
      children: [
        {
          element: <Home />,
          index: true,
        },
      ],
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
