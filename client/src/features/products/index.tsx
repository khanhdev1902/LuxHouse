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
import { BrushCleaning, Check, X } from "lucide-react";
import { Breadcrumbs } from "@/shared/components/ui/BreadCrumb";

type productDataFilterType = {
  title: "Danh mục" | "Giá sản phẩm" | "Màu sắc" | "Kích thước";
  option: { name: string; value: string }[] | [];
}[];

export default function Products() {
  const { value: isOpen, on, off } = useToggle();
  const [indexActive, setIndexActive] = useState<number>(0);
  const [params, setParams] = useSearchParams();
  const search = params.get("search") || "";
  const [dataFilter, setDataFilter] = useState<ProductQuery>({ search });
  const { data: products = [], isLoading } = useProducts(dataFilter);
  const { data: lstCategories = [] } = useCategory();

  const [categories, setCategories] = React.useState<string[]>([]);
  const [prices, setPrices] = React.useState<string[]>([]);
  const [colors, setColors] = React.useState<string[]>([]);
  const [sizes, setSizes] = React.useState<string[]>([]);

  const [prodcutDataFilters, setProductDataFilters] = useState<productDataFilterType>([
    {
      title: "Danh mục",
      option: [],
    },
    {
      title: "Giá sản phẩm",
      option: [
        { name: "Dưới 500.000đ", value: "0-500000" },
        { name: "500.000đ - 2000.000đ", value: "500000-2000000" },
        { name: "2.000.000đ - 5.000.000đ", value: "2000000-5000000" },
        { name: "5.000.000đ - 10.000.000đ", value: "5000000-10000000" },
        { name: "10.000.000đ - 20.000.000đ", value: "10000000-20000000" },
        { name: "Trên 20.000.000đ", value: "20000000-100000000" },
      ],
    },
    {
      title: "Màu sắc",
      option: [
        { name: "#d2af84", value: "Màu Tự Nhiên" },
        { name: "#644335", value: "Nâu" },
        { name: "#F1E2C2", value: "Mix" },
        { name: "#FFFFFF", value: "Trắng" },
        { name: "#F1E2C2", value: "Gỗ Phối Trắng" },
        { name: "#ECE3DD", value: "Be" },
        { name: "#008B8B", value: "Đá Xanh" },
        { name: "#000000", value: "Đen" },
        { name: "#3D5229", value: "Đậu Cobe" },
        { name: "#FFFF00", value: "Vàng" },
        { name: "#B8860B", value: "Đồng" },
        { name: "#B76E79", value: "Vàng Hồng" },
        { name: "#C0C0C0", value: "Bạc" },
        { name: "#708090", value: "Xám Đá" },
        { name: "#808080", value: "Ghi" },
        { name: "#ADD8E6", value: "Xanh Nhạt" },
        { name: "#D2691E", value: "Cam Đất" },
        { name: "#A52A2A", value: "Da Đậm" },
        { name: "#FFC0CB", value: "Dâu Lợt" },
        { name: "#FFB6C1", value: "Hồng Phấn" },
      ],
    },
    {
      title: "Kích thước",
      option: [
        { name: "90cm", value: "90cm" },
        { name: "1m2", value: "1m2" },
        { name: "1m4", value: "1m4" },
        { name: "1m6", value: "1m6" },
        { name: "1m8", value: "1m8" },
      ],
    },
  ]);
  useEffect(() => {
    if (lstCategories.length > 0) {
      setProductDataFilters((prevFilters) => {
        // Tạo bản sao của mảng cũ
        const newFilters = [...prevFilters];

        // Cập nhật phần tử đầu tiên (Danh mục)
        newFilters[0] = {
          ...newFilters[0],
          option: lstCategories.map((c) => ({ name: c.name, value: c.slug })),
        };

        return newFilters;
      });
    }
  }, [lstCategories]);

  const handleChange = (title: productDataFilterType[number]["title"], value: string) => {
    if (title === "Danh mục") {
      setCategories((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }

    if (title === "Giá sản phẩm") {
      setPrices((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }

    if (title === "Màu sắc") {
      setColors((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }

    if (title === "Kích thước") {
      setSizes((prev) =>
        prev.includes(value) ? prev.filter((item) => item != value) : [...prev, value]
      );
    }
  };

  const checked = (title: productDataFilterType[number]["title"], value: string) => {
    if (title === "Danh mục" && categories.includes(value)) return true;
    if (title === "Giá sản phẩm" && prices.includes(value)) return true;
    if (title === "Màu sắc" && colors.includes(value)) return true;
    if (title === "Kích thước" && sizes.includes(value)) return true;
    return false;
  };

  useEffect(() => {
    window.scrollTo({
      top: 390,
      behavior: "smooth",
    });
    setDataFilter((prev) => ({
      ...prev,
      search,
      categories: categories.join(", "),
      prices: prices.join(", "),
      colors: colors.join(", "),
      sizes: sizes.join(", "),
    }));
  }, [categories, search, prices, colors, sizes]);

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

            <select
              id="category"
              name="category"
              className=" bottom-1 border-gray-100 p-1 px-3 text-sm font-medium"
            >
              <option value="">Sản phẩm nổi bật</option>
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
              {prodcutDataFilters.map((item, key) => (
                <motion.div
                  key={key}
                  className="relative flex flex-row cursor-pointer justify-between items-center gap-32 border border-gray-300 p-3 select-none"
                  onHoverStart={() => {
                    (on(), setIndexActive(key + 1));
                  }}
                  onHoverEnd={() => {
                    (off(), setIndexActive(0));
                  }}
                >
                  <span className="text-sm font-medium uppercase">{item.title}</span>
                  <BsChevronDown className="size-4" />
                  {isOpen && indexActive === key + 1 && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className=" absolute z-30 top-full left-0 right-0 flex flex-col bg-white border border-gray-200 rounded-b-sm"
                      >
                        {item.title === "Màu sắc" ? (
                          <div className=" grid grid-cols-5 gap-2 p-3 cursor-auto">
                            {item.option.map((opt, key) => (
                              <div
                                key={key}
                                className=" relative size-8 rounded-full cursor-pointer text-center border"
                                style={{ background: `${opt.name}` }}
                                onClick={() => handleChange(item.title, opt.value)}
                              >
                                {checked(item.title, opt.value) && (
                                  <Check className="absolute inset-0 m-auto text-white size-4 shadow-sm" />
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          item.option.map((opt, key) => (
                            <label
                              key={key}
                              className=" relative text-sm font-light flex flex-row gap-2 cursor-pointer px-3 py-2 hover:bg-slate-100"
                            >
                              <input
                                type="checkbox"
                                checked={checked(item.title, opt.value)}
                                onChange={() => handleChange(item.title, opt.value)}
                                className="outline-none border-none size-4"
                              />

                              {opt.name}
                            </label>
                          ))
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </motion.div>
              ))}
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
          <div className="flex items-center gap-2 flex-wrap mt-2 text-sm text-gray-700">
            {categories.length > 0 && (
              <div className="flex items-center gap-2 border rounded-full w-fit px-3 py-1">
                <span className="font-medium">{"Danh mục:"}</span>
                <div className="">
                  {categories.length > 0 ? categories.join(", ") : "Chưa chọn gì"}
                </div>
                <X
                  onClick={() => setCategories([])}
                  className="size-5 cursor-pointer font-bold hover:rotate-180 duration-500 hover:scale-110 hover:text-red-600"
                />
              </div>
            )}
            {prices.length > 0 && (
              <div className="flex items-center gap-2 border rounded-full w-fit px-3 py-1">
                <span className="font-medium">{"Giá sản phẩm:"}</span>
                <div className="">{prices.length > 0 ? prices.join(", ") : "Chưa chọn gì"}</div>
                <X
                  onClick={() => setPrices([])}
                  className="size-5 cursor-pointer font-bold hover:rotate-180 duration-500 hover:scale-110 hover:text-red-600"
                />
              </div>
            )}
            {colors.length > 0 && (
              <div className="flex items-center gap-2 border rounded-full w-fit px-3 py-1">
                <span className="font-medium">{"Màu sắc:"}</span>
                <div className="">{colors.length > 0 ? colors.join(", ") : "Chưa chọn gì"}</div>
                <X
                  onClick={() => setColors([])}
                  className="size-5 cursor-pointer font-bold hover:rotate-180 duration-500 hover:scale-110 hover:text-red-600"
                />
              </div>
            )}
            {sizes.length > 0 && (
              <div className="flex items-center gap-2 border rounded-full w-fit px-3 py-1">
                <span className="font-medium">{"Kích thước:"}</span>
                <div className="">{sizes.length > 0 ? sizes.join(", ") : "Chưa chọn gì"}</div>
                <X
                  onClick={() => setSizes([])}
                  className="size-5 cursor-pointer font-bold hover:rotate-180 duration-500 hover:scale-110 hover:text-red-600"
                />
              </div>
            )}
            {[categories.length > 0, prices.length > 0, colors.length > 0, sizes.length > 0].filter(
              Boolean
            ).length >= 2 && (
              <button
                onClick={() => {
                  setCategories([]);
                  setPrices([]);
                  setColors([]);
                  setSizes([]);
                }}
                className=" flex gap-1 items-start border-b px-1 border-gray-400 text-gray-600 hover:text-red-500 hover:scale-105 duration-300 hover:border-red-300"
              >
                <BrushCleaning size={15} />
                Xóa hết
              </button>
            )}
          </div>
        </nav>

        {isLoading ? (
          <Loading />
        ) : products.length < 1 ? (
          <div className="py-3 font-medium text-gray-600">Không tìm thấy sản phẩm nào phù hợp!</div>
        ) : (
          <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full h-auto">
            {products.map((product, key) => (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <ProductCard key={key} product={product} className="" />
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
