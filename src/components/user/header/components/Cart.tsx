import { RiShoppingCartLine } from "react-icons/ri";
import CartSheet from "../../CartSheet";
import React from "react";
import { AnimatePresence } from "framer-motion";

export default function Cart() {
  const [isCartSheet, setIsCartSheet] = React.useState(false);
  const handleIsCartSheet = (vlaue: boolean) => {
    setIsCartSheet(vlaue);
  };
  return (
    <div>
      <AnimatePresence>
        {isCartSheet && <CartSheet handleIsCartSheet={setIsCartSheet} />}
      </AnimatePresence>
      <div
        className="  flex flex-col items-center justify-end text-col-hover group  cursor-pointer"
        onClick={() => handleIsCartSheet(true)}
      >
        <div className=" relative">
          <RiShoppingCartLine className="size-6 group-hover:text-cyan-500" />
          <span className="absolute -top-2 -right-2 bg-cyan-500 h-5 w-5 flex justify-center items-center rounded-full text-white font-semibold text-sm">
            9
          </span>
        </div>
        {/* <span className="hidden lg:inline select-none">Giỏ hàng</span> */}
      </div>
    </div>
  );
}
