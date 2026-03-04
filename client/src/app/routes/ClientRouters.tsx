import { type RouteObject } from "react-router-dom";
import Home from "@/features/home";
import Products from "@/features/products";
import ProductDetail from "@/features/productDetail";
import ClientsLayout from "@/shared/layouts/ClientsLayout";
import Profile from "@/features/profile";
import Cart from "@/features/cart";
import Orders from "@/features/orders";
import Setting from "@/features/setting";
import Addresses from "@/features/addresses";
import Vouchers from "@/features/vouchers";
import NotFound from "@/features/notfound";
import ClientsAccountLayout from "@/shared/layouts/ClientsAccountLayout";
import Login from "@/features/auth/login";
import Register from "@/features/auth/register";
import ChangePassword from "@/features/auth/change-password";

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
        path: "/",
        element: <ClientsAccountLayout />,
        children: [
          // { index: true, element: <Navigate to="profile" replace /> },
          { path: "account", element: <Profile /> },
          { path: "addresses", element: <Addresses /> },
          { path: "orders", element: <Orders /> },
          { path: "vouchers", element: <Vouchers /> },
          { path: "change-password", element: <ChangePassword /> },
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
