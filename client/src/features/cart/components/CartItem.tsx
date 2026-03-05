import { QuantitySelector } from "@/features/cart/components/QuantitySelecter";
import { HiOutlineX } from "react-icons/hi";
import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/features/cart/types/cart.type";
import { cartApi } from "../apis/cart.api";
import { useQueryClient } from "@tanstack/react-query";
type CartItemProps = {
  data: CartItem;
  mode?: "small" | "large";
  isUpdating: boolean;
  setIsUpdating: (value: boolean) => void;
};

export function CartItem({ data, mode = "large", isUpdating, setIsUpdating }: CartItemProps) {
  const [quantity, setQuantity] = useState(data.quantity ?? 0);
  const queryClient = useQueryClient();

  const handleRemoveItem = async () => {
    if (!data?.productVariantId) return;
    setIsUpdating(true);
    await cartApi.removeCartItem(data.productVariantId);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    setIsUpdating(false);
  };

  const handleUpdateQuantity = async () => {
    if (!data?.productVariantId) return;
    setIsUpdating(true);
    console.log("Updating quantity for productVariantId:", data.productVariantId, "to", quantity);
    const res = await cartApi.updateCartItemQuantity(data.productVariantId, quantity);
    console.log("Quantity updated successfully for productVariantId:", res);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    setIsUpdating(false);
  };
  useEffect(() => {
    handleUpdateQuantity();
  }, [quantity]);
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
          <HiOutlineX className=" cursor-pointer font-bold size-5" onClick={handleRemoveItem} />
        </div>
        <div>
          <span>{formatCurrency(data.price ?? 0)}</span>
          {" - "}
          <span className="line-through">{formatCurrency(data.originalPrice)}</span>
        </div>
        <div>{data.attributes}</div>
        <div className="flex flex-row justify-between">
          <div className={cn(mode === "small" ? "max-w-28" : "max-w-40")}>
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              onMode={mode}
              disabled={isUpdating}
            />
          </div>
          <span className="font-bold">{formatCurrency(data.price * quantity)}</span>
        </div>
      </div>
    </div>
  );
}
