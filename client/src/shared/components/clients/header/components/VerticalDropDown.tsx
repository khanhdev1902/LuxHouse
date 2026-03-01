import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
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
    <div className="flex gap-6">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate("/products")}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          className="relative flex items-center gap-1 cursor-pointer group text-[#434343]"
        >
          <span
            className={cn(
              "font-semibold transition-colors delay-75 duration-300",
              "group-hover:bg-gradient-to-tr group-hover:from-[#c02425] group-hover:to-[#f0cb35] group-hover:bg-clip-text group-hover:text-transparent"
            )}
          >
            {item.title}
          </span>
          <FaAngleDown
            className={cn(
              item?.submenu.length === 0 && "hidden",
              "group-hover:rotate-180 size-4 duration-300 ease-in-out group-hover:text-[#c02425]"
            )}
          />

          <AnimatePresence>
            {activeIndex === index && item?.submenu?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-full left-0 bg-white shadow-lg mt-2 min-w-[180px] z-20 flex flex-col rounded-sm"
              >
                {item?.submenu?.map((sub, i) => (
                  <span
                    key={i}
                    className={cn(
                      i === 0 && "rounded-t-sm",
                      i === item?.submenu?.length - 1 && "rounded-b-sm",
                      " text-col-hover cursor-pointer p-2 px-4 border border-gray-100"
                    )}
                    onClick={() => {
                      navigate("/products");
                    }}
                  >
                    {sub}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
