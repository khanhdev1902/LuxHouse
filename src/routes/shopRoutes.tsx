import type { RouteObject } from "react-router-dom"
import CustomerLayout from "@/layouts/ClientsLayout"
import Home from "@/pages/user/home"
import Products from "@/pages/user/products"
import ProductDetail from "@/pages/user/productDetail"

export const shopRoutes: RouteObject[] = [
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetail /> },
      // { path: "cart", element: <CartPage /> }
    ],
  },
]
