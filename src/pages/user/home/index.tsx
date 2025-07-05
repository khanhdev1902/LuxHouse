import Container from "@/components/ui/Container";
import Banner from "./components/Banner";
import ProductSlider from "@/components/user/product/ProudctSlider";

const sampleProducts = [
  {
    id: 1,
    title: "Sofa nỉ cao cấp ",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 12990000,
  },
  {
    id: 2,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 3,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 4,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 4,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 4,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 4,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 4,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 4,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
];

export default function Home() {
  return (
    <>
      <Banner />
      <Container>
        <section className=" w-full h-10">
          <ProductSlider
            title="Gợi ý hôm nay"
            products={sampleProducts}
            slidesPerView={4}
          />
        </section>
      </Container>
    </>
  );
}
