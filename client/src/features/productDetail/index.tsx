import { Breadcrumbs } from "@/shared/components/ui/BreadCrumb";
import Container from "@/shared/components/ui/Container";
import ProductGallery from "./components/ProductGallery";
import ProductInfor from "./components/ProductInfor";
import { useProductDetail } from "@/features/products/hooks/useProducts";
import { useParams } from "react-router-dom";
import RelatedProducts from "./components/RelatedProducts";
import { useEffect, useState } from "react";
import type { ProductDetail } from "@/shared/types/product";
import Loading from "@/shared/components/ui/Loading";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isError, error } = useProductDetail(slug!);
  const [selectedVariant, setSelectedVariant] = useState<ProductDetail["variants"][number] | null>(
    null
  );

  useEffect(() => {
    if (product?.defaultVariantId) {
      setSelectedVariant(product.variants.find((v) => v.id === product.defaultVariantId) || null);
    }
  }, [product]);

  if (!product) return <Loading />;
  // if (isLoading) return <div className="py-32 text-center">Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const handleVariantChange = (variantId: string) => {
    setSelectedVariant(product.variants.find((v) => v.id === variantId) || null);
  };

  return (
    <>
      <Breadcrumbs name={product.name} />

      <Container className="py-8">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-10 lg:gap-10 xl:gap-16">
          <div className="lg:col-span-6">
            <ProductGallery
              product={product}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
            />
          </div>

          <div className="lg:col-span-4 sticky top-28 h-fit">
            <ProductInfor
              product={product}
              selectVariant={selectedVariant}
              onVariantChange={handleVariantChange}
            />
          </div>
        </div>

        {/* Story */}
        <section className="mt-32">{/* <ProductStory product={product} /> */}</section>

        <RelatedProducts categories={product.categories} />
      </Container>
    </>
  );
}
