import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { SiDependabot } from "react-icons/si";
import { FaMicrophone } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";
import { MdGifBox } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import "./ChatBox.css";
import React from "react";
import useChat from "@/hooks/useChat";
import useAutoScroll from "@/hooks/useAutoScroll";
import { cn } from "@/lib/utils";
type Toggle = () => void;
interface ChatBoxProps {
  toggle: Toggle;
  isOpen: boolean;
}
export default function ChatBox({ toggle, isOpen }: ChatBoxProps) {
  const { message, setMessage, historyChat, handleSend } = useChat();
  const chatRef = React.useRef<HTMLDivElement>(null);
  const { isAtBottom, scrollToEdge } = useAutoScroll(
    chatRef,
    [historyChat],
    true
  );
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-16 right-8 z-[60] bg-white w-[600px] h-[600px] flex flex-col rounded-lg shadow-xl"
          initial={{ x: 50, y: 10, scale: 0.8, opacity: 0 }}
          animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          exit={{ x: 50, y: 10, scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <header className=" flex flex-row justify-between items-center py-2 px-5 shadow-md bg-gradient-to-tr from-[#744ea6] to-[#66a6ff] rounded-t-lg text-white">
            <div className="flex flex-row gap-4 justify-center items-center">
              <div className="relative flex justify-center items-center size-12">
                <SiDependabot className="size-10 z-10 bg-[#ffffff7e] rounded-full p-2" />
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>

              <div className="flex flex-col justify-center items-start">
                <span className="text-xl font-bold">Trợ lý ảo Lux</span>
                <span className=" flex flex-row gap-2 justify-center items-center text-xs font-medium">
                  <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                  Đang hoạt động
                </span>
              </div>
            </div>
            <IoMdClose
              onClick={toggle}
              className="size-9 cursor-pointer bg-[#ffffff2b] rounded-full p-2"
            />
          </header>
          <main
            ref={chatRef}
            className=" flex-grow overflow-y-auto p-2 flex flex-col gap-2"
          >
            {!isAtBottom && (
              <motion.div
                initial={{ opacity: 0, scale:0.8 }}
                animate={{ opacity: 0.5, scale:1 }}
                exit={{ opacity: 0, scale:0.8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className=" absolute z-10 bottom-24 right-20 p-1 bg-white shadow-lg border border-gray-200 rounded-full text-4xl text-slate-600 cursor-pointer select-none"
                onClick={scrollToEdge}
              >
                <MdKeyboardDoubleArrowDown />
              </motion.div>
            )}
            {historyChat.map((message, key) => (
              <div
                key={key}
                className={cn(
                  "flex items-center",
                  message.sender === "user" && "justify-end"
                )}
              >
                <motion.span
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className=" rounded-full border border-slate-100 shadow-sm px-2 py-1"
                >
                  {message.content}
                </motion.span>
              </div>
            ))}
          </main>
          <footer className="border-t border-t-slate-200 shadow-lg ">
            <nav className="flex flex-row justify-center items-center gap-3 py-3 px-5 text-slate-700">
              <div className="flex flex-row justify-center items-center gap-4 ">
                <FaMicrophone className="size-5" />
                <FaFileImage className="size-5" />
                <MdGifBox className="size-7" />
              </div>
              <div className="flex flex-grow flex-row justify-between items-center border border-gray-200 rounded-full">
                <input
                  type="text"
                  placeholder="Aa"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && message.length > 0 && handleSend()
                  }
                  className=" w-full border-none focus:outline-none rounded-full px-5 py-2"
                />
                <BsEmojiSmileFill className="mr-2 size-6 cursor-pointer" />
              </div>
              <motion.button
                className="text-2xl select-none cursor-pointer size-fit p-1"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                {message.length > 0 ? (
                  <BsSendFill
                    className="text-[#764ba2] size-7"
                    onClick={() => handleSend()}
                  />
                ) : (
                  <span onClick={() => handleSend("😎")}>😎</span>
                )}
              </motion.button>
            </nav>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
