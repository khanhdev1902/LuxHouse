import React from "react";
import Container from "@/components/ui/Container";
import Account from "./components/Account";
import Cart from "./components/Cart";
import Logo from "./components/Logo";
import SearchInput from "./components/SearchInput";
import VerticalDropdown from "./components/VerticalDropDown";
import Notification from "./components/Notification";
import { debounce } from "@/utils/debounce";
import { navbarHeaders } from "@/constant/const-home";

interface HeaderDesktopProps {
  className?: string;
  onHandleResize: (value: number) => void;
}
export default function HeaderDesktop({
  className,
  onHandleResize,
}: HeaderDesktopProps) {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const handleResizeRef = React.useRef<() => void>(() => {});
  React.useEffect(() => {
    handleResizeRef.current = debounce(() => {
      if (headerRef.current) {
        onHandleResize(headerRef.current.offsetHeight);
      }
    }, 300);
    handleResizeRef.current();
    window.addEventListener("resize", handleResizeRef.current);
    return () => {
      window.removeEventListener("resize", handleResizeRef.current!);
    };
  }, []);

  return (
    <header ref={headerRef} className={className}>
      <Container className=" flex flex-col gap-8">
        <div className="flex justify-between items-center gap-8">
          <Logo />
          <SearchInput className=" flex-grow" />
          <div className="flex flex-row items-center justify-end gap-4">
            <Account />
            <Notification />
            <Cart />
          </div>
        </div>
        <VerticalDropdown menuItems={navbarHeaders} />
      </Container>
    </header>
  );
}
