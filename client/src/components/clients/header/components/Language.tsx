import { GrLanguage } from "react-icons/gr";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
export default function Language() {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <GrLanguage className="size-4" />
      <span>Ngôn ngữ</span>
      <MdOutlineKeyboardArrowDown />
    </div>
  );
}
