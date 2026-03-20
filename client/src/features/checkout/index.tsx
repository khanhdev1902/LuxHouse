import { tokenManager } from "@/lib/tokenManager";
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../cart/hooks/useCart";
import CheckOutProduct from "./components/CheckOutProduct";
import { formatCurrency } from "@/utils/formatCurrency";
import type { OrderRequest } from "../orders/types/order.type";
import { toast } from "sonner";
import { orderApi } from "../orders/apis/order.api";
import useAddress from "../addresses/hooks/useAddress";
import { useQueryClient } from "@tanstack/react-query";

export default function CheckOut() {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = tokenManager.getAccessToken();
  const { addresses, isLoading } = useAddress();
  const queryClient = useQueryClient();
  const uAddrDefault = useMemo(() => addresses.find((addr) => addr.isDefault), [addresses]);

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const checkoutType = location.state?.type ?? "cart";
  const data = location.state?.data;

  const { data: cart } = useCart({
    enabled: checkoutType === "cart",
  });

  // Khởi tạo state cho form
  const [orderRequest, setOrderRequest] = useState<OrderRequest>({
    checkoutType: checkoutType,
    productVariantId: (data?.variant?.id && Number(data?.variant?.id)) ?? null,
    quantity: data?.quantity ?? 1,
    shippingName: uAddrDefault?.fullName ?? "",
    shippingPhone: uAddrDefault?.phoneNumber ?? "",
    shippingCountry: "Vietnam",
    shippingCity: uAddrDefault?.province ?? "",
    shippingAddress: [uAddrDefault?.district, uAddrDefault?.streetAddress]
      .filter(Boolean)
      .join(" "),
    voucherCode: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    if (uAddrDefault) {
      setOrderRequest((prev) => ({
        ...prev,
        shippingName: uAddrDefault.fullName,
        shippingPhone: uAddrDefault.phoneNumber,
        shippingCity: uAddrDefault.province,
        shippingAddress: `${uAddrDefault.district || ""} ${uAddrDefault.streetAddress || ""}`,
      }));
    }
  }, [uAddrDefault]);

  // Tính toán dữ liệu hiển thị và tổng tiền
  const { displayProducts, totalPrice, totalDiscount } = useMemo(() => {
    if (checkoutType === "cart" && cart) {
      const total = cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { displayProducts: cart.cartItems, totalPrice: total, totalDiscount: 0 };
    }

    if (data) {
      const price = data.variant?.price * (1 - Number(data.variant?.discount?.value || 0) / 100);
      const original = data.variant?.price || 0;
      return {
        displayProducts: [
          {
            name: data.product?.name,
            imageUrl: data.variant?.images?.[0]?.url,
            price: price,
            originalPrice: original,
            quantity: data.quantity,
            productVariantId: data.variant?.id,
          },
        ],
        totalPrice: price * data.quantity,
        totalDiscount: (original - price) * data.quantity,
      };
    }

    return { displayProducts: [], totalPrice: 0, totalDiscount: 0 };
  }, [checkoutType, cart, data]);

  // State quản lý lỗi
  const [errors, setErrors] = useState<Partial<Record<keyof OrderRequest, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderRequest((prev) => ({ ...prev, [name]: value }));
    // Xóa lỗi của field đó khi người dùng bắt đầu nhập lại
    if (errors[name as keyof OrderRequest]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Hàm Validate chính
  const validateForm = () => {
    const newErrors: Partial<Record<keyof OrderRequest, string>> = {};
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;

    if (!orderRequest.shippingName.trim()) newErrors.shippingName = "Vui lòng nhập họ tên";
    if (!orderRequest.shippingPhone.trim()) {
      newErrors.shippingPhone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(orderRequest.shippingPhone)) {
      newErrors.shippingPhone = "Số điện thoại không đúng định dạng VN";
    }
    if (!orderRequest.shippingCity.trim()) newErrors.shippingCity = "Vui lòng nhập tỉnh/thành phố";
    if (!orderRequest.shippingAddress.trim())
      newErrors.shippingAddress = "Vui lòng nhập địa chỉ cụ thể";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = async () => {
    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin giao hàng!");
      return;
    }

    try {
      console.log("Gửi đơn hàng:", orderRequest);
      toast.loading("Đang đặt hàng...");
      orderRequest.checkoutType === "cart"
        ? await orderApi.createOrderFormCart(orderRequest)
        : await orderApi.createOrderFormBuyNow(orderRequest);
      toast.dismiss();
      toast.success("Đặt hàng thành công!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/orders");
    } catch (error: any) {
      toast.dismiss();
      console.log("haaaaaaaaaaaaaaaaaaaaaaaa", error);
      const message =
        error?.response?.data?.message || error?.message || "Có lỗi xảy ra, thử lại sau.";
      toast.error(message);
    }
  };
  return (
    <div className="min-h-screen bg-[#f8f8f8] py-8 px-4 font-sans text-[#333]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CỘT TRÁI */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold mb-5 uppercase tracking-wide">Thông tin giao hàng</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className={`${isLoading && " animate-puls"}`}>
                <label className="text-[11px] font-semibold text-gray-500 uppercase ml-1">
                  Họ và tên
                </label>
                <input
                  name="shippingName"
                  type="text"
                  placeholder="Nhập tên..."
                  value={orderRequest.shippingName}
                  onChange={handleInputChange}
                  className={` w-full border border-gray-300 p-2.5 rounded mt-1 focus:ring-1 focus:ring-black outline-none transition `}
                />
                {errors.shippingName && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.shippingName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase ml-1">
                    Số điện thoại
                  </label>
                  <input
                    name="shippingPhone"
                    type="tel"
                    placeholder="Nhập số điện thoại..."
                    value={orderRequest.shippingPhone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2.5 rounded mt-1 outline-none focus:ring-1 focus:ring-black"
                  />
                  {errors.shippingPhone && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.shippingPhone}</p>
                  )}
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase ml-1">
                    Thành phố / Tỉnh
                  </label>
                  <input
                    name="shippingCity"
                    type="text"
                    placeholder="VD: Hà Nội"
                    value={orderRequest.shippingCity}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2.5 rounded mt-1 outline-none focus:ring-1 focus:ring-black"
                  />
                  {errors.shippingCity && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.shippingCity}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-500 uppercase ml-1">
                  Địa chỉ cụ thể
                </label>
                <input
                  name="shippingAddress"
                  type="text"
                  placeholder="Số nhà, tên đường..."
                  value={orderRequest.shippingAddress}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 rounded mt-1 outline-none focus:ring-1 focus:ring-black"
                />
                {errors.shippingAddress && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.shippingAddress}</p>
                )}
              </div>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">
              Phương thức thanh toán
            </h2>
            <div className="divide-y border border-gray-200 rounded-md">
              {[
                { id: "ZALOPAY", label: "🏦 Thanh toán qua ZALOPAY" },
                { id: "COD", label: "💵 Thanh toán khi nhận hàng (COD)" },
                { id: "QR", label: "📲 Chuyển khoản qua QR - VCB" },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center p-4 cursor-pointer transition ${orderRequest.paymentMethod === method.id ? "bg-gray-50 border-l-4 border-black" : ""}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={orderRequest.paymentMethod === method.id}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="ml-3 text-sm">{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-md border border-gray-200 shadow-sm">
            <h2 className="font-bold mb-4">Sản phẩm ({displayProducts.length})</h2>
            <div className="max-h-[400px] overflow-y-auto space-y-3">
              {displayProducts.map((item, index) => (
                <CheckOutProduct key={index} product={item} />
              ))}
            </div>
            {totalDiscount > 0 && (
              <p className="text-[11px] text-red-500 mt-3 font-medium text-right italic">
                Bạn đã được giảm {formatCurrency(totalDiscount)}
              </p>
            )}
          </div>

          <div className="bg-white p-5 rounded-md border border-gray-200 shadow-sm">
            <h2 className="font-bold mb-4 text-sm">Tóm tắt đơn hàng</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tổng tiền hàng</span>
                <span className="font-medium">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phí vận chuyển</span>
                <span className="text-green-600 font-medium">Miễn phí</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t mt-2">
                <span className="font-bold">Tổng thanh toán</span>
                <span className="text-xl font-extrabold text-black">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>
            <button
              onClick={handleOrder}
              className="w-full bg-black text-white py-4 rounded mt-6 font-bold uppercase tracking-widest hover:bg-zinc-800 transition active:scale-[0.98]"
            >
              Đặt hàng ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
