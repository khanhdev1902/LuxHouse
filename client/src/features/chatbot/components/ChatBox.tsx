import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { RiCompass3Line, RiLayoutMasonryLine } from "react-icons/ri";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useAutoScroll } from "@/shared/hooks/use-auto-scroll";
import { cn } from "@/lib/utils";
import { useChat } from "../hooks/useChat";

export default function ChatBox({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) {
  const { historyChat, content, setContent, isSending, sendGemini } = useChat();
  const chatRef = React.useRef<HTMLDivElement>(null);
  const { isAtBottom, scrollToEdge } = useAutoScroll(chatRef, [historyChat], true);

  const suggestions = [
    "Tư vấn phối màu phòng khách",
    "Mẫu sofa phong cách tối giản",
    "Xu hướng nội thất 2024",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "fixed bottom-0 right-0 left-0 z-[60] flex flex-col overflow-hidden border border-[#E5E1DA] bg-[#FCFBF9] shadow-[0_32px_64px_-16px_rgba(139,69,19,0.2)]",
            "sm:bottom-10 sm:right-12 sm:left-auto sm:w-[440px] sm:h-[680px] sm:rounded-[2rem]"
          )}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
        
          <header className="relative p-4 bg-[#A6894B] text-[#F5F5DC] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-full bg-[#8B4513]/10 skew-x-[-20deg] translate-x-10" />

            <div className="relative flex justify-between items-start z-10">
              <div className="flex gap-4">
                <div className="relative">
                  <div className="size-14 rounded-full border border-amber-200/30 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=100"
                      className="size-full rounded-full object-cover grayscale-[30%]"
                      alt="AI Assistant"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 border-2 border-[#2C2420] rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium tracking-tight">Lux Design AI</h3>
                  <p className="text-[11px] text-amber-100/50 uppercase tracking-[0.2em] font-light mt-1">
                    Chuyên gia tư vấn không gian
                  </p>
                </div>
              </div>
              <button
                onClick={toggle}
                className="p-1 hover:rotate-90 transition-transform duration-300 opacity-70 hover:opacity-100"
              >
                <IoMdClose size={24} />
              </button>
            </div>
          </header>

          {/* CHAT BODY */}
          <main ref={chatRef} className="flex-grow overflow-y-auto p-6 space-y-8 bg-[#FCFBF9]">
            {/* Tin nhắn chào mừng mặc định nếu chưa có chat */}
            {historyChat.length === 0 && (
              <div className="text-center py-10 space-y-4">
                <RiLayoutMasonryLine className="mx-auto size-8 text-[#A6894B]/30" />
                <p className="text-[#4A2F1B]/60 text-sm font-light italic px-10">
                  "Ngôi nhà là nơi câu chuyện của bạn bắt đầu. Tôi có thể giúp gì cho không gian của
                  bạn hôm nay?"
                </p>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {suggestions.map((text) => (
                    <button
                      key={text}
                      onClick={() => setContent(text)}
                      className="text-[12px] px-3 py-1.5 rounded-full border border-[#D2691E]/20 text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-all"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {historyChat.map((msg, i) => {
              const isUser = msg.sender === "User";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isUser ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-5 py-4 relative",
                      isUser
                        ? "bg-[#8B4513] text-white rounded-[20px] rounded-tr-[2px]"
                        : "bg-white border border-[#E5E1DA] text-[#2C2420] rounded-[20px] rounded-tl-[2px] shadow-sm"
                    )}
                  >
                    <div
                      className={cn(
                        "text-[14.5px] leading-relaxed prose prose-stone",
                        isUser ? "prose-invert" : ""
                      )}
                    >
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {isSending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full">
                  <div className="size-1.5 bg-[#D2691E] rounded-full animate-bounce" />
                  <div className="size-1.5 bg-[#D2691E] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="size-1.5 bg-[#D2691E] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </main>

          {/* FOOTER */}
          <footer className="p-6 bg-white shadow-[0_-10px_25px_rgba(0,0,0,0.02)]">
            <div className="relative flex items-center bg-[#F5F2ED] rounded-2xl border border-transparent focus-within:border-[#D2691E]/30 transition-all">
              <input
                type="text"
                placeholder="Hỏi về chất liệu, phong cách..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && content.trim() && sendGemini()}
                className="w-full bg-transparent py-4 pl-5 pr-14 text-[14px] outline-none text-[#2C2420] placeholder:text-stone-400"
              />
              <button
                onClick={() => content.trim() && sendGemini()}
                className={cn(
                  "absolute right-2 size-10 rounded-xl flex items-center justify-center transition-all",
                  content.trim() ? "bg-[#2C2420] text-white" : "text-stone-300"
                )}
              >
                <HiOutlineArrowRight size={20} />
              </button>
            </div>
            <div className="flex justify-between items-center mt-4 px-1">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">
                Premium Service
              </span>
              <RiCompass3Line className="text-stone-300 size-4" />
            </div>
          </footer>

          {/* Scroll Button */}
          {!isAtBottom && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={scrollToEdge}
              className="absolute bottom-28 right-8 size-10 bg-[#2C2420] text-white shadow-2xl rounded-full flex items-center justify-center z-20"
            >
              <MdKeyboardDoubleArrowDown size={20} />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
