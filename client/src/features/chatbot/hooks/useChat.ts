import { useEffect, useState } from "react";
import type { Message } from "../types/chatbot.type";
import { chatAPI } from "../apis/chatbot.api";
// import { toast } from "sonner";

export const useChat = () => {
  const [historyChat, setHistoryChat] = useState<Message[]>([]);
  const [content, setContent] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [sessionId] = useState(() => {
    const existing = localStorage.getItem("sessionId");
    if (existing) return existing;

    const newId = crypto.randomUUID();
    localStorage.setItem("sessionId", newId);
    return newId;
  });
  const getHistory = async () => {
    const res = await chatAPI.getHistory(sessionId);
    setHistoryChat(res.data);
  };
  // toast.success(sessionId);
  useEffect(() => {
    getHistory();
  }, [sessionId]);
  useEffect(() => {
    console.log(historyChat);
  }, [historyChat]);

  const sendOpenAI = async () => {
    console.log("called sendOpenAI");
    if (!content.trim()) {
      setIsSending(false);
      return;
    }
    setIsSending(true);
    const data: Message = {
      role: "user",
      content,
    };
    setHistoryChat((prev) => [...prev, data]);
    setContent("");

    try {
      const reply = await chatAPI.sendOpenAI({ sessionId, content: data.content });

      setHistoryChat((prev) => [...prev, reply.data]);
    } catch (e) {
      console.log(e);
      setHistoryChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Xin lỗi, hệ thống đang lỗi, vui lòng thử lại!",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const clearHistory = async () => {
    // toast.success("clear", { description: sessionId });
    const res = await chatAPI.clearHistory(sessionId);
    console.log(res)
    getHistory();
  };
  return {
    content,
    setContent,
    historyChat,
    isSending,
    sendOpenAI,
    clearHistory,
  };
};
