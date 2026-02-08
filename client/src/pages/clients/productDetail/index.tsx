import { Breadcrumbs } from "@/components/ui/BreadCrumb";
import Container from "@/components/ui/Container";
import { useProductDetail } from "@/hooks/useProducts";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError, error } = useProductDetail(slug!);
  console.log({ product, isLoading, isError, error });
  if (!product) return <div>Loading...</div>;
  return (
    <>
      <Breadcrumbs name={product.name} />
      <Container className="w-full h-full bg-blue-300 flex flex-col items-center justify-center">
        <div>haha</div>
        <div>hhh</div>
      </Container>
    </>
  );
}
