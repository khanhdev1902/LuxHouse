import { AnimatePresence } from "framer-motion";
import { BsBagPlus } from "react-icons/bs";
import CartSheet from "../../CartSheet";
import useToggle from "@/hooks/common/useToggle";

export default function Cart() {
  const { value: isOpen, off, on } = useToggle(false);
  console.log(isOpen);
  return (
    <div>
      <AnimatePresence>
        {isOpen && <CartSheet handleIsCartSheet={off} />}
      </AnimatePresence>
      <div
        className=" relative flex flex-col items-center justify-end text-col-hover group  cursor-pointer"
        onClick={on}
      >
        <BsBagPlus className="size-7 group-hover:text-cyan-600" />
        <span className="absolute -top-3 -right-3 bg-[#F04D4C] h-6 w-6 flex justify-center items-center rounded-full text-white font-bold text-xs text-center select-none">
          0
        </span>
      </div>
    </div>
  );
}
