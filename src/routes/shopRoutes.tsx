import type { RouteObject } from "react-router-dom"
import CustomerLayout from "@/layouts/CustomerLayout"
import Home from "@/pages/user/home"

export const shopRoutes: RouteObject[] = [
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <Home /> },
      // { path: "products", element: <ProductPage /> },
      // { path: "cart", element: <CartPage /> }
    ],
  },
]
