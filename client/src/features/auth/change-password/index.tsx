import Container from "@/shared/components/ui/Container";
import { FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaKey, FaChevronLeft } from "react-icons/fa";
import { useState } from "react";

export default function ChangePassword() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-20 px-4 font-sans text-[#2D2D2D]">
      <Container className="max-w-5xl mx-auto">
        {/* Nút quay lại tinh tế */}
        <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-[#A6894B] transition-all mb-8 group">
          <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          Quay lại trang cá nhân
        </button>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Cột trái: Nội dung dẫn dắt */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-[#A6894B] text-xs font-bold uppercase tracking-[0.3em] block">
                Security Suite
              </span>
              <h1 className="text-5xl font-serif leading-tight">
                Bảo mật <br />
                <span className="italic font-light text-[#A6894B]">Không gian riêng</span>
              </h1>
              <div className="w-20 h-[2px] bg-[#A6894B]"></div>
            </div>

            <p className="text-gray-500 font-light leading-relaxed max-w-sm">
              Tại Luxhouse, sự riêng tư của bạn là ưu tiên hàng đầu. Hãy thiết lập một mật khẩu mạnh
              để bảo vệ thông tin cá nhân và các dự án thiết kế của bạn.
            </p>

            <div className="pt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-full border border-[#E8E2DA] flex items-center justify-center shrink-0 text-[#A6894B]">
                  <FaShieldAlt size={14} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold uppercase tracking-wider">Mã hóa 256-bit</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Dữ liệu của bạn được bảo mật theo tiêu chuẩn quốc tế.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải: Form Card */}
          <div className="lg:col-span-7 relative">
            {/* Thẻ Card Luxury */}
            <div className="bg-white border border-[#E8E2DA] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative z-10 backdrop-blur-sm">
              {/* Icon trang trí chìm phía sau */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <FaKey className="size-40 rotate-12" />
              </div>

              <form className="space-y-10">
                {/* Mật khẩu hiện tại */}
                <div className="relative group">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1 group-focus-within:text-[#A6894B] transition-colors">
                    Mật khẩu hiện tại
                  </label>
                  <div className="relative border-b border-[#E8E2DA] group-focus-within:border-[#A6894B] transition-all">
                    <input
                      type="password"
                      className="w-full py-4 bg-transparent outline-none text-sm tracking-[0.3em] placeholder:tracking-normal placeholder:text-gray-300"
                      placeholder="Nhập mật khẩu cũ"
                    />
                    <FaLock className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 size-3" />
                  </div>
                </div>

                {/* Mật khẩu mới */}
                <div className="relative group">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1 group-focus-within:text-[#A6894B] transition-colors">
                    Mật khẩu mới
                  </label>
                  <div className="relative border-b border-[#E8E2DA] group-focus-within:border-[#A6894B] transition-all">
                    <input
                      type={showPass ? "text" : "password"}
                      className="w-full py-4 bg-transparent outline-none text-sm tracking-[0.3em] placeholder:tracking-normal placeholder:text-gray-300"
                      placeholder="Tối thiểu 8 ký tự"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#A6894B] transition-colors"
                    >
                      {showPass ? (
                        <FaEye className="size-3.5" />
                      ) : (
                        <FaEyeSlash className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Xác nhận mật khẩu */}
                <div className="relative group">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1 group-focus-within:text-[#A6894B] transition-colors">
                    Xác nhận mật khẩu mới
                  </label>
                  <div className="relative border-b border-[#E8E2DA] group-focus-within:border-[#A6894B] transition-all">
                    <input
                      type="password"
                      className="w-full py-4 bg-transparent outline-none text-sm tracking-[0.3em] placeholder:tracking-normal placeholder:text-gray-300"
                      placeholder="Nhập lại mật khẩu mới"
                    />
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                  <button className="w-full sm:w-auto px-12 py-5 bg-[#2D2D2D] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#A6894B] transition-all duration-500 shadow-2xl active:scale-[0.98]">
                    Cập nhật ngay
                  </button>
                  <button
                    type="button"
                    className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#2D2D2D] font-bold transition-colors"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              </form>
            </div>

            {/* Phụ kiện trang trí: Khung viền gold lệch (Backdrop trang trí) */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#A6894B]/20 -z-10 pointer-events-none hidden sm:block"></div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-20 flex justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-[11px] font-light tracking-wide italic">
              Cần hỗ trợ? Liên hệ bộ phận quản lý tài sản Luxhouse:
              <span className="text-[#A6894B] ml-2 font-medium not-italic cursor-pointer hover:underline underline-offset-4 transition-all">
                1900 LUXHOUSE
              </span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
