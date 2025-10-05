import React from "react";
import { motion } from "framer-motion";
import { RiNotificationLine } from "react-icons/ri";

export default function Notification() {
  return (
    <motion.div className="relative cursor-pointer select-none">
      <RiNotificationLine className="size-7" />
      <span className="absolute -top-3 -right-3 bg-[#F04D4C] flex flex-row
        items-center justify-center rounded-full w-6 h-6 text-white font-bold text-xs">
        13
      </span>
    </motion.div>
  );
}
