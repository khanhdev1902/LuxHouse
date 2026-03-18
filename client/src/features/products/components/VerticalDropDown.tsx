// import { AnimatePresence, motion } from "framer-motion";
// import React from "react";
// import { BsChevronDown } from "react-icons/bs";

// type Props = {
//   on: () => void;
//   off: () => void;
//   isOpen: boolean;
//   data: {
//     title: string;
//     items: string
//   }
// };

// export default function VerticalDropDown({ on, off, isOpen }: Props) {
//   return (
//     <motion.div
//       className="relative flex flex-row justify-between items-center gap-32 border border-gray-300 p-3 cursor-pointer select-none"
//       onHoverStart={on}
//       onHoverEnd={off}
//     >
//       <span className="text-sm font-medium">DANH MỤC</span>
//       <BsChevronDown className="size-4" />
//       {isOpen && (
//         <AnimatePresence>
//           <motion.div
//             // initial={{ scaleY: 0, opacity: 0, originY: 0 }}
//             // animate={{ scaleY: 1, opacity: 1, originY: 0 }}
//             // exit={{ scaleY: 0, opacity: 0, originY: 0 }}
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 1 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className=" absolute z-30 top-full left-0 right-0 flex flex-col bg-white border border-gray-200 rounded-b-sm"
//           >
//             {lstCategories.map((category, key) => (
//               <label
//                 key={key}
//                 className=" text-sm font-light flex flex-row gap-2 cursor-pointer px-3 py-2 hover:bg-slate-100"
//               >
//                 <input
//                   type="checkbox"
//                   checked={categories.includes(category.slug)}
//                   onChange={() => handleChange(category.slug)}
//                   className="outline-none border-none size-4"
//                 />
//                 {category.name}
//               </label>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       )}
//     </motion.div>
//   );
// }
