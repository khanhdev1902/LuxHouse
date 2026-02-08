export const productListSelect = {
  id: true,
  name: true,
  slug: true,
  price: true,
  images: { select: { url: true } },
};

export const productDetailSelect = {
  ...productListSelect,
  code: true,
  stock: true,
  categories: {
    select: {
      category: { select: { name: true, slug: true } },
    },
  },
  createdAt: true,
};
