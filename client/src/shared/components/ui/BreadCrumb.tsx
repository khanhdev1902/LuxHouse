import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import {
  ChevronRight,
  LampCeiling,
  // Home
} from "lucide-react";

const breadcrumbNameMap: Record<string, string> = {
  "/account": "Tài khoản",
  "/account/profile": "Hồ sơ của tôi",
  "/products": "Sản phẩm",
  "/cart": "Giỏ hàng",
  "/checkout": "Thanh toán",
};

export function Breadcrumbs({ name }: { name?: string }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="bg-gray-50 border-b border-gray-100">
      <Container className="flex items-center py-3 text-sm overflow-x-auto no-scrollbar">
        <Link
          to="/"
          className="flex items-center text-gray-500 hover:text-[#a6894b] transition-colors duration-200"
        >
          <LampCeiling size={16} className="mr-1" />
          <span className="font-medium whitespace-nowrap ">Trang chủ</span>
        </Link>

        {pathnames.map((_, i) => {
          const routeTo = `/${pathnames.slice(0, i + 1).join("/")}`;
          const isLast = i === pathnames.length - 1 && !name;

          // Lấy tên từ map, nếu không có thì format lại từ slug (ví dụ: "giay-the-thao" -> "Giày Thể Thao")
          const displayName =
            breadcrumbNameMap[routeTo] ||
            pathnames[i].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <div key={routeTo} className="flex items-center">
              <ChevronRight size={14} className="mx-2 text-gray-400 flex-shrink-0" />
              {isLast ? (
                <span className="text-gray-500 text-sm truncate max-w-40">{displayName}</span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-gray-500 hover:text-[#a6894b] transition-colors duration-200 whitespace-nowrap  truncate max-w-40 lg:max-w-full"
                >
                  {displayName}
                </Link>
              )}
            </div>
          );
        })}

        {/* {name && (
          <div className="flex items-center">
            <ChevronRight size={14} className="mx-2 text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 font-semibold truncate max-w-[250px]">{name}</span>
          </div>
        )} */}
      </Container>
    </nav>
  );
}
