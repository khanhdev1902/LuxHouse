import React from "react";
import { AnimatePresence, motion } from "framer-motion";
// import { VscAccount } from "react-icons/vsc";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Account() {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  // 👉 handle click outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      onClick={() => setIsOpen(!isOpen)}
      className=" relative cursor-pointer select-none"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <img
            src="/avt.jpg"
            alt=""
            className="rounded-full size-10 border border-gray-300"
          />
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-white px-2 py-1 rounded shadow-md border mt-1"
        >
          <span className=" font-semibold bg-gradient-to-tr from-purple-500 to-cyan-500 bg-clip-text text-transparent ">
            Khanh Deddo
          </span>
        </TooltipContent>
      </Tooltip>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className=" absolute top-full -right-14 z-10 whitespace-nowrap mt-5 flex flex-col gap-3 bg-white border shadow-xl px-4 py-3 rounded-lg"
          >
            <div className=" absolute bottom-full translate-y-1/2 right-[26%] w-5 h-5 bg-white border-t border-l border-gray-200 rotate-45" />
            <span className="text-xl border-b border-gray-500 px-2 pb-1 text-[#434343] font-medium">
              Thông tin tài khoản
            </span>
            <span className="text-[#777777]">Tài khoản của bạn</span>
            <span className="text-[#777777]">Danh sách địa chỉ</span>
            <span className="text-[#777777]">Giỏ hàng của bạn</span>
            <span className="text-[#777777]">Đơn hàng của bạn</span>
            <span className="text-[#777777]">Website admin</span>
            <span className=" text-[#777777] hover:text-black cursor-pointer transition">
              Đăng xuất
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
