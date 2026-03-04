import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Đổi sang Lucide cho thanh mảnh
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type MenuItem = {
  title: string;
  submenu: string[];
};

interface VerticalDropdownProps {
  menuItems: MenuItem[];
}

export default function VerticalDropdown({ menuItems }: VerticalDropdownProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <nav className="flex gap-8 items-center">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          className="relative py-2 cursor-pointer group"
        >
          {/* Main Menu Link */}
          <div onClick={() => navigate("/products")} className="flex items-center gap-1.5">
            <span
              className={cn(
                "text-[13px] uppercase tracking-[0.15em] font-bold transition-colors duration-300",
                activeIndex === index
                  ? "text-[#A6894B]"
                  : "text-[#2D2D2D] group-hover:text-[#A6894B]"
              )}
            >
              {item.title}
            </span>

            {item.submenu.length > 0 && (
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform duration-300 text-gray-400 group-hover:text-[#A6894B]",
                  activeIndex === index && "rotate-180"
                )}
              />
            )}
          </div>

          {/* Underline hiệu ứng chạy cực mảnh */}
          <motion.div
            className="absolute bottom-1 left-0 h-[1.5px] bg-[#A6894B]"
            initial={{ width: 0 }}
            animate={{ width: activeIndex === index ? "100%" : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Submenu Dropdown */}
          <AnimatePresence>
            {activeIndex === index && item.submenu.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-11 left-0 bg-white border border-[#F5F1ED] shadow-[0_15px_35px_rgba(0,0,0,0.05)] py-2 min-w-[220px] z-50 rounded-sm"
              >
                {/* Một chi tiết nhỏ tạo điểm nhấn trên cùng dropdown */}
                <div className="absolute top-0 left-4 right-4 h-[2px] bg-[#A6894B] transform -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity" />

                {item.submenu.map((sub, i) => (
                  <div
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/products");
                    }}
                    className="group/item flex items-center justify-between px-5 py-2.5 hover:bg-[#FAF9F6] transition-colors"
                  >
                    <span className="text-[12px] text-gray-500 group-hover/item:text-[#A6894B] group-hover/item:translate-x-1 transition-all duration-300 font-medium tracking-wide">
                      {sub}
                    </span>

                    {/* Chấm tròn nhỏ chỉ hiện khi hover item con */}
                    <div className="size-1 rounded-full bg-[#A6894B] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </div>
                ))}

                {/* Footer nhỏ trong dropdown (tùy chọn) */}
                <div className="mt-2 px-5 py-2 border-t border-[#F5F1ED] bg-[#FAF9F6]/50">
                  <span className="text-[9px] uppercase tracking-widest text-gray-300 font-bold">
                    Luxhouse Collection
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}
