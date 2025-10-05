import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

interface SearchInputProps {
  className?: string;
}

export default function SearchInput({ className }: SearchInputProps) {
  const [search, setSearch] = React.useState<string>();
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  return (
    <div
      className={cn(
        " relative flex-row items-center border border-gray-100 rounded-sm focus-within:border-[#f096198e] duration-300 ease-in-out hidden sm:flex",
        className
      )}
    >
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className=" border-none focus:outline-none px-5 py-1 min-w-96"
        value={search}
        onChange={(e) => setSearch(e?.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <motion.div
        className=" border-l border-gray-200 px-7 py-2 bg-col rounded-r-sm cursor-pointer"
        whileTap={{ scale: 1.1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <IoSearchSharp className="size-7 text-white" />
      </motion.div>

      {/* boxsearch */}
      {isFocus && (
        <div className=" absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-sm z-50 border-b-0">
          {!search ? (
            <div className=" flex flex-row justify-center items-center p-3">
              <span className="text-gray-400">Không có sản phẩm nào...</span>
            </div>
          ) : (
            <>
              <motion.div className=" w-full p-2 flex flex-row justify-center items-center gap-5 border-b border-gray-200 cursor-pointer">
                <div className="flex flex-col">
                  <span className=" font-semibold">
                    Nệm Cao Su Nhân Tạo Mát Lạnh TATANA
                  </span>
                  <span>5,903,000₫ 7,870,000₫</span>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_nem_cao_su_tatana_75cfcf32a63b4a9ca9af1b0e1b2c6ca7_master.png"
                  alt=""
                  className="w-20 h-16 object-cover"
                />
              </motion.div>
              <motion.div className=" w-full p-2 flex flex-row justify-center items-center gap-5 border-b border-gray-200">
                <div className="flex flex-col">
                  <span className=" font-semibold">
                    Nệm Cao Su Nhân Tạo Mát Lạnh TATANA
                  </span>
                  <span>5,903,000₫ 7,870,000₫</span>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_nem_cao_su_tatana_75cfcf32a63b4a9ca9af1b0e1b2c6ca7_master.png"
                  alt=""
                  className="w-20 h-16 object-cover"
                />
              </motion.div>
              <motion.div className=" w-full p-2 flex flex-row justify-center items-center gap-5 border-b border-gray-200">
                <div className="flex flex-col">
                  <span className=" font-semibold">
                    Nệm Cao Su Nhân Tạo Mát Lạnh TATANA
                  </span>
                  <span>5,903,000₫ 7,870,000₫</span>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_nem_cao_su_tatana_75cfcf32a63b4a9ca9af1b0e1b2c6ca7_master.png"
                  alt=""
                  className="w-20 h-16 object-cover"
                />
              </motion.div>
              <motion.div className=" w-full p-2 flex flex-row justify-center items-center gap-5 border-b border-gray-200">
                <div className="flex flex-col">
                  <span className=" font-semibold">
                    Nệm Cao Su Nhân Tạo Mát Lạnh TATANA
                  </span>
                  <span>5,903,000₫ 7,870,000₫</span>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_nem_cao_su_tatana_75cfcf32a63b4a9ca9af1b0e1b2c6ca7_master.png"
                  alt=""
                  className="w-20 h-16 object-cover"
                />
              </motion.div>

              <div className="flex flex-row justify-center items-center p-2 gap-2 border-b rounded-b-sm border-gray-200 cursor-pointer">
                <span className=" font-semibold">Xem thêm 19 sản phẩm</span>
                <FaArrowRightLong className="size-4" />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
