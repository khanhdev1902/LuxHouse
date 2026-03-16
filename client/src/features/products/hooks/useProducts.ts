import { useQuery } from "@tanstack/react-query";
import { productApi } from "../apis/product.api";
import type { ApiResponse } from "@/shared/types/api-response";
import type { ProductListItem } from "@/shared/types/product";
import type { ProductQuery } from "../types/productQuery.type";
// import { toast } from "sonner";

// export const useProducts = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: productApi.getProducts,
//     initialData: [],
//     // staleTime: 6 *1000,
//     select: (res) => {
//       console.log();
//       return res.data;
//     },
//   });
// };
export const useProducts = (params?: ProductQuery) => {
  // toast.info("DataQuery", {
  //   description: params?.categories,
  // });
  return useQuery<ApiResponse<ProductListItem[]>, Error, ProductListItem[]>({
    queryKey: ["products", params],
    queryFn: () => productApi.getProducts(params),
    select: (res) => res.data,
  });
};

export const useProductDetail = (slug: string) =>
  useQuery({
    queryKey: ["product", slug],
    queryFn: () => productApi.getProductBySlug(slug),
    enabled: !!slug,
    select: (res) => res.data,
  });
