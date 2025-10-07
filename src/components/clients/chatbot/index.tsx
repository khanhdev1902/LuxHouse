"use client";
// import React from "react";
// import axios from "axios";
// const apiUrl = import.meta.env.VITE_API_URL;
import ChatToggle from "./components/ChatToggle";
import useToggle from "@/hooks/useToggle";
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
    </>
  );
}
