import { QuantitySelector } from "@/features/cart/components/QuantitySelecter";
import { HiOutlineTrash } from "react-icons/hi";
import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/features/cart/types/cart.type";
import { cartApi } from "../apis/cart.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type CartItemProps = {
  data: CartItem;
  mode?: "small" | "large";
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
};

export function CartItem({ data, mode = "large", isProcessing, setIsProcessing }: CartItemProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(data.quantity ?? 1);
  const debouncedQuantity = useDebounce(quantity, 500);

  const updateMutation = useMutation({
    mutationFn: ({ productVariantId, quantity }: { productVariantId: number; quantity: number }) =>
      cartApi.updateCartItemQuantity(productVariantId, quantity),
    onMutate: () => setIsProcessing(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cập nhật thành công");
    },
    onError: (e: any) => {
      toast.error(e.message || "Lỗi cập nhật số lượng");
      setQuantity(data.quantity); // Rollback
    },
    onSettled: () => setIsProcessing(false),
  });

  useEffect(() => {
    if (!data?.productVariantId || debouncedQuantity === data.quantity) return;
    updateMutation.mutate({ productVariantId: data.productVariantId, quantity: debouncedQuantity });
  }, [debouncedQuantity]);

  useEffect(() => {
    setQuantity(data.quantity ?? 1);
  }, [data.quantity]);

  const removeMutation = useMutation({
    mutationFn: (id: number) => cartApi.removeCartItem(id),
    onMutate: () => setIsProcessing(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Đã xóa sản phẩm");
    },
    onSettled: () => setIsProcessing(false),
  });

  return (
    <div
      className={cn(
        "relative flex gap-4 py-5 border-b transition-opacity duration-300",
        isProcessing && "opacity-60 pointer-events-none",
        mode === "small" ? "gap-3 py-3" : "gap-6"
      )}
    >
      {/* 1. Ảnh sản phẩm */}
      <div
        className={cn(
          "relative flex-shrink-0 overflow-hidden rounded-lg border bg-gray-50",
          mode === "small" ? "size-20" : "size-28"
        )}
      >
        <img
          src={data.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      {/* 2. Nội dung chi tiết */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-4">
            <h3
              onClick={() => navigate(`/products/${data.slug}`)}
              className={cn(
                "font-medium text-gray-900 cursor-pointer hover:text-amber-700 transition-colors line-clamp-2",
                mode === "small" ? "text-sm" : "text-base"
              )}
            >
              {data.name}
            </h3>
            <button
              onClick={() => removeMutation.mutate(data.productVariantId)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <HiOutlineTrash className="size-5" />
            </button>
          </div>

          {/* Attributes / Phân loại */}
          <p className="text-xs text-gray-500 italic">
            Phân loại: <span className="text-gray-700">{data.attributes || "Mặc định"}</span>
          </p>
        </div>

        {/* 3. Giá và Bộ chọn số lượng */}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-amber-700">{formatCurrency(data.price)}</span>
              {data.originalPrice > data.price && (
                <span className="text-xs text-gray-400 line-through">
                  {formatCurrency(data.originalPrice)}
                </span>
              )}
            </div>
            {/* Tình trạng kho */}
            {data.stock < 10 && (
              <p className="text-[10px] text-orange-500 font-medium italic">
                Chỉ còn {data.stock} sản phẩm
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className={cn(mode === "small" ? "scale-90 origin-right" : "")}>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={data.stock}
                onMode={mode}
                disabled={isProcessing}
              />
            </div>

            {/* Tổng tiền món này */}
            {mode === "large" && (
              <div className="text-right min-w-[100px]">
                <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">
                  Thành tiền
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {formatCurrency(data.price * quantity)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Overlay Spinner (Optional) */}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/20">
          <div className="size-5 border-2 border-amber-700 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
