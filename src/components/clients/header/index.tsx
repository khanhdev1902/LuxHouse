import { cn } from "@/lib/utils";
import Account from "./components/Account";
import Cart from "./components/Cart";
import Logo from "./components/Logo";
import SearchInput from "./components/SearchInput";
import VerticalDropdown from "./components/VerticalDropDown";
import { GiHamburgerMenu } from "react-icons/gi";
import Container from "@/components/ui/Container";
import React from "react";
import { debounce } from "@/utils/debounce";
import { IoSearchSharp } from "react-icons/io5";
import Notification from "./components/Notification";
import { navbarHeaders } from "@/constant/const-home";

interface HeaderProps {
  className?: string;
  onHandleResize: (value: number) => void;
}
export default function Header({ className, onHandleResize }: HeaderProps) {
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
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 w-full bg-white z-50 shadow-sm",
        className
      )}
    >
      <Container>
        <div
          className={cn(
            "flex flex-row flex-wrap justify-between items-center gap-4",
            "sm:flex-nowrap"
          )}
        >
          <div
            className={cn(
              "flex flex-row gap-2 items-center justify-center cursor-pointer"
            )}
          >
            <GiHamburgerMenu className={cn("size-8", "sm:hidden")} />
            <Logo className="text-[20px]" />
          </div>
          <SearchInput />
          <div className={cn("flex flex-row items-center justify-end gap-4")}>
            <IoSearchSharp className="size-7 sm:hidden hover:text-cyan-500" />
            <Account />
            <Notification />
            <Cart />
          </div>
        </div>
        <nav className={cn(" hidden", "lg:flex flex-row gap-2")}>
          <VerticalDropdown menuItems={navbarHeaders} />
        </nav>
      </Container>
    </header>
  );
}
