export const formatCurrency = (amount: number, currency: "VND" | "USD" = "VND") => {
  return (
    new Intl.NumberFormat(currency === "VND" ? "vi-VN" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  );
};
