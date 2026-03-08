import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../apis/category.api";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getLstCategories(),
    select: (res) => res.data,
  });
};
