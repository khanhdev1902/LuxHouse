import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { QuantitySelector } from "@/features/cart/components/QuantitySelecter";
import Rating from "@/shared/components/ui/Rating";
import type { ProductDetail } from "@/shared/types/product";
import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { tokenManager } from "@/lib/tokenManager";
import { toast } from "sonner";
import { Check } from "lucide-react";

type ProductInforProps = {
  product: ProductDetail;
  selectVariant: ProductDetail["variants"][number] | null;
  onVariantChange?: (variantId: string) => void;
};
const policyData = [
  {
    id: 1,
    content:
      "Miễn phí giao hàng & lắp đặt tại tất cả quận huyện thuộc TP.HCM, Hà Nội, Khu đô thị Ecopark, Biên Hòa và một số quận thuộc Bình Dương",
    noteSymbol: "(*)",
  },
  {
    id: 2,
    content: "Miễn phí 1 đổi 1 - Bảo hành 5 năm - Bảo trì trọn đời",
    noteSymbol: "(**)",
  },
];

const extraNotes = [
  { symbol: "(*)", text: "Không áp dụng cho danh mục Đồ Trang Trí và Nệm" },
  {
    symbol: "(**)",
    text: "Không áp dụng cho các sản phẩm Clearance. Chỉ bảo hành 01 năm cho khung ghế, mâm và cần đối với Ghế Văn Phòng",
  },
];
export default function ProductInfor({
  product,
  selectVariant,
  onVariantChange,
}: ProductInforProps) {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const { mutate, isPending } = useAddToCart();
  const accessToken = tokenManager.getAccessToken();

  const handleAddToCart = () => {
    console.log("Adding to cart:", {
      productVariantId: Number(selectVariant?.id),
      quantity,
      isPending,
    });
    mutate({
      productVariantId: Number(selectVariant?.id),
      quantity: quantity,
    });
  };

  const handleCheckOut = () => {
    if (!accessToken) return toast.info("Bạn cần đăng nhập để thực hiện chức năng này!");
    navigate("/checkout", {
      state: {
        type: "productDetail",
        data: {
          product: product,
          variant: selectVariant,
          quantity: quantity,
        },
      },
    });
  };

  useEffect(() => {
    if (selectVariant) {
      const initialOptions: Record<string, string> = {};
      selectVariant.attributes.forEach((attr) => {
        initialOptions[attr.name] = attr.value;
      });
      setSelectedOptions(initialOptions);
    }
  }, [selectVariant]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: value,
    };
    console.log("Selected Variant:", selectVariant);
    console.log("Selected Options:", newSelectedOptions);
    const matchedVariant = product.variants.find((variant) =>
      variant.attributes.every((attr) => newSelectedOptions[attr.name] === attr.value)
    );

    setSelectedOptions(newSelectedOptions);
    onVariantChange?.(matchedVariant ? matchedVariant.id : "");
  };
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="text-xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Rating rating={product.averageRating} />
            <span className="text-sm text-gray-500">({product.reviewCount ?? 0} reviews)</span>
          </div>
          <div className="flex flex-row items-center gap-2 text-sm font-medium text-gray-500 cursor-pointer">
            <span>Chia sẻ:</span>
            <FaFacebook className=" text-blue-700 size-5" />
            <span className="pl-3">Đã bán: {product.sold ?? 0}</span>
          </div>
        </div>
        <p className="pt-2 font-bold text-gray-600 text-sm uppercase">
          SKU:
          <span className=" font-medium pl-2">{selectVariant?.sku ?? "N/A"}</span>
        </p>
      </div>

      <div className="flex flex-row items-center gap-4 border-t border-gray-200 pt-3">
        <span className="font-medium text-red-500 px-4 py-1 bg-gray-100">{`-${selectVariant?.discount?.value ?? 0}%`}</span>
        <span className=" text-lg font-semibold text-red-500">
          $
          {formatCurrency(
            (selectVariant?.price ?? 0) * (1 - Number(selectVariant?.discount?.value ?? 0) / 100)
          )}
        </span>
        <s className="text-gray-500 ">${formatCurrency(selectVariant?.price ?? 0)}</s>
      </div>

      {product.options.map((option) => (
        <div
          key={option.name}
          className="flex flex-row items-center gap-4 border-t border-gray-200 pt-3"
        >
          {/* <span className="font-semibold text-gray-700 min-w-12">{option.name}:</span> */}
          <div className="flex flex-row items-center gap-2">
            {option.values.map((value) => (
              <button
                key={value}
                onClick={() => handleOptionChange(option.name, value)}
                className={`px-5 py-2 border rounded-lg text-xs font-semibold text-gray-700 ${
                  selectedOptions[option.name] === value
                    ? "border-[#a6894b] text-[#a6894b] font-bold"
                    : "border-gray-300"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="text-gray-600 border-t border-gray-200 pt-3 text-sm font-medium space-y-2">
        <strong>Thông số chi tiết</strong>
        <table className="w-full text-sm">
          <tbody>
            {product.description
              ?.split("/")
              .map((item) => item.trim())
              .map((item, i) => (
                <tr key={i} className={item.endsWith(":") ? "font-bold mt-4" : "pl-4"}>
                  <td className="py-1">{item}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex border-t border-gray-200 pt-3">
        <QuantitySelector
          min={1}
          max={selectVariant?.stock}
          value={quantity}
          onChange={setQuantity}
        />
      </div>

      <div>
        <button
          onClick={handleAddToCart}
          disabled={!selectVariant || isPending}
          className="w-full bg-[#27678f] text-white font-bold py-3 rounded-lg hover:bg-[#1a4a6b] transition-colors"
        >
          {isPending ? "Đang thêm vào giỏ..." : "THÊM VÀO GIỎ HÀNG"}
        </button>
        <button
          disabled={!selectVariant || isPending}
          onClick={handleCheckOut}
          className="w-full mt-3 bg-[#a6894b] text-white font-bold border border-gray-300 py-3 rounded-lg"
        >
          MUA NGAY
        </button>
      </div>

      <div className="max-w-2xl px-6 bg-white font-sans text-[#333]">
        <div className="space-y-2">
          {policyData.map((item) => (
            <div key={item.id}>
              <div className="text-[15px] leading-relaxed">
                <Check className="inline size-5 mr-1 text-gray-700" strokeWidth={3} />
                {item.content} <span className="text-gray-500">{item.noteSymbol}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 border-t pt-4 border-gray-100 mt-4">
          {extraNotes.map((note, index) => (
            <p key={index} className="text-sm italic text-[#555] leading-snug">
              <span className="font-medium mr-1">{note.symbol}</span>
              {note.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
