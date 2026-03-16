import ChatBot from "@/features/chatbot";
import Footer from "@/shared/components/footer";
import Header from "@/shared/components/header";

import React from "react";
import { Outlet } from "react-router-dom";

export default function ClientsLayout() {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const handleResize = (sizeHeight: number) => setHeaderHeight(sizeHeight);
  return (
    <div className="relative flex flex-col w-full min-h-screen max-w-full">
      <ChatBot />
      <Header
        onHandleResize={handleResize}
        className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm select-none"
      />
      <main className="flex-grow" style={{ paddingTop: `${headerHeight || 80}px` }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
