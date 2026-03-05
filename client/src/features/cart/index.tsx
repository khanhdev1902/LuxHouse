import { Breadcrumbs } from "@/shared/components/ui/BreadCrumb";
import Container from "@/shared/components/ui/Container";
import { formatCurrency } from "@/utils/formatCurrency";
import { useCart } from "./hooks/useCart";
import Loading from "@/shared/components/ui/Loading";
import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineTruck, HiOutlineBadgeCheck } from "react-icons/hi";
import { CartItem } from "./components/CartItem";
import { LoadingOverlay } from "@/shared/components/ui/LoadingOverlay";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const policies = [
  {
    title: "An Tâm Tuyệt Đối",
    desc: "Đặt hàng trước, thanh toán sau tại nhà. Miễn phí giao hàng & lắp đặt nội thành.",
    icon: <HiOutlineShieldCheck />,
  },
  {
    title: "Giao Hàng Nhanh",
    desc: "Vận chuyển chuyên nghiệp trong vòng 3 ngày làm việc.",
    icon: <HiOutlineTruck />,
  },
  {
    title: "Bảo Hành Đặc Quyền",
    desc: "Miễn phí 1 đổi 1 trong 7 ngày. Bảo hành 2 năm & bảo trì trọn đời.",
    icon: <HiOutlineBadgeCheck />,
  },
];

export default function Cart() {
  const { data: cart, isLoading, isFetching } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  const totalAmount = cart?.cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const isEmpty = !cart?.cartItems || cart.cartItems.length === 0;

  return (
    <div className="bg-[#FCFCFC] min-h-screen pb-20">
      <Breadcrumbs />

      <Container className="mt-10">
        <header className="mb-12 text-center space-y-2">
          <h1 className="text-3xl font-light tracking-[0.2em] uppercase text-gray-900">
            Giỏ hàng{" "}
            <span className="font-bold underline underline-offset-8 decoration-1 text-stone-300">
              của bạn
            </span>
          </h1>
          {!isEmpty && (
            <p className="text-sm text-stone-500 font-light italic">
              Bạn đang có {cart.cartItems.length} sản phẩm tinh hoa trong danh sách
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
          <div className="lg:col-span-8 relative">
            {isEmpty ? (
              <div className="py-20 text-center border border-dashed border-stone-200 rounded-lg">
                <p className="text-stone-400 font-light mb-5 tracking-widest">
                  GIỎ HÀNG ĐANG TRỐNG
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="px-8 py-3 bg-black text-white text-xs tracking-[0.2em] hover:bg-stone-800 transition-all"
                >
                  TIẾP TỤC MUA SẮM
                </button>
              </div>
            ) : (
              <div className="space-y-6 relative">
                <div className="flex flex-col border-t border-stone-200">
                  {cart.cartItems.map((item) => (
                    <div key={item.id} className="border-b border-stone-100 py-6">
                      <CartItem data={item} isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
                    </div>
                  ))}
                </div>
                {isUpdating || isFetching ? <LoadingOverlay /> : null}

                {/* Ghi chú đơn hàng phong cách tối giản */}
                <div className="mt-10 space-y-4">
                  <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
                    Ghi chú đặc biệt cho Luxhouse
                  </label>
                  <textarea
                    placeholder="Yêu cầu về thời gian giao hàng hoặc đóng gói quà tặng..."
                    className="w-full border border-stone-200 rounded-none p-4 h-32 focus:border-black outline-none transition-all font-light text-sm bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* CỘT PHẢI: TỔNG KẾT & CHÍNH SÁCH */}
          <div className="lg:col-span-4 space-y-8">
            {/* Order Summary Box */}
            <div className="bg-white border border-stone-200 p-8 sticky top-24 shadow-sm">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 pb-4 border-b border-stone-100 text-gray-900">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm font-light text-stone-500">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(totalAmount ?? 0)}</span>
                </div>
                <div className="flex justify-between text-sm font-light text-stone-500">
                  <span>Vận chuyển:</span>
                  <span className="text-green-600 uppercase text-[10px] font-bold tracking-tighter">
                    Miễn phí
                  </span>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200 flex justify-between items-end">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-900">
                    Tổng thanh toán
                  </span>
                  <span className="text-2xl font-light text-black">
                    {formatCurrency(totalAmount ?? 0)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white py-4 mt-8 text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#1a1a1a] transition-colors"
                >
                  Tiến hành thanh toán
                </motion.button>
              </div>
            </div>

            {/* Chính sách phong cách Luxhouse */}
            <div className="space-y-6 px-2">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                Cam kết dịch vụ
              </h3>
              {policies.map((policy, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-xl text-stone-400 mt-1">{policy.icon}</div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-gray-800 tracking-wide">
                      {policy.title}
                    </h4>
                    <p className="text-[12px] leading-relaxed text-stone-500 font-light italic">
                      {policy.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
