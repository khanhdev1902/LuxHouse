import { user } from "@/shared/constant/const-home";
import { FaEdit, FaUser, FaClipboardList, FaMapMarkerAlt, FaKey, FaGem } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Thông tin cá nhân", path: "/account", icon: <FaUser /> },
  { label: "Lịch sử đơn hàng", path: "/orders", icon: <FaClipboardList /> },
  { label: "Sổ địa chỉ", path: "/addresses", icon: <FaMapMarkerAlt /> },
  { label: "Bảo mật tài khoản", path: "/change-password", icon: <FaKey /> },
];

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="min-w-[280px] bg-white border border-[#E8E2DA] p-8 shadow-sm h-fit sticky top-24">
      {/* Header: Luxhouse Member */}
      <header className="flex flex-col items-center text-center pb-8 border-b border-[#F5F1ED]">
        <div className="relative mb-4">
          <div className="size-20 rounded-full border border-[#A6894B] p-1 flex items-center justify-center relative z-10">
            <img src={user.avata} alt="avatar" className="rounded-full size-full object-cover" />
          </div>
          {/* Badge hạng thành viên cao cấp */}
          <div className="absolute -bottom-1 -right-1 bg-[#2D2D2D] text-[#A6894B] size-6 rounded-full flex items-center justify-center border-2 border-white z-20 shadow-sm">
            <FaGem className="size-2.5" />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-lg text-[#2D2D2D] tracking-wide">
            {`${user.firstName} ${user.lastName}`}
          </h3>
          <button className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.15em] text-gray-400 hover:text-[#A6894B] transition-colors group mx-auto">
            <FaEdit className="size-2.5 group-hover:rotate-12 transition-transform" />
            Hiệu chỉnh hồ sơ
          </button>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="mt-8">
        <p className="text-[9px] uppercase tracking-[0.2em] text-gray-300 font-bold mb-6">
          Quản lý không gian
        </p>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-sm text-[11px] uppercase tracking-[0.1em] font-medium transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-[#FAF9F6] text-[#A6894B] border-r-2 border-[#A6894B]"
                        : "text-gray-500 hover:bg-[#FAF9F6] hover:text-[#2D2D2D]"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-[14px] transition-colors duration-300 
                      ${isActive ? "text-[#A6894B]" : "text-gray-300 group-hover:text-[#A6894B]"}`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </div>

                  {/* Dấu chấm nhỏ cho item active */}
                  {isActive && <div className="size-1 bg-[#A6894B] rounded-full"></div>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Nút đăng xuất hoặc hỗ trợ */}
      <div className="mt-12 pt-8 border-t border-[#F5F1ED]">
        <div className="bg-[#FAF9F6] p-4 rounded-lg">
          <p className="text-[10px] text-gray-400 leading-relaxed italic">
            Cần hỗ trợ riêng tư? <br />
            <span className="text-[#2D2D2D] font-bold not-italic cursor-pointer hover:text-[#A6894B]">
              Concierge Luxhouse
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
}
