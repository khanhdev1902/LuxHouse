import type { RouteObject } from "react-router-dom";
import Home from "@/pages/clients/home";
import Products from "@/pages/clients/products";
import ProductDetail from "@/pages/clients/productDetail";
import ClientsLayout from "@/layouts/ClientsLayout";

export const ClientRouters: RouteObject[] = [
  {
    path: "/",
    element: <ClientsLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetail /> },
    ],
  },
];
