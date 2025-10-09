import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { GiHamburgerMenu } from "react-icons/gi";
import Account from "./components/Account";
import Cart from "./components/Cart";
import Notification from "./components/Notification";
interface HeaderMobileProps {
  className?: string;
}
export default function HeaderMobile({ className }: HeaderMobileProps) {
  return (
    <Container className={cn(className, "flex justify-between")}>
      <div className="flex gap-2 items-center justify-start">
        <GiHamburgerMenu className="size-9" />
        <span className="text-col font-bold text-3xl">LuxHouse</span>
      </div>
      <div className="flex items-center justify-end gap-5">
      <Notification/>
      <Cart/>
      <Account />
      </div>
    </Container>
  );
}
