import { IoSettings } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa6";

export const navbarHeaders = [
  {
    title: "Sản phẩm",
    submenu: [
      "Bộ sưu tập",
      "Phòng ngủ",
      "Phòng khách",
      "Phòng ăn",
      "Phòng làm việc",
    ],
  },
  { title: "Khuyến mãi", submenu: ["Khuyến mãi hè", "Mã khuyến mãi"] },
  { title: "Tin tức", submenu: ["Bài viết", "Mọi người", "Mạng xã hội"] },
  { title: "Liên hệ hợp tác", submenu: [] },
  { title: "Về ZORO", submenu: [] },
  { title: "Cửa hàng", submenu: [] },
];

export const dataTestProducts = [
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

export const allCategorieProducts = [
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

export const dataDropdownAccount = [
  {
    path: "/account",
    icon: <RiAccountCircleFill className=" size-6 text-[#434343]" />,
    name: "Tài khoản của tôi",
  },
  {
    path: "/account/addresses",
    icon: <FaAddressBook className="size-6 text-[#434343]" />,
    name: "Danh sách địa chỉ",
  },
  {
    path: "/account/orders",
    icon: <AiFillProduct className="size-6 text-[#434343]" />,
    name: "Đơn hàng của tôi",
  },
  {
    path: "/account/vouchers",
    icon: <MdDiscount className="size-6 text-[#434343]" />,
    name: "Mã giảm giá của tôi",
  },
  {
    path: "/account/setting",
    icon: <IoSettings className="size-6 text-[#434343]" />,
    name: "Cài đặt",
  },
  {
    path: "",
    icon: <TbLogout className="size-6 text-[#434343]" />,
    name: "Đăng xuất",
  },
];

const images = import.meta.glob("@/assets/slideshow_desktop/*.jpg", { eager: true });
const images_mb = import.meta.glob("@/assets/slideshow_mobile/*.jpg", { eager: true });
export const slideShowDesktop = Object.values(images).map((m: any) => m.default);
export const slideShowMObile = Object.values(images_mb).map((m: any) => m.default);

