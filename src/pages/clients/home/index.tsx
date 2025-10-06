import Container from "@/components/ui/Container";
import Banner from "./components/Banner";
import ProductSlider from "@/components/clients/product/ProudctSlider";
import ProductCard from "@/components/clients/product/ProductCard";
import { dataTestProducts } from "@/constant/const-home";

export default function Home() {
  return (
    <>
      <Banner />
      <Container className="pt-5 space-y-5">
        <section className=" w-full">
          <ProductSlider
            title="Hàng mới"
            products={dataTestProducts.slice(2, 9)}
            slidesPerView={4}
          />
        </section>
        <section className="">
          <div>Bán chạy</div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {dataTestProducts.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
