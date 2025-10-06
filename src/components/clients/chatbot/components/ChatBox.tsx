import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { SiDependabot } from "react-icons/si";
import { FaMicrophone } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";
import { MdGifBox } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";
import "./ChatBox.css";
import React from "react";
type Toggle = () => void;
interface ChatBoxProps {
  toggle: Toggle;
  isOpen: boolean;
}
interface Message {
  sender: "user" | "bot";
  content: string;
  timestamp: string;
}
export default function ChatBox({ toggle, isOpen }: ChatBoxProps) {
  const [searchValue, setSeachValue] = React.useState<string>("");
  const [historyChat, setHistoryChat] = React.useState<Message[]>([
    { sender: "user", content: "hahahhaha", timestamp: "aaaa" },
  ]);
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
          <main className=" flex-grow overflow-y-auto p-2">
            {historyChat.map((message, key) => (
              <div key={key}>{message.content}</div>
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
                  value={searchValue}
                  onChange={(e) => setSeachValue(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (setHistoryChat((prev) => [
                      ...prev,
                      {
                        sender: "user",
                        content: searchValue,
                        timestamp: new Date().toLocaleString(),
                      },
                    ]),
                    setSeachValue(""))
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
                {searchValue.length > 0 ? (
                  <BsSendFill className="text-[#764ba2] size-7" />
                ) : (
                  "😎"
                )}
              </motion.button>
            </nav>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
