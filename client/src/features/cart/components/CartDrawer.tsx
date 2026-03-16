import { AnimatePresence, motion } from "framer-motion";
import { BsBag } from "react-icons/bs"; // Đổi sang BsBag nhìn thanh thoát hơn
import useToggle from "@/shared/hooks/useToggle";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/formatCurrency";
import { useCart } from "@/features/cart/hooks/useCart";
import { CartItem } from "@/features/cart/components/CartItem";
import { LoadingOverlay } from "@/shared/components/ui/LoadingOverlay";
import { useState } from "react";

export default function CartDrawer() {
  const { value: isOpen, toggle, off } = useToggle(false);
  const navigate = useNavigate();
  const { data: cart, isLoading } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = cart?.cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="relative">
      {/* Icon Cart */}
      <div onClick={toggle} className="flex items-center gap-2.5 cursor-pointer group">
        <div className="relative">
          <BsBag className="size-5 text-[#2D2D2D] group-hover:text-[#A6894B] transition-colors" />
          {cart && (
            <span className="absolute -top-2 -right-2 bg-[#A6894B] h-4 min-w-4 px-1 flex justify-center items-center rounded-full text-white font-bold text-[9px] leading-none shadow-sm">
              {cart?.cartItems.length ?? 0}
            </span>
          )}
        </div>
        <span className="text-[13px] whitespace-nowrap font-medium text-[#2D2D2D] hidden xl:block uppercase tracking-wider group-hover:text-[#A6894B] transition-colors">
          Giỏ hàng
        </span>
      </div>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop làm mờ tinh tế */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={off}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[99]"
            />

            <motion.div
              className="h-screen w-full sm:w-[550px] z-[100] fixed top-0 right-0 shadow-[-10px_0_30px_rgba(0,0,0,0.04)] bg-white flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Bezier curve cho cảm giác lướt êm hơn
            >
              {/* Header: Serif & Elegant */}
              <header className="flex justify-between items-center py-6 px-8 border-b border-[#F5F1ED]">
                <div className="flex flex-col">
                  <h2 className="text-xl font-medium text-[#2D2D2D]">Giỏ hàng của bạn</h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                    Luxhouse Selection
                  </p>
                </div>
                <button
                  onClick={off}
                  className="p-2 hover:bg-[#FAF9F6] rounded-full transition-colors group"
                >
                  <IoMdClose className="size-5 text-gray-400 group-hover:text-[#2D2D2D]" />
                </button>
              </header>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-4 relative">
                {cart?.cartItems.length ? (
                  cart.cartItems.map((item) => (
                    <div key={item.id} className="border-b border-[#F5F1ED] last:border-none">
                      <CartItem
                        data={item}
                        isProcessing={isProcessing}
                        setIsProcessing={setIsProcessing}
                        mode="small"
                      />
                    </div>
                  ))
                ) : isLoading ? (
                  <LoadingOverlay />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <BsBag className="size-12 text-[#F5F1ED]" />
                    <p className="text-sm text-gray-400 font-light">
                      Chưa có sản phẩm nào trong không gian của bạn.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer: Sang trọng, tập trung vào Checkout */}
              <footer className="p-2 px-8 border-t border-[#F5F1ED] bg-[#FAF9F6]/50">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                    Tạm tính
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-semibold text-[#A6894B]">
                      {formatCurrency(totalAmount ?? 0)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      off();
                      navigate("/cart");
                    }}
                    className="w-full py-4 border border-[#2D2D2D] text-[#2D2D2D] text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#2D2D2D] hover:text-white transition-all duration-300"
                  >
                    Xem chi tiết giỏ hàng
                  </button>
                  <button
                    onClick={() => {
                      off();
                      navigate("/checkout", {
                        state: {
                          type: "cart",
                        },
                      });
                    }}
                    className="w-full py-4 bg-[#2D2D2D] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#A6894B] transition-all duration-500 shadow-xl shadow-black/5"
                  >
                    Thanh toán ngay
                  </button>
                </div>

                <p className="text-[10px] text-center text-gray-400 mt-4 italic">
                  Miễn phí vận chuyển cho đơn hàng nội thất trên 20.000.000đ
                </p>
              </footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
