import { useState } from "react";
import type { Message } from "../types/chatbot.type";
import { chatAPI } from "../apis/chatbot.api";

export const useChat = () => {
  const [historyChat, setHistoryChat] = useState<Message[]>([]);
  const [content, setContent] = useState<string>("");
  const [isSending, setIsSending] = useState(false);

  const sendGemini = async (icon: string = "") => {
    console.log("called sendGemini")
    setIsSending(true);
    if (!content.trim()) {
      setIsSending(false);
      return;
    }
    const data: Message = {
      sender: "User",
      content,
    };
    setHistoryChat((prev) => [...prev, data]);
    setContent("");

    const reply = await chatAPI.sendOpenAI({ content: icon || data.content });
    setHistoryChat((prev) => [...prev, reply.data]);
    console.log(reply);
    console.log(historyChat);
    setIsSending(false);
  };

  return {
    content,
    setContent,
    historyChat,
    isSending,
    sendGemini,
  };
};
