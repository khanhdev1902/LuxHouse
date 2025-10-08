import { motion } from "framer-motion";
import { RiNotificationLine } from "react-icons/ri";

export default function Notification() {
  return (
    <motion.div className="cursor-pointer select-none flex flex-row gap-2">
      <div className="relative flex flex-row justify-center items-center ">
        <RiNotificationLine className="size-6 text-[#434343]" />
        <span
          className="absolute -top-3 -right-3 bg-[#F04D4C] flex flex-row
        items-center justify-center rounded-full w-6 h-6 text-white text-xs font-bold"
        >
          13
        </span>
      </div>
      <span className=" whitespace-nowrap">Thông báo</span>
      <motion.div></motion.div>
    </motion.div>
  );
}
