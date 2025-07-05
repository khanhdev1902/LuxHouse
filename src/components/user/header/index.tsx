import { cn } from "@/lib/utils";
import Account from "./components/Account";
import Cart from "./components/Cart";
import Logo from "./components/Logo";
import SearchInput from "./components/SearchInput";
import VerticalDropdown from "./components/VerticalDropDown";
import { GiHamburgerMenu } from "react-icons/gi";
import Store from "./components/Store";
import Container from "@/components/ui/Container";
const menuItems = [
  {
    title: "Sản phẩm",
    submenu: [
      "Bộ sưu tập",
      "Phòng ngủ",
      "Phòng khách",
      "Phòng ăn",
      "Phòng làm việc",
    ],
  },
  { title: "Khuyến mãi", submenu: ["Khuyến mãi hè", "Mã khuyến mãi"] },
  { title: "Tin tức", submenu: ["Bài viết", "Mọi người", "Mạng xã hội"] },
  { title: "Liên hệ hợp tác", submenu: [] },
  { title: "Về ZORO", submenu: [] },
  { title: "Cửa hàng", submenu: [] },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white ">
      <Container className="flex flex-col gap-4">
        <div
          className={cn(
            "flex flex-row flex-wrap justify-between items-center gap-4",
            "sm:flex-nowrap"
          )}
        >
          <div
            className={cn("flex flex-row- gap-2 items-center cursor-pointer")}
          >
            <GiHamburgerMenu className={cn("size-8", "sm:hidden")} />
            <Logo className="text-[20px]" />
          </div>
          <SearchInput className={cn("order-2", "sm:order-none")} />
          <div className={cn("flex flex-row gap-4")}>
            <Store />
            <Account />
            <Cart />
          </div>
        </div>
        <nav className={cn(" hidden", "sm:flex flex-row gap-2")}>
          <VerticalDropdown menuItems={menuItems} />
        </nav>
      </Container>
    </header>
  );
}
