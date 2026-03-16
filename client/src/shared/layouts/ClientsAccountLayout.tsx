import SideBar from "@/shared/components/sidebar";
import Container from "@/shared/components/ui/Container";
import { Outlet } from "react-router-dom";

export default function ClientsAccountLayout() {
  return (
    <Container className="flex">
      <SideBar className=" hidden lg:block" />
      <Outlet />
    </Container>
  );
}
