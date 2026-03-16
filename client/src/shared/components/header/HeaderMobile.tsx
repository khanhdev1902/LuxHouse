import Container from "@/shared/components/ui/Container";
import { cn } from "@/lib/utils";
import { GiHamburgerMenu } from "react-icons/gi";
import Account from "./components/Account";
import Cart from "../../../features/cart/components/CartDrawer";
import Notification from "./components/Notification";
import Logo from "./components/Logo";
interface HeaderMobileProps {
  className?: string;
}
export default function HeaderMobile({ className }: HeaderMobileProps) {
  return (
    <Container className={cn(className, "flex justify-between h-20")}>
      <div className="flex gap-2 items-center justify-start">
        <GiHamburgerMenu className="size-9" />
        <Logo />
      </div>
      <div className="flex items-center justify-end gap-5">
        <Notification />
        <Cart />
        <Account />
      </div>
    </Container>
  );
}
