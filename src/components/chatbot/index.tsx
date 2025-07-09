"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function ChatBot() {
  const [isChatBox, setIsChatBox] = React.useState(false);

  return (
    <>
      {/* Chatbox hiển thị có animation ra + vào */}
      <AnimatePresence mode="wait">
        {isChatBox && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-24 right-5 z-20 shadow-xl border border-gray-200 w-80 sm:w-96 h-[500px] bg-white rounded-lg "
          >
            <header
              className=" relative rounded-t-lg bg-gradient-to-tl from-cyan-500 to-purple-500
             text-white font-semibold p-2 flex flex-row gap-2 items-center shadow-lg border-b border-t-gray-200 select-none"
            >
              <img src="chatbot.png" alt="" className="size-10" />
              <span>Trợ lý ảo ZORO</span>
              <motion.span
                className=" absolute right-5 inset-y-0 my-auto w-8 h-8
                flex justify-center items-center cursor-pointer rounded-full border-2
                border-cyan-50 select-none font-semibold text-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, delay: 0.0075, ease: "easeOut" }}
                onClick={() => setIsChatBox(false)}
              >
                x
              </motion.span>
            </header>
            <main className="p-2">
              <div className="flex flex-row gap-1 w-full">
                <img
                  src="iconchatbot.png"
                  alt=""
                  className="size-8 border border-gray-200 rounded-full p-1 select-none shadow-md"
                />
                <motion.span className=" text-xs font-medium p-2 px-4 border rounded-xl bg-white shadow-md max-w-xs break-words">
                  Nội thất ZORO xin chào 😎! <br /> Bạn muốn mua gì hôm nay ?
                </motion.span>
              </div>
            </main>
            <div className=" absolute bottom-0 right-0 border-t border-r-gray-400 h-12 w-full rounded-b-lg p-1">
              <input type="text" className="w-full outline-none border-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút chatbot hình tròn */}
      <motion.img
        src="chat.png"
        alt="icon-chatbot"
        className="fixed bottom-8 right-10 z-10 size-14 shadow-lg rounded-full cursor-pointer"
        onClick={() => setIsChatBox(!isChatBox)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          x: 0,
          rotate: isChatBox ? 0 : -360,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      />
    </>
  );
}
