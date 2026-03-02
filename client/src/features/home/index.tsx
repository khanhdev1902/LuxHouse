import Container from "@/shared/components/ui/Container";
import Banner from "./components/Banner";
import ProductSlider from "@/shared/components/product/ProudctSlider";
import ProductCard from "@/shared/components/product/ProductCard";
import { useProducts } from "@/shared/hooks/useProducts";
import Loading from "@/shared/components/ui/Loading";

export default function Home() {
  const { data: products, isLoading, error, isFetching, status } = useProducts();
  console.log({ products, isLoading, isFetching, status, error });
  if (!products.length) {
    return (
      <>
        <Banner />
        <Loading />
      </>
    );
  }
  return (
    <>
      <Banner />
      <Container className="pt-5 space-y-5">
        <section className=" w-full">
          <ProductSlider title="Hàng mới" products={products.slice(0, 9)} slidesPerView={4} />
        </section>
        <section className="">
          <div>Bán chạy</div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {products.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
