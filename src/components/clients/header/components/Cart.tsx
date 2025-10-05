import { AnimatePresence, motion } from "framer-motion";
import { BsBagPlus } from "react-icons/bs";
import useToggle from "@/hooks/common/useToggle";
import { IoMdClose } from "react-icons/io";
export default function Cart() {
  const { value: isOpen, toggle, off } = useToggle(false);
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
            7
          </span>
        </div>
        <span>Giỏ hàng</span>
      </div>

      {/* CartSheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="h-screen w-full flex flex-col sm:w-[500px] fixed top-0 right-0 border border-gray-200 shadow-lg bg-white"
            initial={{ x: 200, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: 200, y: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <header className="flex flex-row justify-between items-center py-4 px-5 border-b border-gray-200 shadow-sm">
              <span className="text-3xl font-bold text-col">Giỏ hàng</span>
              <IoMdClose
                onClick={off}
                className="size-7 text-red-700 cursor-pointer"
              />
            </header>
            <div className="py-2 flex-1 overflow-y-auto">
              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>
              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>
              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>

              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>

              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>

              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>

              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>

              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>

              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>

              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>

              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>

              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>

              <div className="flex flex-row justify-center items-center p-4 border-b cursor-pointer">
                <div>
                  <span className=" font-semibold line-clamp-2">
                    Hệ tủ bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước Hệ tủ
                    bếp MOHO Kitchen Premium Narvik Nhiều Kích Thước
                  </span>
                  <div className="flex flex-row justify-between items-center pr-5">
                    <div className="flex flex-row items-center gap-2">
                      <span className="w-10 h-6 rounded-sm p-2 bg-slate-300 flex flex-row justify-center items-center text-xs">
                        10
                      </span>
                      <span>11,890,000₫ --- 19,816,667₫</span>
                    </div>
                    <motion.div
                      className="size-6 bg-slate-300 p-1 rounded-sm shadow-sm cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdClose />
                    </motion.div>
                  </div>
                </div>
                <img
                  src="https://product.hstatic.net/200000065946/product/pro_1m5_chu_i_noi_that_moho_tu_bep_premium_chu_i_1m5_narvik_c_8273740dc0ef4573906ba2ffed50ffdd_master.jpg"
                  alt=""
                  className="min-w-32 h-20 select-none"
                />
              </div>
            </div>
            <footer className="flex flex-col gap-4 p-4 border-t border-gray-200">
              <div className="flex flex-row items-center justify-start gap-4">
                <span className=" text-lg font-bold">Tổng tiền:</span>
                <span className="text-red-600 font-bold">1.902.000.000 đ</span>
              </div>
              <div className="flex flex-row justify-between items-center gap-2">
                <motion.button
                  className="bg-gradient-to-r from-orange-600 to-blue-600 text-white text-sm font-semibold px-16 py-3 rounded-sm shadow-lg whitespace-nowrap cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{duration:0.3, ease:"easeInOut"}}
                >
                  XEM GIỎ HÀNG
                </motion.button>
                <motion.button
                  className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-semibold px-16 py-3 rounded-sm shadow-lg whitespace-nowrap cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{duration:0.3, ease:"easeInOut"}}

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
