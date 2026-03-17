import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { useRegister } from "../hooks/useRegister";
import type { RegisterRequest } from "../types/auth-request.type";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [focused, setFocused] = useState("");
  const { mutate, error, isPending } = useRegister();

  const brandColor = "#C05621";
  const darkStone = "#1C1917";
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: RegisterRequest = {
      name,
      email,
      password: pass,
    };
    mutate(formData);
  };
  console.log("e in register", error?.error.email);
  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-[#FDFCFB] relative overflow-hidden px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background Decor */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[30%] h-[40%] opacity-10 rounded-full blur-[100px]"
        style={{ backgroundColor: brandColor }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[1000px] max-h-[90vh] flex bg-white rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden border border-stone-100"
      >
        {/* Left Side - Ảnh thu gọn lại */}
        <div className="hidden lg:block w-[45%] relative">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
            alt="Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          <div className="absolute inset-0 z-20 p-10 flex flex-col justify-between text-white">
            <h2 className="text-[9px] font-bold tracking-[0.5em] uppercase text-stone-300">
              LuxHouse Studio
            </h2>

            <div className="space-y-2">
              <h3
                className="text-4xl leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              >
                Kiến tạo <br />
                <span className="not-italic font-light opacity-90">Tổ ấm</span>
              </h3>
              <p className="text-stone-300 font-light text-[13px] max-w-[240px] leading-relaxed">
                Nơi sự tinh tế gặp gỡ bản sắc cá nhân của bạn.
              </p>
            </div>

            <p className="text-[9px] tracking-[0.2em] opacity-40 uppercase font-medium">
              © 2026 LuxHouse
            </p>
          </div>
        </div>

        {/* Right Side - Form thu gọn padding */}
        <div className="w-full lg:w-[55%] flex flex-col p-8 md:p-12 justify-center relative bg-white overflow-y-auto custom-scrollbar">
          <motion.a
            whileHover={{ x: -3 }}
            href="/"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-all text-[9px] uppercase tracking-widest font-bold mb-6"
          >
            <ArrowLeft size={12} /> Trang chủ
          </motion.a>

          <div className="mb-8">
            <h1
              className="text-3xl text-stone-900 mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tạo tài khoản
            </h1>
            <p className="text-stone-400 text-xs font-light">
              Chào mừng bạn gia nhập không gian độc bản.
            </p>
          </div>

          <form className="space-y-6">
            {[
              {
                id: "name",
                label: "Họ và tên",
                icon: <User size={16} />,
                type: "text",
                val: name,
                set: setName,
              },
              {
                id: "email",
                label: "Địa chỉ Email",
                icon: <Mail size={16} />,
                type: "email",
                val: email,
                set: setEmail,
              },
              {
                id: "pass",
                label: "Mật khẩu",
                icon: <Lock size={16} />,
                type: "password",
                val: pass,
                set: setPass,
              },
            ].map((field) => (
              <div key={field.id} className="relative">
                <label
                  className={`absolute transition-all duration-300 pointer-events-none ${
                    focused === field.id || field.val
                      ? "-top-5 left-0 text-[9px] font-bold tracking-widest"
                      : "top-1.5 left-0 text-stone-400 text-[13px] opacity-70"
                  }`}
                  style={{ color: focused === field.id ? brandColor : "#78716c" }}
                >
                  {field.label.toUpperCase()}
                </label>
                <div
                  className={`flex items-center border-b transition-all duration-500 py-1.5 ${
                    focused === field.id ? "border-stone-900" : "border-stone-100"
                  }`}
                >
                  <input
                    type={field.type}
                    value={field.val}
                    onChange={(e) => field.set(e.target.value)}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused("")}
                    className="w-full bg-transparent outline-none text-stone-800 text-sm"
                  />
                  <span
                    className="ml-2 transition-colors duration-300 opacity-60"
                    style={{ color: focused === field.id ? brandColor : "#d6d3d1" }}
                  >
                    {field.icon}
                  </span>
                </div>
                <span className="text-xs text-red-500 py-1">
                  {field.type === "text" && error?.error.name && error.error.name.at(-1)}
                  {field.type === "email" && error?.error.email && error.error.email.at(-1)}
                  {field.type === "password" &&
                    error?.error.password &&
                    error.error.password.at(-1)}
                </span>
              </div>
            ))}

            <div className="pt-2">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-white shadow-md flex items-center justify-center gap-2 transition-colors"
                style={{ backgroundColor: darkStone }}
                disabled={isPending}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brandColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = darkStone)}
                onClick={handleSubmit}
              >
                {isPending ? `Đang gửi yêu cầu...` : `Đăng ký`}
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </form>

          {/* Social Section - Nhỏ gọn hơn */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-full h-[1px] bg-stone-50"></div>
              <span className="relative bg-white px-3 text-[8px] text-stone-300 uppercase tracking-widest">
                Hoặc kết nối
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
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-100 hover:border-stone-300 transition-all shadow-sm text-stone-500"
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-[10px] text-stone-400 tracking-widest uppercase">
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="font-bold border-b border-transparent hover:border-current transition-all ml-1"
              style={{ color: brandColor }}
            >
              Đăng nhập
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
