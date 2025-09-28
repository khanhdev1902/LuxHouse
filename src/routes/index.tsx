import { useRoutes } from "react-router-dom";
import { shopRoutes } from "./shopRoutes";
import ScrollOnTop from "@/utils/ScrollOnTop";

export default function AppRouter() {
  const routes = useRoutes([
    ...shopRoutes,
    // 👉 sau này có thể thêm: ...adminRoutes, ...authRoutes,...
  ]);
  return (
    <>
      <ScrollOnTop />
      {routes}
    </>
  );
}
