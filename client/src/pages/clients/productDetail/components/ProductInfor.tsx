import { QuantitySelector } from "@/components/ui/QuantitySelecter";
import Rating from "@/components/ui/Rating";
import type { ProductDetail } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa6";

type ProductInforProps = {
  product: ProductDetail;
  selectVariant: ProductDetail["variants"][number] | null;
  onVariantChange?: (variantId: string) => void;
};

export default function ProductInfor({
  product,
  selectVariant,
  onVariantChange,
}: ProductInforProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

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
          {formatCurrency((selectVariant?.price ?? 0) * (1 - Number(selectVariant?.discount?.value ?? 0) / 100))}
        </span>
        <s className="text-gray-500 ">${formatCurrency(selectVariant?.price ?? 0)}</s>
      </div>

      {product.options.map((option) => (
        <div
          key={option.name}
          className="flex flex-row items-center gap-4 border-t border-gray-200 pt-3"
        >
          <span className="font-semibold text-gray-700 min-w-12">{option.name}:</span>
          <div className="flex flex-row items-center gap-2">
            {option.values.map((value) => (
              <button
                key={value}
                onClick={() => handleOptionChange(option.name, value)}
                className={`px-3 py-1 border rounded text-xs font-semibold text-gray-700 ${
                  selectedOptions[option.name] === value ? "border-[#ef683a]" : "border-gray-300"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      <p className="text-gray-700 mb-6">{product.description}</p>

      <div className="flex border-t border-gray-200 pt-3">
        <QuantitySelector
          min={1}
          max={selectVariant?.stock}
          value={quantity}
          onChange={setQuantity}
        />
      </div>

      <div>
        <button className="w-full bg-[#27678f] text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
          THÊM VÀO GIỎ HÀNG
        </button>
        <button className="w-full mt-3 bg-[#ef683a] text-white font-bold border border-gray-300 py-3 rounded-lg">
          MUA NGAY
        </button>
      </div>
    </div>
  );
}
