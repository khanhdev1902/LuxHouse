import { useState, useEffect, useMemo } from "react";
import type { ProductDetail } from "@/shared/types/product";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  product: ProductDetail;
  selectedVariant: ProductDetail["variants"][number] | null;
  onVariantChange: (variantId: string) => void;
};

export default function ProductGallery({
  product,
  selectedVariant,
  onVariantChange,
}: ProductGalleryProps) {
  const [keyImage, setKeyImage] = useState({ variantId: "", url: "" });

  // Flatten toàn bộ ảnh 1 lần
  const allImages = useMemo(() => {
    return product.variants.flatMap((variant) =>
      variant.images.map((img) => ({
        ...img,
        variantId: variant.id,
      }))
    );
  }, [product.variants]);
  console.log("All images:", allImages);

  useEffect(() => {
    if (!selectedVariant) return;

    setKeyImage((prev) => {
      if (prev.variantId === selectedVariant.id) return prev;

      const mainImage =
        selectedVariant.images.find((img) => img.isMain)?.url ??
        selectedVariant.images[0]?.url ??
        "";

      return {
        variantId: selectedVariant.id,
        url: mainImage,
      };
    });
  }, [selectedVariant]);

  return (
    <div className="grid lg:grid-cols-10 gap-2 xl:gap-4">
      {/* Thumbnail */}
      <div
        className={cn(
          "order-2 flex items-center justify-between",
          "lg:order-none lg:col-span-2 lg:block"
        )}
      >
        {allImages.map((image) => (
          <img
            key={`${image.variantId}-${image.url}`}
            src={image.url}
            alt={product.name}
            onClick={() => {
              setKeyImage({ variantId: image.variantId, url: image.url });
              onVariantChange(image.variantId);
            }}
            className={cn(
              "w-16 h-16 object-cover rounded-lg mb-4 cursor-pointer",
              image.url === keyImage.url && "border border-red-500"
            )}
          />
        ))}
      </div>

      {/* Main Image */}
      {selectedVariant ? (
        <div className={cn("order-1", " lg:col-span-8 lg:order-none")}>
          {keyImage.url && (
            <img
              src={keyImage.url}
              alt={`${product.name} - Main`}
              className="w-full h-auto object-cover rounded-lg"
            />
          )}
        </div>
      ) : (
        <div className="col-span-8 flex items-center justify-center bg-gray-100 rounded-lg">
          <span className="text-gray-500">
            Phiên bản này hiện đã hết hàng. Vui lòng chọn biến thể khác.
          </span>
        </div>
      )}
    </div>
  );
}
