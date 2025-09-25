import { motion } from "framer-motion";
import { CircleX } from "lucide-react";

interface CartSheetProps {
  handleIsCartSheet: (value: boolean) => void;
}

export default function CartSheet({ handleIsCartSheet }: CartSheetProps) {
  return (
    <motion.div
      className="fixed z-50 top-0 right-0 sm:w-[500px] h-full w-full"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col h-screen bg-white">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className=" text-2xl font-bold bg-gradient-to-tl from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Giỏ hàng
            </span>
            <CircleX
              className=" cursor-pointer size-7 text-gray-500 hover:text-red-500"
              onClick={() => handleIsCartSheet(false)}
            />
          </div>
          <div>
            <img src="/cart_empty.png" alt="cart" className=" size-24" />
            <button
              className="text-lg font-semibold shadow-sm border rounded-sm border-gray-500 px-4 py-2"
              onClick={() => handleIsCartSheet(false)}
            >
              Quay lại
            </button>
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            className="w-full bg-black text-white py-2 rounded-md"
            onClick={() => handleIsCartSheet(false)}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </motion.div>
  );
}
