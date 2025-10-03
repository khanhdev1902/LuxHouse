import React from "react";
import { AnimatePresence } from "framer-motion";
import { BsBagPlus } from "react-icons/bs";
import CartSheet from "../../CartSheet";

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
        className=" relative flex flex-col items-center justify-end text-col-hover group  cursor-pointer"
        onClick={() => handleIsCartSheet(true)}
      >
        <BsBagPlus className="size-7 group-hover:text-cyan-600" />
        <span className="absolute -top-3 -right-3 bg-cyan-600 h-6 w-6 flex justify-center items-center rounded-full text-white font-bold text-xs text-center">
          0
        </span>
      </div>
    </div>
  );
}
