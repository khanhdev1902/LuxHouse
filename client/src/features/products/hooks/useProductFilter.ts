import React from "react";

export function useProductFilter() {
  const [categories, setCategories] = React.useState<string[]>([]);
  return { categories, setCategories };
}