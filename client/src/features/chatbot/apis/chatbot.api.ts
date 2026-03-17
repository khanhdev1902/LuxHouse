import http from "@/lib/http";

const sendGemini = (data: { sessionId: string; content: string }) => http.post("/chat", data);
const sendOpenAI = (data: { sessionId: string; content: string }) => http.post("/open-ai", data);
const getHistory = (params: string) => http.get(`/open-ai/${params}`);
const clearHistory = (params: string) => http.delete(`/open-ai/${params}`);

export const chatAPI = { sendGemini, sendOpenAI, getHistory, clearHistory };
