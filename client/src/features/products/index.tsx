import Container from "@/shared/components/ui/Container";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/features/products/components/ProductCard";
import useToggle from "@/shared/hooks/useToggle";
import { BsChevronDown, BsFunnel } from "react-icons/bs";
import { useProducts } from "@/features/products/hooks/useProducts";
import Loading from "@/shared/components/ui/Loading";
import type { ProductQuery } from "./types/productQuery.type";
import { useSearchParams } from "react-router-dom";
import { useCategory } from "./hooks/useCategory";
import { X } from "lucide-react";
import { Breadcrumbs } from "@/shared/components/ui/BreadCrumb";

export default function Products() {
  const { value: isOpen, on, off } = useToggle();
  const [params, setParams] = useSearchParams();
  const search = params.get("search") || "";
  const [dataFilter, setDataFilter] = useState<ProductQuery>({ search });
  const { data: products = [], isLoading } = useProducts(dataFilter);
  const { data: lstCategories = [] } = useCategory();
  const [categories, setCategories] = React.useState<string[]>([]);

  const handleChange = (value: string) => {
    setCategories(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // bỏ nếu đã có
          : [...prev, value] // thêm nếu chưa có
    );
    off();
  };
  useEffect(() => {
    window.scrollTo({
      top: 350,
      behavior: "smooth",
    });
    setDataFilter((prev) => ({ ...prev, search, categories: categories.join(", ") }));
  }, [categories, search]);
  console.log("categories", categories);
  console.log("datafilter: ", dataFilter);
  console.log(categories);

  const handleDeleteSearch = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete("search");
    setParams(newParams);
  };

  return (
    <>
      <Breadcrumbs />
      <div className="w-full h-auto">
        <img src="/bg-products.jpg" alt="" className="w-full" />
      </div>
      <Container className="flex flex-col gap-10">
        <nav className="flex flex-col gap-2">
          <div className=" flex flex-row justify-between my-4">
            <span className="text-3xl font-bold">Tất cả sản phẩm</span>

            <select id="category" name="category" className=" bottom-1 border-gray-100 p-1 px-3">
              <option value="">--Sản phẩm nổi bật--</option>
              <option value="Increasing">Giá: Tăng dần</option>
              <option value="Decreasing">Giá: Giảm dần</option>
              <option value="Latest">Mới nhất</option>
              <option value="Oldest">Cũ nhất</option>
            </select>
          </div>

          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row gap-2 items-center">
              <BsFunnel className=" text-gray-500 size-5" />
              <span className=" text-lg font-medium whitespace-nowrap">BỘ LỌC</span>
            </div>
            <div className="px-4">|</div>
            <div className="w-full flex flex-row justify-between">
              <motion.div
                className="relative flex flex-row justify-between items-center gap-32 border border-gray-300 p-3 cursor-pointer select-none"
                onHoverStart={on}
                onHoverEnd={off}
              >
                <span className="text-sm font-medium">DANH MỤC</span>
                <BsChevronDown className="size-4" />
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
                      className=" absolute z-30 top-full left-0 right-0 flex flex-col bg-white border border-gray-200 rounded-b-sm"
                    >
                      {lstCategories.map((category, key) => (
                        <label
                          key={key}
                          className=" text-sm font-light flex flex-row gap-2 cursor-pointer px-3 py-2 hover:bg-slate-100"
                        >
                          <input
                            type="checkbox"
                            checked={categories.includes(category.slug)}
                            onChange={() => handleChange(category.slug)}
                            className="outline-none border-none size-4"
                          />
                          {category.name}
                        </label>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
              <div className="relative flex flex-row justify-between items-center gap-32 border border-gray-300 p-3">
                <span className="text-sm font-medium ">GIÁ SẢN PHẨM</span>
                <BsChevronDown className="size-4" />
              </div>
              <div className="relative flex flex-row justify-between items-center gap-32 border border-gray-300 p-3">
                <span className="text-sm font-medium ">MÀU SẮC</span>
                <BsChevronDown className="size-4" />
              </div>
              <div className="relative flex flex-row justify-between items-center gap-32 border border-gray-300 p-3">
                <span className="text-sm font-medium ">KÍCH THƯỚC</span>
                <BsChevronDown className="size-4" />
              </div>
            </div>
          </div>
          {search && (
            <div className=" flex items-center gap-2 py-2 text-gray-700">
              <span>Kết quả tìm kiếm cho</span>
              <span className=" font-bold">{`"${search}"`}</span>
              <X
                onClick={handleDeleteSearch}
                className="size-5 cursor-pointer font-bold hover:rotate-180 duration-500 hover:scale-110 hover:text-red-600"
              />
            </div>
          )}
          {categories.length > 0 && (
            <div className="mt-2 text-sm text-gray-700 flex items-center gap-2 border rounded-full w-fit px-3 py-1">
              <span className=" uppercase font-semibold text-sm">{"Danh mục:"}</span>
              <div className=" font-medium">
                {categories.length > 0 ? categories.join(", ") : "Chưa chọn gì"}
              </div>
              <X
                onClick={() => setCategories([])}
                className="size-5 cursor-pointer font-bold hover:rotate-180 duration-500 hover:scale-110 hover:text-red-600"
              />
            </div>
          )}
        </nav>

        {isLoading ? (
          <Loading />
        ) : products.length < 1 ? (
          <div className="pt-10 pl-10"> Không tìm thấy sản phẩm !</div>
        ) : (
          <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full h-auto">
            {products.map((product, key) => (
              <ProductCard key={key} product={product} className="" />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
