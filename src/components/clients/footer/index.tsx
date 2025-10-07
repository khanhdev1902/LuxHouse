import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { RiLuggageCartFill } from "react-icons/ri";
import { RiRefund2Line } from "react-icons/ri";
import { TbShieldCheck } from "react-icons/tb";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
export default function Footer() {
  const labelTitle = [
    {
      name: "Giao Hàng & Lắp Đặt",
      logo: <RiLuggageCartFill className="size-12 text-gray-800" />,
    },
    {
      name: "Đổi Trả 1 - 1",
      logo: <RiRefund2Line className="size-12 text-gray-800" />,
    },
    {
      name: "Bảo Hành Đến 5 Năm",
      logo: <TbShieldCheck className="size-12 text-gray-800" />,
    },
    {
      name: "Tư Vấn Thiết Kế",
      logo: <LiaPhoneVolumeSolid className="size-12 text-gray-800" />,
    },
  ];
  return (
    <footer className="pt-20 space-y-20">
      <Container className="grid grid-cols-2 lg:grid-cols-4">
        {labelTitle.map((item, key) => (
          <motion.div
            key={key}
            className="border w-full flex flex-col justify-center items-center p-12 cursor-pointer bg-white gap-3"
            initial="initial"
            whileHover="hovered"
            variants={{
              initial: { opacity: 0.95 },
              hovered: {
                backgroundColor: "#f4f4f7",
                opacity: 1,
                transition: { duration: 0.3, ease: "easeInOut" },
              },
            }}
          >
            {item.logo}
            <motion.span
              className="text-[#434343] font-medium text-lg text-center"
              variants={{
                hovered: {
                  scale: 1.1,
                  color: "#000000",
                  transition: { duration: 0.3, ease: "easeInOut" },
                },
              }}
            >
              {item.name}
            </motion.span>
            <span className="text-[#777777] font-light text-sm">Miễn Phí</span>
          </motion.div>
        ))}
      </Container>

      <div className="bg-[#F8F8F8] py-5">
        <Container className="grid grid-cols-4 gap-10">
          <div className=" space-y-2">
            <span className="text-lg font-semibold">NỘI THẤT ZORO</span>
            <p className="text-gray-700">
              Nội Thất ZORO là thương hiệu đến từ Savimex với gần 40 năm kinh
              nghiệm trong việc sản xuất và xuất khẩu nội thất đạt chuẩn quốc
              tế.
            </p>
            <img
              src="https://theme.hstatic.net/200000065946/1001264503/14/logo_bct.png?v=1272"
              alt="image"
              className=" h-16 w-auto"
            />
          </div>
          <div className=" space-y-2">
            <span className="text-lg font-semibold">THÔNG TIN</span>
            <div className="text-gray-700">
              Chính Sách Bán Hàng Chính Sách Giao Hàng & Lắp Đặt Chính Sách Bảo
              Hành & Bảo Trì Chính Sách Đổi Trả Khách Hàng Thân Thiết – ZORO
              <br />
              Chính Sách Đối Tác Bán Hàng
            </div>
          </div>
          <div className=" space-y-2">
            <span className="text-lg font-semibold">THÔNG TIN LIÊN HỆ</span>
            <div className="text-gray-700">
              [Trụ sở chính]
              <br />
              162 HT17, P. Hiệp Thành, Q. 12, TP. HCM (Nằm trong khuôn viên công
              ty SAVIMEX phía sau bến xe buýt Hiệp Thành) <br />
              Hotline: 0971141140 <br /> <br />
              097 114 1140 (Hotline/Zalo) <br />
              0902 415 359 (Đội Giao Hàng) <br />
              <br />
              cskh@moho.com.vn <br /> <br />
              Công Ty Cổ Phần Hợp Tác Kinh Tế Và Xuất Nhập Khẩu Savimex - STK:
              0071001303667 - Vietcombank CN HCM
            </div>
          </div>
          <div className=" space-y-2">
            <span className="text-lg font-semibold">FANPAGE</span>
            <img
              src="https://product.hstatic.net/200000065946/product/pro_trang_noi_that_moho_giuong_co_hoc_vienna_1m6_1_ede5117be7cd4ad3a745fedd914a67bc_master.jpg"
              alt="image"
              className="w-80 h-40 object-cover rounded-sm"
            />
          </div>
        </Container>

        <div className="bg-black mb-5 flex flex-row items-center justify-center p-5 text-white text-sm">
          <span>Copyright © 2025 Khanh Deddo</span>
        </div>
      </div>
    </footer>
  );
}
