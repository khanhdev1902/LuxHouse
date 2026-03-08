export type ProductQuery = {
  search?: string;
  category?: string;
  categories?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc" | "newest";
};
