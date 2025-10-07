import { useRoutes } from "react-router-dom";
import { ClientRouters } from "./ClientRouters";
import ScrollToTop from "@/utils/ScrollToTop";

export default function AppRouter() {
  const routes = useRoutes([...ClientRouters]);
  return (
    <>
      <ScrollToTop />
      {routes}
    </>
  );
}
