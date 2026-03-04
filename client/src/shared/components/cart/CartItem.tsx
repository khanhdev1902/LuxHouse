import { QuantitySelector } from "@/shared/components/ui/QuantitySelecter";
import { HiOutlineX } from "react-icons/hi";
import { formatCurrency } from "@/utils/formatCurrency";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/features/cart/types/cart.type";
type CartItemProps = {
  data: CartItem;
  mode?: "small" | "large";
};

export default function CartItem({ data, mode = "large" }: CartItemProps) {
  const [quantity, setQuantity] = useState(data.quantity ?? 0);
  return (
    <div
      className={cn(
        "grid grid-cols-10 p-3 border-b",
        mode === "small" ? "text-xs gap-5" : "text-sm"
      )}
    >
      <div className="col-span-2 flex justify-center items-center">
        <img
          src={data.imageUrl}
          alt={data.name}
          className={cn("object-cover", mode === "small" ? "size-22" : "size-28")}
        />
      </div>
      <div className={cn("col-span-8 flex flex-col", mode === "small" ? "gap-1" : "gap-2")}>
        <div className="flex flex-row justify-between">
          <strong>{data.name}</strong>
          <HiOutlineX className=" cursor-pointer font-bold size-5" />
        </div>
        <div>
          <span>{formatCurrency(data.price ?? 0)}</span>
          {" - "}
          <span className="line-through">{formatCurrency(data.originalPrice)}</span>
        </div>
        <div>{data.attributes}</div>
        <div className="flex flex-row justify-between">
          <div className={cn(mode === "small" ? "max-w-28" : "max-w-40")}>
            <QuantitySelector value={quantity} onChange={setQuantity} onMode={mode} />
          </div>
          <span className="font-bold">{formatCurrency(data.price * quantity)}</span>
        </div>
      </div>
    </div>
  );
}
