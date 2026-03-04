import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useClickOutside from "@/shared/hooks/use-click-outside";
import useToggle from "@/shared/hooks/useToggle";
import { useNavigate } from "react-router-dom";
import { dataDropdownAccount } from "@/shared/constant/const-home";
import { cn } from "@/lib/utils";
import { ChevronDown, ShieldCheck, LogOut, CircleUser } from "lucide-react";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { logout } from "@/features/auth/apis/auth.api";
import { tokenManager } from "@/lib/tokenManager";

export default function Account({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { value: isOpen, toggle, off } = useToggle();
  useClickOutside(ref, off);
  const navigation = useNavigate();
  const { data: user } = useCurrentUser();

  const handleLogout = () => {
    logout();
    tokenManager.clearTokens();
    navigation("/login");
    off();
  };

  return (
    <div ref={ref} className={cn(className, "relative cursor-pointer select-none")}>
      {/* Trigger: Tinh gọn lại phần Header */}
      <div onClick={toggle} className="flex items-center gap-2.5 group">
        <div className="relative">
          {user ? (
            <div className="relative">
              <img
                src={user?.avatar || "/Logo_1.jpg"}
                className="size-8 rounded-full border border-[#E8E2DA] group-hover:border-[#A6894B] transition-colors object-cover"
              />
              {user && (
                <div className="absolute bottom-0 right-0 size-2 bg-green-500 border border-white rounded-full"></div>
              )}
            </div>
          ) : (
            <CircleUser size={26} className=" text-gray-600" />
          )}
        </div>

        {user ? (
          <div className="hidden xl:block text-left leading-tight">
            <p className="text-[11px] font-medium text-[#2D2D2D] flex items-center gap-1">
              {user.name.split(" ").pop()}
              <ChevronDown
                size={10}
                className={cn("transition-transform", isOpen && "rotate-180")}
              />
            </p>
            <p className="text-[9px] text-[#A6894B] font-bold uppercase tracking-tighter">
              Thành viên
            </p>
          </div>
        ) : (
          <div
            onClick={() => navigation("/login")}
            className="hidden xl:block text-sm font-medium text-[#2D2D2D]"
          >
            ĐĂNG NHẬP
          </div>
        )}
      </div>

      {/* Dropdown: Thu gọn diện tích (Space-efficient) */}
      <AnimatePresence>
        {isOpen && user && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-full right-0 z-[100] mt-2 w-56 bg-white border border-[#E8E2DA] shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-sm overflow-hidden"
          >
            {/* Header Mini: Gọn gàng hơn */}
            <div className="px-4 py-3 bg-[#FAF9F6] border-b border-[#F0EBE5] flex items-center gap-3">
              <img
                src={user?.avatar || "/Logo_1.jpg"}
                className="size-10 rounded-full border border-white shadow-sm"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-bold text-[#2D2D2D] truncate">{user?.name}</span>
                <div className="flex items-center gap-1 text-[#A6894B]">
                  <ShieldCheck size={9} />
                  <span className="text-[8px] uppercase tracking-widest font-black">
                    Lux Member
                  </span>
                </div>
              </div>
            </div>

            {/* Menu: Giảm padding, tăng tính chỉn chu */}
            <div className="py-1">
              {dataDropdownAccount.map((item, key) => {
                const isLogout = item.name === "Đăng xuất";
                if (isLogout) return null; // Xử lý đăng xuất riêng ở dưới
                return (
                  <div
                    key={key}
                    onClick={() => {
                      navigation(item.path);
                      off();
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-[11px] text-[#555] hover:bg-[#FAF9F6] hover:text-[#A6894B] transition-colors"
                  >
                    <span className="text-gray-400 size-3.5 flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="tracking-wide font-medium">{item.name}</span>
                  </div>
                );
              })}

              <div className="h-[1px] bg-[#F5F1ED] my-1 mx-2" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-[11px] text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} />
                <span className="tracking-wide font-bold">Đăng xuất</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
