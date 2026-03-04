import { AnimatePresence, motion } from "framer-motion";
import { BsBagPlus } from "react-icons/bs";
import useToggle from "@/shared/hooks/useToggle";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CartItem from "../../cart/CartItem";
import { formatCurrency } from "@/utils/formatCurrency";
import { useCart } from "@/features/cart/hooks/useCart";
export default function Cart() {
  const { value: isOpen, toggle, off } = useToggle(false);
  const navigate = useNavigate();
  const { data: cart } = useCart();
  const totalAmount = cart?.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  return (
    <div>
      {/* Icon cart on header */}
      <div
        onClick={toggle}
        className="flex flex-row items-center justify-between gap-2 cursor-pointer"
      >
        <div className="relative">
          <BsBagPlus className="size-6 text-[#434343]" />
          <span className="absolute -top-3 -right-3 bg-[#F04D4C] h-6 w-6 flex justify-center items-center rounded-full text-white font-bold text-xs text-center select-none">
            {cart?.cartItems.length ?? 0}
          </span>
        </div>
        <span className=" whitespace-nowrap hidden xl:block">Giỏ hàng</span>
      </div>

      {/* CartSheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="h-screen w-full flex flex-col sm:w-[500px] z-50 fixed top-0 right-0 border border-gray-200 shadow-lg bg-white"
            initial={{ x: 200, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: 200, y: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <header className="flex flex-row justify-between items-center py-4 px-5 border-b border-gray-200 shadow-sm">
              <span className="text-3xl font-bold text-col">Giỏ hàng</span>
              <IoMdClose onClick={off} className="size-7 text-red-700 cursor-pointer" />
            </header>
            <div className="py-2 flex-1 overflow-y-auto">
              {cart?.cartItems.map((item) => (
                <CartItem key={item.id} data={item} mode="small" />
              ))}
            </div>
            <footer className="flex flex-col gap-4 p-4 border-t border-gray-200">
              <div className="flex flex-row items-center justify-start gap-4">
                <span className=" text-lg font-bold">Tổng tiền:</span>
                <span className="text-red-600 font-bold">{formatCurrency(totalAmount ?? 0)}</span>
              </div>
              <div className="flex flex-row justify-center items-center gap-2">
                <motion.button
                  className="bg-[#27678f] w-full text-white text-sm font-semibold px-14 py-3 rounded-xl whitespace-nowrap cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={() => {
                    off();
                    navigate("/cart");
                  }}
                >
                  XEM GIỎ HÀNG
                </motion.button>
                <motion.button
                  className="bg-[#ef683a] w-full text-white text-sm font-semibold px-14 py-3 rounded-xl whitespace-nowrap cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  THANH TOÁN
                </motion.button>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
