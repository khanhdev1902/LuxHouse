import Container from "@/components/ui/Container";
import Banner from "./components/Banner";
import ProductSlider from "@/components/user/product/ProudctSlider";

const sampleProducts = [
  {
    id: 1,
    title: "Ghế Sofa Vải MOHO GIORGIO - MOHO Signature hahhah ahaha ahhah",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 12990000,
  },
  {
    id: 2,
    title: "Full Combo Phòng Khách 5 Món MOHO HOBRO",
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
    id: 5,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 6,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 7,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 8,
    title: "Bàn ăn gỗ sồi",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_vline_noi_tat_moho_5a78a6e6a8c1423cbaf8e1977d924692_master.jpg",
    price: 7990000,
  },
  {
    id: 9,
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
      <Container className="pt-5 space-y-5">
        <section className=" w-full">
          <ProductSlider
            title="Hàng mới"
            products={sampleProducts}
            slidesPerView={4}
          />
        </section>
        <section className=" w-full">
          <ProductSlider
            title="Hàng mới"
            products={sampleProducts}
            slidesPerView={4}
          />
        </section>
        <section className=" w-full">
          <ProductSlider
            title="Hàng mới"
            products={sampleProducts}
            slidesPerView={4}
          />
        </section>
        <section className=" w-full">
          <ProductSlider
            title="Hàng mới"
            products={sampleProducts}
            slidesPerView={4}
          />
        </section>
      </Container>
    </>
  );
}
