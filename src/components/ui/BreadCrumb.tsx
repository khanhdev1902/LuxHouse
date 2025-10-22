import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
const breadcrumbNameMap = {
  "/": "Trang chủ",
  "/account": "Tài khoản",
  "/account/profile": "Hồ sơ của tôi",
  "/products": "Sản phẩm",
  "/products/1": "Sofa",
  "/cart": "Giỏ hàng",
  "/checkout": "Thanh toán",
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  if (!pathnames.length) return;
  return (
    <nav className=" bg-[#f5f5f5]">
      <Container className="text-sm text-gray-700 py-2">
        <Link to="/" className=" font-semibold">Trang chủ</Link>
        {pathnames.map((_, i) => {
          const to = "/" + pathnames.slice(0, i + 1).join("/");
          const name = breadcrumbNameMap[to as keyof typeof breadcrumbNameMap];
          return <span key={to}> / {name}</span>;
        })}
      </Container>
    </nav>
  );
}
