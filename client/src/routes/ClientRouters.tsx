import { Navigate, type RouteObject } from "react-router-dom";
import Home from "@/pages/clients/home";
import Products from "@/pages/clients/products";
import ProductDetail from "@/pages/clients/productDetail";
import ClientsLayout from "@/layouts/ClientsLayout";
import Profile from "@/pages/clients/profile";
import Cart from "@/pages/clients/cart";
import Orders from "@/pages/clients/orders";
import Setting from "@/pages/clients/setting";
import Addresses from "@/pages/clients/addresses";
import Vouchers from "@/pages/clients/vouchers";
import NotFound from "@/pages/notfound";
import ClientsAccountLayout from "@/layouts/ClientsAccountLayout";
import Login from "@/auth/login";
import Register from "@/auth/register";

export const ClientRouters: RouteObject[] = [
  {
    path: "/",
    element: <ClientsLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:slug", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      {
        path: "account",
        element: <ClientsAccountLayout />,
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <Profile /> },
          { path: "addresses", element: <Addresses /> },
          { path: "orders", element: <Orders /> },
          { path: "vouchers", element: <Vouchers /> },
          { path: "setting", element: <Setting /> },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Register/>,
  },
  { path: "*", element: <NotFound /> },
];
