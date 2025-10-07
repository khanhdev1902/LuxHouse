import React from "react";
interface Message {
  sender?: string;
  content?: string;
  timestamp?: string;
}
export default function useChat() {
  const [message, setMessage] = React.useState<string>("");
  const [historyChat, setHistoryChat] = React.useState<Message[]>([]);
  const handleSend = (mes = message) => {
    if (!mes) return;
    setHistoryChat((prev) => [
      ...prev,
      {
        sender: "user",
        content: mes,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setMessage("");
  };
  const botResponse = () => {
    setHistoryChat((prev) => [
      ...prev,
      {
        sender: "bot",
        content: "Hi 😘, mình có thể giúp gì cho bạn (❁´◡`❁).",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };
  React.useEffect(()=>botResponse(),[])
  return { message, setMessage, historyChat, setHistoryChat, handleSend };
}
