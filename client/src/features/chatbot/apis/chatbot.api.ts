import http from "@/lib/http";

const sendGemini = (data: { content: string }) => http.post("/chat", data);
const sendOpenAI = (data: { content: string }) => http.post("/open-ai", data);

export const chatAPI = { sendGemini, sendOpenAI };
