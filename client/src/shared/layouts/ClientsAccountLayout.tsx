import SideBar from "@/shared/components/clients/sidebar";
import Container from "@/shared/components/ui/Container";
import { Outlet } from "react-router-dom";

export default function ClientsAccountLayout() {
  return (
    <Container className="flex">
      <SideBar />
      <Outlet />
    </Container>
  );
}
