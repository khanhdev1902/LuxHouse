import type { RouteObject } from "react-router-dom"
import CustomerLayout from "@/layouts/CustomerLayout"
import Home from "@/pages/user/home"
import Products from "@/pages/user/products"

export const shopRoutes: RouteObject[] = [
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      // { path: "cart", element: <CartPage /> }
    ],
  },
]
