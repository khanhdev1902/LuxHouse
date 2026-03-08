import { useSearchParams } from "react-router-dom";

export const useProductQuery = () => {
  const [params, setParams] = useSearchParams();

  const search = params.get("search") || "";
  const page = Number(params.get("page") || 1);
  const category = params.get("category") || "";

  const setSearch = (value: string) => {
    params.set("search", value);
    params.set("page", "1"); // search mới → reset page
    setParams(params);
  };

  const setPage = (value: number) => {
    params.set("page", String(value));
    setParams(params);
  };

  const setCategory = (value: string) => {
    params.set("category", value);
    params.set("page", "1");
    setParams(params);
  };

  return {
    search,
    page,
    category,
    setSearch,
    setPage,
    setCategory,
  };
};
