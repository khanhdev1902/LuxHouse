import type { ProductDetail } from "@/shared/types/product";

export default function RelatedProducts({
  categories,
}: {
  categories: ProductDetail["categories"];
}) {
  console.log(categories);
  return (
    <div>
      <div className="text-2xl flex justify-center items-center font-semibold">
        SẢN PHẨM LIÊN QUAN
      </div>
      {/* <ProductSlider/> */}
    </div>
  );
}
