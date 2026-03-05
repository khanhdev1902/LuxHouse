import Container from "@/shared/components/ui/Container";
import { motion } from "framer-motion";
import {
  RiLuggageCartFill,
  RiRefund2Line,
  RiFacebookFill,
  RiInstagramLine,
  RiYoutubeFill,
} from "react-icons/ri";
import { TbShieldCheck } from "react-icons/tb";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

export default function Footer() {
  const services = [
    {
      name: "Giao Hàng & Lắp Đặt",
      desc: "Miễn phí vận chuyển",
      logo: <RiLuggageCartFill />,
    },
    {
      name: "Đổi Trả 1 - 1",
      desc: "Trong vòng 7 ngày",
      logo: <RiRefund2Line />,
    },
    {
      name: "Bảo Hành Đến 5 Năm",
      desc: "Hậu mãi tận tâm",
      logo: <TbShieldCheck />,
    },
    {
      name: "Tư Vấn Thiết Kế",
      desc: "Chuyên gia từ Luxhouse",
      logo: <LiaPhoneVolumeSolid />,
    },
  ];

  const footerLinks = [
    {
      title: "VỀ LUXHOUSE",
      links: ["Câu chuyện thương hiệu", "Showroom", "Tuyển dụng", "Liên hệ"],
    },
    {
      title: "CHÍNH SÁCH",
      links: ["Chính sách bán hàng", "Giao hàng & Lắp đặt", "Bảo hành & Bảo trì", "Đổi trả hàng"],
    },
  ];

  return (
    <footer className="bg-white">
      {/* Section 1: Services */}
      <div className="border-t border-b border-gray-100">
        <Container className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-100">
          {services.map((item, key) => (
            <motion.div
              key={key}
              className="group flex flex-col items-center justify-center p-10 border-r border-b border-gray-100 bg-white cursor-pointer relative overflow-hidden"
              whileHover={{ backgroundColor: "#f9fafb" }} // Hover nhẹ nhàng
              transition={{ duration: 0.2 }}
            >
              <motion.div className="text-4xl text-gray-700 mb-4 group-hover:scale-110 group-hover:text-black transition-all duration-300">
                {item.logo}
              </motion.div>

              <span className="text-gray-900 font-semibold text-sm tracking-widest uppercase text-center">
                {item.name}
              </span>
              <span className="text-gray-400 font-light text-xs mt-1 uppercase tracking-tighter">
                {item.desc}
              </span>
            </motion.div>
          ))}
        </Container>
      </div>

      {/* Section 2: Main Footer */}
      <div className="bg-[#111111] text-gray-400 py-20">
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Info */}
          <div className="space-y-8">
            <h2 className="text-white text-2xl font-bold tracking-[0.2em]">LUXHOUSE</h2>
            <p className="text-sm leading-[1.8] font-light">
              Nội Thất Luxhouse tự hào với gần 40 năm tinh hoa chế tác, mang không gian sống thượng
              lưu đến từng ngôi nhà Việt.
            </p>
            <div className="flex gap-5">
              {[RiFacebookFill, RiInstagramLine, RiYoutubeFill].map((Icon, i) => (
                <Icon
                  key={i}
                  className="text-xl hover:text-white cursor-pointer transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-8">
              <h4 className="text-white text-[12px] font-bold tracking-[0.2em] uppercase">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm hover:text-white hover:translate-x-2 transition-all duration-300 inline-block font-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Fanpage Section */}
          <div className="space-y-8">
            <h4 className="text-white text-[12px] font-bold tracking-[0.2em] uppercase">
              KẾT NỐI VỚI CHÚNG TÔI
            </h4>
            <div className="relative group overflow-hidden rounded-sm cursor-pointer">
              <img
                src="https://product.hstatic.net/200000065946/product/pro_trang_noi_that_moho_giuong_co_hoc_vienna_1m6_1_ede5117be7cd4ad3a745fedd914a67bc_master.jpg"
                alt="Fanpage"
                className="w-full h-40 object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/10 backdrop-blur-md px-4 py-2 text-[10px] text-white border border-white/20 tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                  FACEBOOK
                </span>
              </div>
            </div>
            <div className="space-y-2 text-[13px] font-light">
              <p className="flex items-center gap-3">
                <HiOutlinePhone className="text-lg" /> 097 114 1140
              </p>
              <p className="flex items-center gap-3">
                <HiOutlineMail className="text-lg" /> cskh@luxhouse.com.vn
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Section 3: Bottom Bar */}
      <div className="bg-black py-8 border-t border-white/5">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-gray-600">
          <span>Copyright © 2026 Luxhouse. Designed by Khanh Deddo</span>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
