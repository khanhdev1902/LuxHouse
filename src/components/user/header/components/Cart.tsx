import { RiShoppingCartLine } from "react-icons/ri";

export default function Cart() {
  return (
    <div className="  flex flex-col items-center justify-end text-col-hover group  cursor-pointer">
      <div className=" relative">
        <RiShoppingCartLine className="size-6 group-hover:text-cyan-500" />
        <span className="absolute -top-2 -right-2 bg-cyan-500 h-5 w-5 flex justify-center items-center rounded-full text-white font-semibold text-sm">
          9
        </span>
      </div>
      <span className="hidden lg:inline">Giỏ hàng</span>
    </div>
  );
}
