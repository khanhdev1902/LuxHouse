import http from "@/lib/http";

const sendGemini = (data: { content: string }) => http.post("/chat", data);

export const chatAPI = { sendGemini };
