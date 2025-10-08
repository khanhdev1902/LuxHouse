import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";
import useToggle from "@/hooks/useToggle";
import { useNavigate } from "react-router-dom";
import { dataDropdownAccount } from "@/constant/const-home";

export default function Account() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { value: isOpen, toggle, off } = useToggle();
  useClickOutside(ref, off);
  const navigation = useNavigate();
  const user = {
    name: "Khanh Nguyễn Văn",
    email: "khanhdev1902@gmail.com",
  };
  return (
    <div
      ref={ref}
      onClick={toggle}
      className=" relative cursor-pointer select-none"
    >
      <div className="flex gap-1 justify-center items-center">
        <img src="/Logo_1.jpg" alt="" className="rounded-full size-10" />
        <div className="flex flex-col text-[#434343] gap-0">
          <span>Tài khoản của</span>
          <span className="font-semibold">
            {user?.name?.trim().slice(0, 10)}
            {user?.name?.length > 10 && "..."}
          </span>
        </div>
      </div>

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
            className=" absolute top-full -right-14 z-10 mt-5 whitespace-nowrap flex flex-col bg-white border shadow-xl rounded-lg text-[#434343] w-max"
          >
            <div className=" absolute bottom-full translate-y-1/2 right-[26%] w-5 h-5 bg-white border-t border-l border-gray-200 rotate-45" />
            <div className="flex gap-2 items-center px-4 py-3 border-b border-b-gray-200">
              <img
                src="/Logo_1.jpg"
                alt="Avatar"
                className=" size-16 rounded-full shadow-xl"
              />
              <div onClick={()=>navigation("/account")} className="flex flex-col items-start">
                <span className=" font-bold">{user.name}</span>
                <span className=" font-medium">{user.email}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 px-4 py-3 font-medium">
              {dataDropdownAccount.map((item, key) => (
                <div
                  key={key}
                  onClick={() => navigation(item.path)}
                  className="flex items-center gap-2"
                >
                  {item.icon}
                  <span className=" font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
