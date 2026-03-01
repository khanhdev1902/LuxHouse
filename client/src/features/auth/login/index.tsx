import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { useLogin } from "../hooks/useLogin";
import type { LoginRequest } from "../types/login-request.type";

export default function Login() {
  const brandColor = "#C05621";
  const darkStone = "#1C1917";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [focused, setFocused] = useState("");
  const { mutate, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: LoginRequest = { email: email, password: pass };
    console.log("called handleSubmit", `isPending: ${isPending}`);
    mutate(formData);
    console.log("called handleSubmit", `Error: ${error}`);
    console.log("called handleSubmit", `isPending: ${isPending}`);
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-[#FDFCFB] relative overflow-hidden px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background Decor - Nhẹ nhàng hơn */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[30%] h-[40%] opacity-10 rounded-full blur-[100px]"
        style={{ backgroundColor: brandColor }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[1000px] max-h-[90vh] flex bg-white rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden border border-stone-100"
      >
        {/* Left Side: Art - Tỉ lệ 45% để form rộng rãi */}
        <div className="hidden lg:block w-[45%] relative group">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
            alt="Interior"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[1px] bg-white opacity-50" />
              <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-stone-200">
                LuxHouse Studio
              </h2>
            </div>

            <div className="space-y-3">
              <h3
                className="text-4xl leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              >
                Kiến tạo <br />
                <span className="not-italic font-light opacity-90">Không gian sống</span>
              </h3>
              <div className="w-12 h-[2px]" style={{ backgroundColor: brandColor }} />
            </div>

            <p className="text-[9px] tracking-[0.2em] opacity-40 uppercase font-medium">
              © 2026 LuxHouse
            </p>
          </div>
        </div>

        {/* Right Side: Form - Padding vừa đủ để không bị scroll */}
        <div className="w-full lg:w-[55%] flex flex-col p-8 md:p-14 justify-center relative bg-white">
          <motion.a
            whileHover={{ x: -3 }}
            href="/"
            className="absolute top-10 left-10 flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-all text-[9px] uppercase tracking-widest font-bold"
          >
            <ArrowLeft size={12} /> Trang chủ
          </motion.a>

          <div className="mb-10">
            <h1
              className="text-3xl text-stone-900 mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Đăng nhập
            </h1>
            <p className="text-stone-400 text-xs font-light">
              Chào mừng bạn quay lại với{" "}
              <span style={{ color: brandColor }} className="font-semibold">
                LuxHouse
              </span>
              .
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Input Email */}
            <div className="relative">
              <label
                className={`absolute transition-all duration-300 pointer-events-none ${
                  focused === "email" || email
                    ? "-top-5 left-0 text-[9px] font-bold tracking-widest"
                    : "top-2 left-0 text-stone-400 text-sm opacity-70"
                }`}
                style={{ color: focused === "email" ? brandColor : "#78716c" }}
              >
                EMAIL CỦA BẠN
              </label>
              <div
                className={`flex items-center border-b transition-all duration-500 py-1.5 ${
                  focused === "email" ? "border-stone-900" : "border-stone-100"
                }`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className="w-full bg-transparent outline-none text-stone-800 text-sm py-1"
                />
                <Mail
                  size={16}
                  className="opacity-40"
                  style={{ color: focused === "email" ? brandColor : "" }}
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="relative">
              <label
                className={`absolute transition-all duration-300 pointer-events-none ${
                  focused === "pass" || pass
                    ? "-top-5 left-0 text-[9px] font-bold tracking-widest"
                    : "top-2 left-0 text-stone-400 text-sm opacity-70"
                }`}
                style={{ color: focused === "pass" ? brandColor : "#78716c" }}
              >
                MẬT KHẨU
              </label>
              <div
                className={`flex items-center border-b transition-all duration-500 py-1.5 ${
                  focused === "pass" ? "border-stone-900" : "border-stone-100"
                }`}
              >
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  onFocus={() => setFocused("pass")}
                  onBlur={() => setFocused("")}
                  className="w-full bg-transparent outline-none text-stone-800 text-sm py-1"
                />
                <Lock
                  size={16}
                  className="opacity-40"
                  style={{ color: focused === "pass" ? brandColor : "" }}
                />
              </div>
              <a
                href="#"
                className="absolute right-0 -bottom-6 text-[9px] text-stone-400 hover:text-stone-900 uppercase tracking-tighter transition-colors"
              >
                Quên mật khẩu?
              </a>
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: darkStone }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brandColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = darkStone)}
                onClick={handleSubmit}
              >
                Vào không gian <ArrowRight size={14} />
              </motion.button>
            </div>
          </form>

          {/* Social Section */}
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-full h-[1px] bg-stone-50"></div>
              <span className="relative bg-white px-3 text-[8px] text-stone-300 uppercase tracking-widest">
                Hoặc đăng nhập bằng
              </span>
            </div>

            <div className="flex justify-center gap-5">
              {[
                { icon: <FcGoogle size={20} /> },
                { icon: <FaFacebookF size={16} className="text-[#1877F2]" /> },
                { icon: <FaApple size={20} className="text-stone-900" /> },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-100 hover:border-stone-300 transition-all text-stone-500"
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-[10px] text-stone-400 tracking-widest uppercase font-medium">
            Mới tới LuxHouse?{" "}
            <a
              href="/register"
              className="font-bold border-b border-transparent hover:border-current transition-all ml-1"
              style={{ color: brandColor }}
            >
              Đăng ký ngay
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
