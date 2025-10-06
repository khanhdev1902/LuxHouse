import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import { SiDependabot } from "react-icons/si";
import { IoMdClose } from "react-icons/io";

type Toggle = () => void;
interface ToggleProps {
  toggle: Toggle;
  isOpen: boolean;
}
export default function ChatToggle({ toggle, isOpen }: ToggleProps) {
  const controls = useAnimation();
  React.useEffect(() => {
    const sequence = async () => {
      // Giai đoạn 1: trượt vào và hiện ra
      await controls.start({
        x: 0,
        opacity: 1,
        rotate: -360,
        transition: { duration: 3, ease: "easeOut" },
      });

      // Giai đoạn 2: quay liên tục tại chỗ
      controls.start({
        rotate: [0, -360],
        transition: { duration: 2, ease: "linear", repeat: Infinity },
      });
    };

    sequence();
  }, [controls]);
  console.log(isOpen);
  return (
    <motion.div
      className={cn(
        "fixed bottom-8 right-12 z-50 select-none"
        // !isOpen && "animate-bounce duration-2000 ease-in-out"
      )}
      animate={
        isOpen
          ? {
              x: 50,
              y: 50,
              scale: 1.2,
            }
          : { x: 0, y: 0 }
      }
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        onClick={toggle}
        className={cn(
          " p-4 rounded-full cursor-pointer bg-gradient-to-tr from-red-500 to-purple-500 shadow-xl",
          !isOpen && "animate-bounce duration-2000 ease-in-out"
        )}
        initial={{ x: 150, opacity: 0 }}
        animate={controls}
      >
        {isOpen ? (
          <IoMdClose className="size-8 text-white" />
        ) : (
          <SiDependabot className="size-10 text-white" />
          // <img src="/AI Robot (1).gif" alt="" />
        )}
      </motion.div>
    </motion.div>
  );
}
