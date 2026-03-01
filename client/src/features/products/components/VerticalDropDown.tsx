// import React from "react";

// export default function VerticalDropDown() {
//   return (
//     <div className="relative flex flex-row justify-between items-center gap-32 border border-gray-300 p-3">
//       <span className="text-sm font-medium">DANH MỤC</span>
//       <ChevronDown className="size-4" />
//       <div className=" absolute z-50 top-full left-0 right-0 flex flex-col bg-white p-3 gap-2 border border-gray-300">
//         {allCategories.map((item, key) => (
//           <label key={key} className=" text-sm font-light flex flex-row gap-2">
//             <input
//               type="checkbox"
//               checked={categories.includes(item.name)}
//               onChange={() => handleChange(item.name)}
//               className=" outline-none border-none size-4 cursor-pointer"
//             />
//             {item.name}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// }
