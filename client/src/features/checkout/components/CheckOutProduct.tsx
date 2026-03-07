import { formatCurrency } from "@/utils/formatCurrency";

type CheckOutProduct = {
  productVariantId: number;
  name?: string;
  slug?: string;
  originalPrice: number;
  price: number;
  quantity?: number;
  imageUrl?: string;
  attributes?: string;
};

export default function CheckOutProduct({ product }: { product: CheckOutProduct }) {
  return (
    <div className="flex gap-4 py-3 border-b last:border-0">
      {/* Ảnh sản phẩm với Badge số lượng */}
      <div className="relative">
        <img
          src={product.imageUrl}
          className="w-16 h-16 rounded-lg object-cover border bg-gray-50"
          alt={product.name}
        />
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-[10px] font-medium text-white shadow-sm">
          {product.quantity}
        </span>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
            {product.name}
          </h3>
          {product.attributes && (
            <p className="mt-0.5 text-[11px] text-gray-500">Phân loại: {product.attributes}</p>
          )}
        </div>

        <div className="flex items-end justify-between">
          <p className="text-xs text-gray-500">Số lượng: {product.quantity}</p>
          <div className="text-right">
            {product.originalPrice > product.price && (
              <p className="text-[10px] text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
            <p className="text-sm font-semibold text-red-600">{formatCurrency(product.price)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
