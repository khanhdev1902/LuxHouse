import Footer from "@/components/user/footer";
import Header from "@/components/user/header";
import React from "react";
import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const handleResize = (sizeHeight: number) => setHeaderHeight(sizeHeight);
  return (
    <div className="flex flex-col min-h-screen h-[1500px]">
      <Header onHandleResize={handleResize} />
      <main className={`flex-grow`} style={{ paddingTop: `${headerHeight}px` }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
