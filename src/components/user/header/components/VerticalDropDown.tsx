import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

type MenuItem = {
  title: string;
  submenu: string[];
};

interface VerticalDropdownProps {
  menuItems: MenuItem[];
}

export default function VerticalDropdown({ menuItems }: VerticalDropdownProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

  // Auto close when click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setActiveIndex(null);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex space-x-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className="relative cursor-pointer group"
          >
            <div className="flex flex-row gap-1 items-center group text-[#434343] text-col-hover cursor-pointer">
              <span className="font-semibold transition-colors ">
                {item.title}
              </span>
              <FaAngleDown className={clsx("transition-transform group-hover:rotate-180 size-4 duration-300 ease-in-out delay-75 group-hover:text-cyan-500",item?.submenu.length===0 && "hidden" )}/>
            </div>

            <AnimatePresence>
              {activeIndex === index && item?.submenu?.length > 0 &&(
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={clsx(
                    "absolute top-full left-0 bg-white shadow-lg mt-2 min-w-[180px] z-20",
                    "flex flex-col space-y-2 border border-gray-100 rounded-md"
                  )}
                >
                  {item?.submenu?.map((sub, i) => (
                    <span
                      key={i}
                      className="text-gray-700 text-col-hover transition-all cursor-pointer p-1 px-4 border-b border-gray-100"
                      onClick={()=>{navigate("/products")}}
                      
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
    </div>
  );
}
