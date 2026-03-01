import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getProducts } from "@/shared/services/product.service";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialData: [],
    // staleTime: 6 *1000,
  });
};

export const useProductDetail = (slug: string) =>
  useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });