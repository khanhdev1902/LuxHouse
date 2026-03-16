import ProductSlider from "@/features/products/components/ProudctSlider";
import { useProducts } from "@/features/products/hooks/useProducts";
import type { ProductDetail } from "@/shared/types/product";

export default function RelatedProducts({
  categories,
}: {
  categories: ProductDetail["categories"];
}) {
  const c = categories.map((c) => c.slug).join(", ");
  console.log("categories", categories);
  const { data: products = [] } = useProducts({ categories: c });
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-3 py-2">
        <p className="text-3xl flex justify-center items-center font-semibold">SẢN PHẨM LIÊN QUAN</p>
        <p className="w-40 border-b-2 border-gray-800"></p>
      </div>
      <ProductSlider products={products} />
    </div>
  );
}
