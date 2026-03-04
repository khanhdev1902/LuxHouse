import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { dataTestProducts } from "@/shared/constant/const-home";
import useToggle from "@/shared/hooks/useToggle";
import useClickOutside from "@/shared/hooks/use-click-outside";
import { formatCurrency } from "@/utils/formatCurrency";

export default function SearchInput({ className }: { className?: string }) {
  const [search, setSearch] = useState<string>("");
  const { value: isFocus, on, off } = useToggle();
  const searchRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, off);

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-[480px]", className)}>
      {/* Search Bar - Giữ Form Input đóng khung như ban đầu */}
      <div
        className={cn(
          "flex items-stretch border transition-all duration-500 rounded-sm overflow-hidden",
          isFocus ? "border-[#A6894B] shadow-[0_4px_20px_rgba(166,137,75,0.1)]" : "border-[#E8E2DA]"
        )}
      >
        <input
          type="text"
          placeholder="Tìm kiếm tác phẩm nội thất..."
          className="flex-1 px-5 py-2.5 text-[13px] focus:outline-none placeholder:text-gray-300 font-medium text-[#2D2D2D]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={on}
        />

        {/* Nút Search - Thay khối màu thô bằng khối màu Luxhouse Charcoal */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-[#2D2D2D] px-6 flex items-center justify-center group hover:bg-[#A6894B] transition-colors duration-300"
        >
          <IoSearchOutline className="size-5 text-white group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>

      {/* Dropdown Kết quả - Làm gọn và chuyên nghiệp hơn */}
      <AnimatePresence>
        {isFocus && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-[#E8E2DA] shadow-[0_15px_35px_rgba(0,0,0,0.1)] rounded-sm z-[100] overflow-hidden"
          >
            {!search ? (
              <div className="p-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-3">
                  Gợi ý xu hướng
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Minimalist", "Classic", "Neo Classic"].map((item) => (
                    <span
                      key={item}
                      className="text-[11px] px-3 py-1 border border-[#F5F1ED] text-gray-500 hover:border-[#A6894B] hover:text-[#A6894B] transition-all cursor-pointer"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                {dataTestProducts.slice(0, 4).map((product, key) => (
                  <div
                    key={key}
                    className="flex items-center gap-4 p-3 hover:bg-[#FAF9F6] border-b border-[#F5F1ED] last:border-none cursor-pointer group transition-colors"
                  >
                    <div className="size-14 bg-gray-50 shrink-0 overflow-hidden rounded-sm">
                      <img
                        src={product.image_1}
                        className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-[12px] font-bold text-[#2D2D2D] truncate tracking-tight">
                        {product?.title}
                      </h4>
                      <span className="text-[11px] text-[#A6894B] font-serif mt-0.5">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* View All Button */}
                <div className="p-3 bg-[#FAF9F6] flex justify-center border-t border-[#F5F1ED]">
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#2D2D2D] hover:text-[#A6894B] transition-colors">
                    Xem tất cả 19 sản phẩm
                    <FaArrowRightLong className="size-3" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
