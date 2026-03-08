import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiLoader4Line } from "react-icons/ri"; // Icon loading
import useToggle from "@/shared/hooks/useToggle";
import useClickOutside from "@/shared/hooks/use-click-outside";
import { formatCurrency } from "@/utils/formatCurrency";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useNavigate } from "react-router-dom";

export default function SearchInput({ className }: { className?: string }) {
  const searchRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<string>("");
  const { value: isFocus, on, off } = useToggle();
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search, 300);
  const { data: listProduct = [], isLoading } = useProducts({
    search: debouncedSearch,
  });

  useClickOutside(searchRef, off);

  // Đóng search khi nhấn Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") off();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [off]);

  const handleSelectProduct = (slug: string) => {
    navigate(`/products/${slug}`);
    setSearch("");
    off();
  };

  const handleSeeAll = () => {
    if (!search.trim()) return;
    navigate(`/products?search=${encodeURIComponent(search)}`);
    off();
  };

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-[520px]", className)}>
      {/* Search Bar Container */}
      <div
        className={cn(
          "group flex items-center bg-white border transition-all duration-300 rounded-full px-4 py-1.5",
          isFocus
            ? "border-[#A6894B] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            : "border-[#E8E2DA] hover:border-gray-300"
        )}
      >
        <IoSearchOutline
          className={cn("size-5 transition-colors", isFocus ? "text-[#A6894B]" : "text-gray-400")}
        />

        <input
          type="text"
          placeholder="Tìm kiếm tác phẩm nội thất..."
          className="flex-1 bg-transparent px-3 py-1.5 text-[14px] focus:outline-none placeholder:text-gray-400 font-light text-[#2D2D2D]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={on}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {search && (
            <button
              onClick={() => setSearch("")}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoCloseOutline className="size-4 text-gray-400" />
            </button>
          )}
          {isLoading && <RiLoader4Line className="size-4 text-[#A6894B] animate-spin" />}
        </div>
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isFocus && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white border border-[#E8E2DA] shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-xl z-[100] overflow-hidden"
          >
            {!search ? (
              <div className="p-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#A6894B] font-semibold mb-5 text-center">
                  Xu hướng tìm kiếm
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {["Minimalist", "Classic", "Neo Classic", "Industrial"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setSearch(item)}
                      className="text-[12px] px-4 py-1.5 rounded-full border border-[#F5F1ED] text-gray-600 hover:border-[#A6894B] hover:text-[#A6894B] transition-all duration-300 bg-[#FAF9F6] hover:bg-white"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col max-h-[420px] overflow-y-auto">
                {listProduct.length > 0 ? (
                  <>
                    <div className="px-4 py-3 bg-[#FAF9F6]/50 border-b border-[#F5F1ED]">
                      <span className="text-[11px] text-gray-400 uppercase tracking-widest">
                        Kết quả tìm kiếm ({listProduct.length})
                      </span>
                    </div>
                    {listProduct.slice(0, 5).map((product, idx) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleSelectProduct(product.slug)}
                        key={product.id || idx}
                        className="flex items-center gap-4 p-4 hover:bg-[#FAF9F6] border-b border-[#F5F1ED] last:border-none cursor-pointer group transition-colors"
                      >
                        <div className="size-16 bg-gray-50 shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={product?.images?.[0] ?? ""}
                            alt={product.name}
                            className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <h4 className="text-[13px] font-medium text-[#2D2D2D] truncate group-hover:text-[#A6894B] transition-colors">
                            {product?.name ?? ""}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[13px] font-semibold text-[#2D2D2D]">
                              {formatCurrency(product?.price ?? 0)}
                            </span>
                            {(product?.originalPrice ?? 0) > (product?.price ?? 0) && (
                              <span className="text-[11px] text-gray-400 line-through">
                                {formatCurrency(product?.originalPrice ?? 0)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                          <FaArrowRightLong className="text-[#A6894B] size-3" />
                        </div>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  !isLoading && (
                    <div className="p-10 text-center">
                      <p className="text-gray-400 text-[13px]">
                        Không tìm thấy sản phẩm phù hợp cho "{search}"
                      </p>
                    </div>
                  )
                )}

                {/* View All Button */}
                {listProduct.length > 1 && (
                  <button
                    onClick={handleSeeAll}
                    className="w-full p-4 bg-white flex justify-center items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white transition-all duration-300 group"
                  >
                    Xem tất cả kết quả
                    <FaArrowRightLong className="size-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
