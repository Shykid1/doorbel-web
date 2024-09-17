import { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import Auth from "@/pages/Auth";
import Overview from "@/pages/rider";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import AboutPage from "@/pages/About";
import Contact from "@/pages/Contact";
import DeliveryOrdersPage from "@/pages/Orders";
import FindRiderPage from "@/pages/FindRider";
import Restaurants from "@/pages/Restaurants";
import Groceries from "@/pages/Groceries";
import Supermarkets from "@/pages/Supermarkets";
import Pharmacies from "@/pages/Pharmacies";
import Topnav from "@/components/shared/topnav";
import Layout from "@/components/layout";

export default function AppRouter() {
  const publicRoutes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Topnav />
          <Outlet />
        </Suspense>
      ),
      children: [
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
        {
          path: "/find-rider",
          element: <FindRiderPage />,
        },
        {
          path: "/restaurants",
          element: <Restaurants />,
        },
        {
          path: "groceries",
          element: <Groceries />,
        },
        {
          path: "/supermarket",
          element: <Supermarkets />,
        },
        {
          path: "/pharmacies",
          element: <Pharmacies />,
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
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </Layout>
      ),
      children: [
        {
          element: <Overview />,
          index: true,
        },
      ],
    },
  ];

  const routes = useRoutes([
    {
      element: <Outlet />,
      children: [...publicRoutes, ...authRoutes, ...protectedRoutes],
    },
  ]);

  return routes;
}
