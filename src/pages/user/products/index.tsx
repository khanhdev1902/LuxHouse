import BreadCrumb from "@/components/ui/BreadCrumb";
import Container from "@/components/ui/Container";
import { ChevronDown, Funnel } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Products() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const allCategories = [
    { name: "Bếp" },
    { name: "Chăn Ga - Gối Nệm" },
    { name: "Bình - Chậu - Lọ" },
    { name: "Tủ Quần Áo" },
    { name: "Tranh Treo Tường" },
    { name: "Giường Ngủ" },
    { name: "Ghế Sofa" },
    { name: "Ghế Ăn" },
    { name: "Bàn Ăn" },
    { name: "Đồ Nhà Bếp" },
    { name: "Gương" },
    { name: "Thảm" },
    { name: "Bếp" },
    { name: "Tủ Kệ Tivi" },
    { name: "Combo Basic" },
    { name: "Vạn Thành" },
    { name: "Full Combo" },
  ];

  const handleChange = (value: string) => {
    setCategories(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // bỏ nếu đã có
          : [...prev, value] // thêm nếu chưa có
    );
  };
  return (
    <>
      <BreadCrumb />
      <div className="w-full h-auto">
        <img src="/bg-products.jpg" alt="" className="w-full" />
      </div>
      <Container>
        <nav>
          <div className=" flex flex-row justify-between my-4">
            <span className="text-3xl font-bold">Tất cả sản phẩm</span>

            <select
              id="category"
              name="category"
              className=" bottom-1 border-gray-100 p-1 px-3"
            >
              <option value="">--Sản phẩm nổi bật--</option>
              <option value="Increasing">Giá: Tăng dần</option>
              <option value="Decreasing">Giá: Giảm dần</option>
              <option value="Latest">Mới nhất</option>
              <option value="Oldest">Cũ nhất</option>
            </select>
          </div>

          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row gap-2 items-center">
              <Funnel className=" text-gray-500 size-5" />
              <span className=" text-lg font-medium whitespace-nowrap">
                BỘ LỌC
              </span>
            </div>
            <div className="px-4">|</div>
            <div className="w-full flex flex-row justify-between">
              <motion.div
                className="relative flex flex-row justify-between items-center gap-32 border border-gray-300 p-3 cursor-pointer select-none"
                onHoverStart={() => setIsOpen(true)}
                onHoverEnd={() => setIsOpen(false)}
              >
                <span className="text-sm font-medium">DANH MỤC</span>
                <ChevronDown className="size-4" />
                {isOpen && (
                  <AnimatePresence>
                    <motion.div
                      // initial={{ scaleY: 0, opacity: 0, originY: 0 }}
                      // animate={{ scaleY: 1, opacity: 1, originY: 0 }}
                      // exit={{ scaleY: 0, opacity: 0, originY: 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className=" absolute z-10 top-full left-0 right-0 flex flex-col bg-white border border-gray-200 rounded-b-sm"
                    >
                      {allCategories.map((item, key) => (
                        <label
                          key={key}
                          className=" text-sm font-light flex flex-row gap-2 cursor-pointer px-3 py-2 hover:bg-slate-100"
                        >
                          <input
                            type="checkbox"
                            checked={categories.includes(item.name)}
                            onChange={() => handleChange(item.name)}
                            className="outline-none border-none size-4"
                          />
                          {item.name}
                        </label>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
              <div className="relative flex flex-row justify-between items-center gap-32 border border-gray-300 p-3">
                <span className="text-sm font-medium ">GIÁ SẢN PHẨM</span>
                <ChevronDown className="size-4" />
              </div>
              <div className="relative flex flex-row justify-between items-center gap-32 border border-gray-300 p-3">
                <span className="text-sm font-medium ">MÀU SẮC</span>
                <ChevronDown className="size-4" />
              </div>
              <div className="relative flex flex-row justify-between items-center gap-32 border border-gray-300 p-3">
                <span className="text-sm font-medium ">KÍCH THƯỚC</span>
                <ChevronDown className="size-4" />
              </div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-700">
            Đã chọn:{" "}
            {categories.length > 0 ? categories.join(", ") : "Chưa chọn gì"}
          </div>
        </nav>
      </Container>
    </>
  );
}
