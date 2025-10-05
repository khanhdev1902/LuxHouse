import ChatBot from "@/components/clients/chatbot";
import Footer from "@/components/clients/footer";
import Header from "@/components/clients/header";
import React from "react";
import { Outlet } from "react-router-dom";

export default function ClientsLayout() {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const handleResize = (sizeHeight: number) => setHeaderHeight(sizeHeight);
  return (
    <div className="flex flex-col min-h-screen h-[1500px]">
      <ChatBot />
      <Header onHandleResize={handleResize} />
      <main className={`flex-grow`} style={{ paddingTop: `${headerHeight}px` }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
