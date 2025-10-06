"use client";
// import React from "react";
// import axios from "axios";
// const apiUrl = import.meta.env.VITE_API_URL;
import ChatToggle from "./components/ChatToggle";
import useToggle from "@/hooks/common/useToggle";
import ChatBox from "./components/ChatBox";
// type Message = {
//   sender: "user" | "genimi";
//   text: string;
// };

export default function ChatBot() {
  const { value: isOpen, toggle, off } = useToggle();
  // const [message, setMesage] = React.useState("");
  // const [isloading, setIsloading] = React.useState(false);
  // const [arr, setArr] = React.useState<Message[]>([
  //   {
  //     sender: "genimi",
  //     text: "Chào bạn! :v Mình có thể giúp gì cho bạn hôm nay? 😎",
  //   },
  // ]);
  // const askGenimi = async () => {
  //   const res = await axios.post(`${apiUrl}/ask-gemini`, {
  //     message: message,
  //   });
  //   await setIsloading(false);
  //   setArr((prev) => [
  //     ...prev,
  //     {
  //       sender: "genimi",
  //       text:
  //         res?.data ??
  //         "Không có phản hồi, vui lòng hỏi lại hoặc nhập yêu cầu khác 😙😙😙 ",
  //     },
  //   ]);
  // };
  // const updateArr = (message: string) => {
  //   setIsloading(true);
  //   setArr((prev) => [...prev, { sender: "user", text: message }]);
  //   if (message === "clear" || message === "Clear") setArr([]);
  //   askGenimi();
  //   setMesage("");
  // };
  // console.log(arr);
  return (
    <>
      <ChatToggle toggle={toggle} isOpen={isOpen} />
      <ChatBox toggle={off} isOpen={isOpen} />
      {/* <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-24 right-5 z-[60] shadow-xl border border-gray-200 w-80 sm:w-96 h-[500px] bg-white rounded-lg
            "
          >
            <div className=" relative w-full h-full flex flex-col">
              <header
                className=" relative rounded-t-lg bg-gradient-to-tl from-cyan-500 to-purple-500
             text-white font-semibold p-2 flex flex-row gap-2 items-center shadow-lg border-b border-t-gray-200 select-none"
              >
                <img src="/chatbot.png" alt="" className="size-10" />
                <div className="flex flex-col">
                  <span>Trợ lý ảo ZORO</span>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400"></div>
                    <span className="font-semibold text-xs">
                      Đang hoạt động
                    </span>
                  </div>
                </div>
                <motion.span
                  className=" absolute right-5 inset-y-0 my-auto w-8 h-8
                flex justify-center items-center cursor-pointer rounded-full border-2
                border-cyan-50 select-none font-semibold text-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2, delay: 0.0075, ease: "easeOut" }}
                  onClick={off}
                >
                  x
                </motion.span>
              </header>
              <main className="p-2 space-y-2 overflow-y-auto overflow-x-hidden flex-grow ">
                {arr.length > 0 &&
                  arr.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-row gap-1 w-full",
                        item?.sender === "genimi"
                          ? "justify-start"
                          : "justify-end"
                      )}
                    >
                      <motion.span
                        className={cn(
                          " text-xs font-medium p-2 px-4 border rounded-xl bg-white shadow-md max-w-72 break-words",
                          item.sender === "genimi" && "order-2"
                        )}
                      >
                        
                        <ReactMarkdown>{item.text}</ReactMarkdown>
                      </motion.span>
                      <div className="relative w-10 h-10">
                       
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "linear",
                          }}
                        />

                       
                        <div className="absolute inset-[3px] bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
                          <img
                            src="/iconchatbot.png"
                            alt=""
                            className="size-6 select-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                {isloading && (
                  <div className="flex flex-row gap-2">
                    <div className="relative w-10 h-10">
                    
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          ease: "linear",
                        }}
                      />

                     
                      <div className="absolute inset-[3px] bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
                        <img
                          src="/iconchatbot.png"
                          alt=""
                          className="size-6 select-none"
                        />
                      </div>
                    </div>
                    <motion.div className="flex flex-row gap-1 text-xl font-bold items-center">
                      <span className="text-sm font-semibold">
                        Just a second
                      </span>
                      <span className="  animate-bounce delay-0">.</span>
                      <span className="  animate-bounce delay-100">.</span>
                      <span className="  animate-bounce delay-200">.</span>
                    </motion.div>
                  </div>
                )}
              </main>
              <div className=" relative border-t border-r-gray-400 min-h-[52px] w-full rounded-b-lg p-1">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMesage(e.target.value)}
                  onKeyDown={(e) => {
                    e.key === "Enter" && message !== "" && updateArr(message);
                  }}
                  placeholder="Nhập yêu cầu của bạn..."
                  className="relative p-1 pl-3 pr-12 w-full outline-none h-full rounded-full border-2 border-gray-300 text-xs "
                />
                <ArrowUp
                  onClick={() => message !== "" && updateArr(message)}
                  className="rounded-full size-8 absolute inset-y-0 my-auto right-3 p-2 text-white cursor-pointer bg-blue-500
                hover:scale-110 active:scale-90 duration-200 ease-in-out select-none shadow-sm"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
}
