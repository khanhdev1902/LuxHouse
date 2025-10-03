import BreadCrumb from "@/components/ui/BreadCrumb";
import Container from "@/components/ui/Container";
import { ChevronDown, Funnel } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/user/product/ProductCard";

const sampleProducts = [
  {
    id: 1,
    title: "Giường Ngủ Có Hộc & Ổ Điện MOHO VIENNA - MÀU TỰ NHIÊN",
    image_1:
      "https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_noi_that_moho_giuong_co_hoc_vienna_5_decd3dca185c4828a209e2b8d67d0dd7_master.jpg",
    image_2:
      "https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_noi_that_moho_giuong_co_hoc_vienna_3_fde1e700a3f34b32a9dfd75cfb9d92f0_master.jpg",
    price: 11990000,
    discount: 0.23,
    sold: 19,
    rating: 4.6,
    rating_users: 13,
  },

  {
    id: 2,
    title: "Nệm Đa Tầng EUFLEX AIR - Bảo Hành 15 Năm",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_nem_da_tang__4__a17dbef35e3e45d1a365600b42270095_master.png",
    image_2:
      "https://product.hstatic.net/200000065946/product/pro_nem_da_tang__3__d283c3484ed94a7da21a12713a963c4e_master.png",
    price: 8490000,
    discount: 0.29,
    sold: 88,
    rating: 5,
    rating_users: 68,
  },

  {
    id: 3,
    title: "Combo Phòng Khách MOHO VLINE Màu Nâu",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_sofa_nem_be_2_eabfa647bde04a0d9c3c11e7574598ac_master.jpg",
    image_2:
      "https://product.hstatic.net/200000065946/product/pro_sofa_nem_be_1m8_6c5ca285c4d74ecea7caf9136f531ab2_master.jpg",
    price: 26660000,
    discount: 0.21,
    sold: 9,
    rating: 4.8,
    rating_users: 8,
  },

  {
    id: 4,
    title: "Combo Cơ Bản 2 Món Phòng Ngủ MOHO DALUMD",
    image_1:
      "https://cdn.hstatic.net/products/200000065946/pro_combo_pn_1_san_pham_dalumd_f20d9b7126d14f0285fba0e7e45c2a68_master.jpg",
    image_2:
      "https://product.hstatic.net/200000065946/product/pro_combo_pn_1_noi_that_moho_combo_basic_phong_ngu_dalund_2_9a6909d65648456b93c67315786d4d01_master.jpg",
    price: 10190000,
    discount: 0.13,
    sold: 54,
    rating: 4.2,
    rating_users: 10,
  },

  {
    id: 5,
    title: "Combo Basic Phòng Khách 4 Món MOHO HOBRO",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_nau_noi_that_phong_khach_hobro_7_098ba6b79f634eae9d67a243e65b5924_master.png",
    image_2:
      "https://product.hstatic.net/200000065946/product/pro_nau_noi_that_phong_khach_hobro_2_c0db8b243fb8411e8092563568a0365d_master.png",
    price: 32360000,
    discount: 0.22,
    sold: 21,
    rating: 4.7,
    rating_users: 10,
  },

  {
    id: 6,
    title: "Ghế Sofa Vải MOHO GIORGIO - MOHO Signature hahhah ahaha ahhah",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_mau_tu_nhien_noi_that_moho_combo_giuong_moho_rander_2m4_15_2627ebc76a0a4c30a7fafcf61ba46124_master.jpg",
    image_2:
      "https://product.hstatic.net/200000065946/product/pro_mau_tu_nhien_noi_that_moho_combo_giuong_moho_rander_2m4_14_b9ee73f3457140e0bcc74675297fa4c6_master.jpg",
    price: 9990000,
    discount: 0.32,
    sold: 68,
    rating: 4.1,
    rating_users: 40,
  },

  {
    id: 7,
    title: "Combo Phòng Ngủ MOHO MOVA (Giường Có Hộc & Ổ Điện Và Tủ Quần Áo)",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_giuong_trang_1m8_3_f5dbcd414345473abe4a205a838fdfe5_master.jpg",
    image_2:
      "https://product.hstatic.net/200000065946/product/pro_giuong_trang_1m6_2_780130f27ac448eea8117482a40ece2b_master.jpg",
    price: 23980000,
    discount: 0.29,
    sold: 16,
    rating: 4.7,
    rating_users: 2,
  },

  {
    id: 8,
    title: "Ghế Sofa Vải MOHO GIORGIO - MOHO Signature hahhah ahaha ahhah",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_go_phoi_trang_noi_that_moho_tu_quan_ao_monza_1m6_3_84929cbf9d5b47659a296c88e585db92_master.jpg",
    image_2:
      "https://product.hstatic.net/200000065946/product/pro_go_phoi_trang_noi_that_moho_tu_quan_ao_monza_1m6_fd9c45d663084ef382ce044d39b5a88a_master.jpg",
    price: 11990000,
    discount: 0.29,
    sold: 36,
    rating: 4.3,
    rating_users: 11,
  },

  {
    id: 9,
    title: "Ghế Sofa Vải MOHO GIORGIO - MOHO Signature hahhah ahaha ahhah",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    image_2:
      "https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_noi_that_moho_giuong_co_hoc_vienna_88ba7274638540c0afc3a4d40860ced1_master.jpg",
    price: 12990000,
  },

  {
    id: 10,
    title: "Ghế Sofa Vải MOHO GIORGIO - MOHO Signature hahhah ahaha ahhah",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    image_2:
      "https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_noi_that_moho_giuong_co_hoc_vienna_88ba7274638540c0afc3a4d40860ced1_master.jpg",
    price: 12990000,
  },

  {
    id: 11,
    title: "Ghế Sofa Vải MOHO GIORGIO - MOHO Signature hahhah ahaha ahhah",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    image_2:
      "https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_noi_that_moho_giuong_co_hoc_vienna_88ba7274638540c0afc3a4d40860ced1_master.jpg",
    price: 12990000,
  },

  {
    id: 12,
    title: "Ghế Sofa Vải MOHO GIORGIO - MOHO Signature hahhah ahaha ahhah",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    image_2:
      "https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_noi_that_moho_giuong_co_hoc_vienna_88ba7274638540c0afc3a4d40860ced1_master.jpg",
    price: 12990000,
  },

  {
    id: 13,
    title: "Ghế Sofa Vải MOHO GIORGIO - MOHO Signature hahhah ahaha ahhah",
    image_1:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    image_2:
      "https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_noi_that_moho_giuong_co_hoc_vienna_88ba7274638540c0afc3a4d40860ced1_master.jpg",
    price: 12990000,
  },
];
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
      <Container className="flex flex-col gap-10">
        <nav className="flex flex-col gap-2">
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
                      className=" absolute z-30 top-full left-0 right-0 flex flex-col bg-white border border-gray-200 rounded-b-sm"
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
          {categories.length > 0 && (
            <div className="mt-2 text-sm text-gray-700">
              Đã chọn:{" "}
              {categories.length > 0 ? categories.join(", ") : "Chưa chọn gì"}
            </div>
          )}
        </nav>

        <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full h-auto">
          {sampleProducts.map((product, key) => (
            <ProductCard key={key} product={product} className="" />
          ))}
        </div>
      </Container>
    </>
  );
}
