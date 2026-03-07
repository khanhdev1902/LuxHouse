import { tokenManager } from "@/lib/tokenManager";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../cart/hooks/useCart";
import CheckOutProduct from "./components/CheckOutProduct";
// import { toast } from "sonner";
import { formatCurrency } from "@/utils/formatCurrency";

export default function CheckOut() {
  const navigation = useNavigate();
  const location = useLocation();
  const accessToken = tokenManager.getAccessToken();
  const checkoutType = location.state?.type ?? "cart";
  const data = location.state?.data;
  console.log("checkout data productDetail:", data);
  const product = {
    name: data?.product?.name,
    imageUrl: data?.variant?.images[0].url,
    attributes: "",
    productVariantId: data?.variant?.id,
    originalPrice: data?.variant?.price,
    price: data?.variant?.price * (1 - Number(data?.variant?.discount.value || 0) / 100),
    quantity: data?.quantity,
  };
  useEffect(() => {
    if (!accessToken) {
      navigation("/");
    }
  }, [navigation]);
  // toast.success(checkoutType);
  const { data: cart } = useCart({
    enabled: checkoutType === "cart",
  });

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-8 px-4 font-sans text-[#333]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CỘT TRÁI (8 CỘT) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Banner Đăng nhập */}
          {!accessToken && (
            <div className="bg-white p-4 rounded-md border border-gray-200 flex justify-between items-center shadow-sm">
              <p className="text-sm text-gray-600 font-medium">
                Đăng nhập để mua hàng tiện lợi và nhận nhiều ưu đãi hơn nữa
              </p>
              <button className="bg-[#e8e8e8] px-6 py-2 rounded text-sm font-semibold hover:bg-gray-200 transition">
                Đăng nhập
              </button>
            </div>
          )}

          {/* Form Thông tin giao hàng */}
          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold mb-5 uppercase tracking-wide">Thông tin giao hàng</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="group">
                <label className="text-[11px] font-semibold text-gray-500 uppercase ml-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  defaultValue="Nguyễn Astro"
                  className="w-full border border-gray-300 p-2.5 rounded mt-1 focus:ring-1 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase ml-1">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      defaultValue="0987654321"
                      className="w-full border border-gray-300 p-2.5 rounded mt-1 outline-none"
                    />
                    <span className="absolute right-3 top-4">🇻🇳</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="astro@gmail.com"
                    className="w-full border border-gray-300 p-2.5 rounded mt-1 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-500 uppercase ml-1">
                  Quốc gia
                </label>
                <select className="w-full border border-gray-300 p-2.5 rounded mt-1 outline-none bg-white">
                  <option>Vietnam</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Địa chỉ, tên đường"
                className="w-full border border-gray-300 p-2.5 rounded outline-none"
              />
              <input
                type="text"
                defaultValue="Xã Thạch Hải, Huyện Thạch Hà, Hà Tĩnh"
                className="w-full border border-gray-300 p-2.5 rounded outline-none bg-gray-50"
              />
            </div>
          </div>

          {/* Phương thức giao hàng */}
          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">
              Phương thức giao hàng
            </h2>
            <div className="border-2 border-black p-4 rounded-md flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-4 border-black rounded-full"></div>
                <p className="text-sm font-medium">
                  Các tỉnh thành không thuộc khu vực miễn phí giao hàng & lắp đặt...
                </p>
              </div>
              <span className="font-bold text-sm">Miễn phí</span>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">
              Phương thức thanh toán
            </h2>
            <div className="divide-y border border-gray-200 rounded-md">
              <label className="flex items-center p-4 cursor-pointer hover:bg-gray-50">
                <input type="radio" name="pay" className="w-4 h-4 accent-black" />
                <span className="ml-3 text-sm flex items-center gap-2">
                  🏦 Thanh toán chuyển khoản qua ngân hàng
                </span>
              </label>
              <label className="flex items-center p-4 cursor-pointer hover:bg-gray-50">
                <input type="radio" name="pay" className="w-4 h-4 accent-black" />
                <span className="ml-3 text-sm flex items-center gap-2">
                  💳 Thanh toán quẹt thẻ khi giao hàng (POS)
                </span>
              </label>
              <label className="flex items-center p-4 cursor-pointer border-2 border-black bg-gray-50">
                <input type="radio" name="pay" className="w-4 h-4 accent-black" defaultChecked />
                <span className="ml-3 text-sm flex items-center gap-2">
                  📲 Chuyển khoản qua QR - VCB
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (4 CỘT) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Giỏ hàng */}
          <div className="bg-white p-5 rounded-md border border-gray-200 shadow-sm">
            <h2 className="font-bold mb-4">Giỏ hàng</h2>
            {checkoutType === "cart" ? (
              cart?.cartItems.map((product) => <CheckOutProduct product={product} />)
            ) : (
              <CheckOutProduct product={product} />
            )}
            <p className="text-[11px] text-red-500 mt-3 font-medium text-right italic">
              {`Bạn đã được giảm ${formatCurrency(product.originalPrice - product.price || 0)} ⌄`}
            </p>
          </div>

          {/* Mã khuyến mãi */}
          <div className="bg-white p-5 rounded-md border border-gray-200 shadow-sm">
            <h2 className="font-bold mb-3 text-sm">Mã khuyến mãi</h2>
            <div className="border border-gray-200 rounded p-3 mb-3 flex justify-between items-center cursor-pointer">
              <span className="text-sm text-gray-400">🎫 Chọn mã</span>
              <span className="text-[11px] bg-blue-50 text-blue-500 px-2 py-1 rounded border border-blue-100 font-medium">
                ✨ Giảm giá 6% ›
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã khuyến mãi"
                className="flex-1 border border-gray-200 p-2 rounded text-sm outline-none"
              />
              <button className="bg-black text-white px-4 py-2 rounded text-sm font-bold">
                Áp dụng
              </button>
            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="bg-white p-5 rounded-md border border-gray-200 shadow-sm">
            <h2 className="font-bold mb-4 text-sm">Tóm tắt đơn hàng</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tổng tiền hàng</span>
                <span className="font-medium">8,490,000đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phí vận chuyển</span>
                <span className="text-gray-400 italic">Miễn phí</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t mt-2">
                <span className="font-bold">Tổng thanh toán</span>
                <span className="text-lg font-extrabold">8,490,000đ</span>
              </div>
            </div>
            <button className="w-full bg-black text-white py-4 rounded mt-6 font-bold uppercase tracking-widest hover:bg-gray-800 transition shadow-lg">
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
