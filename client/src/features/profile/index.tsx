// import { user } from "@/shared/constant/const-home";
import { FaCamera, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCrown, FaEdit } from "react-icons/fa";
import { useCurrentUser } from "../auth/hooks/useCurrentUser";

export default function Profile() {
  const { data: user } = useCurrentUser();
  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#4A4A4A] font-sans antialiased p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header Section - Elegant & Airy */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E2DA] overflow-hidden mb-8">
          <div className="h-40 w-full bg-[#E8E2DA] relative">
            {/* Họa tiết chìm nhẹ nhàng */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>

          <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              <div className="relative group">
                <div className="p-1.5 bg-white rounded-full shadow-md">
                  <img
                    src={
                      user?.avata ??
                      "https://i.pinimg.com/736x/93/32/34/93323410b61d9f272cdfba2c0c361d32.jpg"
                    }
                    className="size-32 rounded-full object-cover border border-gray-100"
                    alt="avatar"
                  />
                </div>
                <button className="absolute bottom-1 right-1 p-2 bg-[#C5A25D] text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                  <FaCamera className="size-3" />
                </button>
              </div>

              <div className="flex-1 text-center md:text-left mb-2">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h2 className="text-2xl font-light tracking-tight text-[#2D2D2D]">
                    {user?.name} <span className="font-semibold">{user?.lastName}</span>
                  </h2>
                  <span className="flex items-center gap-1 bg-[#F4EFE6] text-[#A6894B] px-2 py-0.5 rounded text-[10px] uppercase tracking-tighter font-bold border border-[#E8E2DA]">
                    <FaCrown className="size-2" /> Thành viên Gold
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-1 tracking-wide">Mã khách hàng: #LUX-2024</p>
              </div>

              <button className="mb-2 px-6 py-2 border border-[#C5A25D] text-[#C5A25D] text-xs font-bold uppercase tracking-widest hover:bg-[#C5A25D] hover:text-white transition-all">
                Hạng thẻ
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar: Liên hệ */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl border border-[#E8E2DA] shadow-sm">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#A6894B] mb-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#A6894B]"></span> Thông tin
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="size-8 flex items-center justify-center rounded-full bg-[#F8F5F2] text-[#A6894B]">
                    <FaEnvelope className="size-3" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] uppercase text-gray-400 font-bold tracking-tighter">
                      Email
                    </p>
                    <p className="text-sm truncate">{user?.email || "khachhang@luxhouse.vn"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-8 flex items-center justify-center rounded-full bg-[#F8F5F2] text-[#A6894B]">
                    <FaPhone className="size-3" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase text-gray-400 font-bold tracking-tighter">
                      Hotline riêng
                    </p>
                    <p className="text-sm">{user?.phone || "••• ••• •••"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-8 flex items-center justify-center rounded-full bg-[#F8F5F2] text-[#A6894B]">
                    <FaMapMarkerAlt className="size-3" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase text-gray-400 font-bold tracking-tighter">
                      Khu vực
                    </p>
                    <p className="text-sm">Thảo Điền, Quận 2</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF9F7] p-6 rounded-xl border-l-4 border-[#C5A25D]">
              <p className="text-[11px] leading-relaxed text-[#7A7A7A] italic">
                "Không gian sống là tấm gương phản chiếu tâm hồn của gia chủ."
              </p>
            </div>
          </div>

          {/* Main: Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border border-[#E8E2DA] shadow-sm">
              <div className="px-8 py-6 border-b border-[#F8F5F2]">
                <h3 className="text-lg text-[#2D2D2D] flex items-center gap-2">
                  <FaEdit className="size-4 text-[#C5A25D]" /> Cập nhật hồ sơ
                </h3>
              </div>

              <div className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">
                        Họ và tên đệm
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-0 py-2 bg-transparent border-b border-[#E8E2DA] focus:border-[#C5A25D] outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="group">
                      <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">
                        Tên
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.lastName}
                        className="w-full px-0 py-2 bg-transparent border-b border-[#E8E2DA] focus:border-[#C5A25D] outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">
                      Phong cách yêu thích
                    </label>
                    <select className="w-full px-0 py-2 bg-transparent border-b border-[#E8E2DA] focus:border-[#C5A25D] outline-none transition-all text-sm appearance-none cursor-pointer">
                      <option>Modern Luxury</option>
                      <option>Neo Classic (Tân cổ điển)</option>
                      <option>Wabi Sabi</option>
                      <option>Contemporary</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">
                      Ghi chú yêu cầu riêng
                    </label>
                    <textarea
                      placeholder="Ghi chú về diện tích căn hộ hoặc yêu cầu thiết kế..."
                      className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#E8E2DA] rounded focus:ring-1 focus:ring-[#C5A25D] outline-none transition-all text-sm min-h-[100px]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="flex-1 py-3.5 bg-[#2D2D2D] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#444] transition-all">
                      Xác nhận thay đổi
                    </button>
                    <button className="flex-1 py-3.5 border border-[#E8E2DA] text-gray-500 text-[11px] uppercase tracking-[0.2em] hover:bg-gray-50 transition-all">
                      Hủy thao tác
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
