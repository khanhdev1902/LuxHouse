import { Breadcrumbs } from "@/shared/components/ui/BreadCrumb";
import Container from "@/shared/components/ui/Container";
import type { Cart } from "@/shared/types/cart";
import { formatCurrency } from "@/utils/formatCurrency";
import CartItem from "@/shared/components/cart/CartItem";
import { cart } from "@/shared/constant/const-home";

const policies: React.ReactNode[] = [
  <>
    <strong>Không rủi ro.</strong> Đặt hàng trước, thanh toán sau tại nhà.{" "}
    <strong>Miễn phí giao hàng & lắp đặt</strong> tại các quận thuộc TP.HCM, Hà Nội, khu đô thị
    Ecopark, Biên Hòa và một số khu vực thuộc Bình Dương (*)
  </>,
  <>
    Đơn hàng của quý khách sẽ được <strong>giao hàng trong vòng 3 ngày</strong>, vui lòng đợi nhân
    viên tư vấn xác nhận lịch giao hàng trước khi thực hiện chuyển khoản đơn hàng
  </>,
  <>
    <strong>Miễn phí 1 đổi 1</strong> - Bảo hành 2 năm - Bảo trì trọn đời (**)
  </>,
  <>
    Tất cả sản phẩm được thiết kế bởi các chuyên gia thiết kế nội thất đến từ{" "}
    <strong>Đan Mạch và Hàn Quốc</strong>
  </>,
  <>
    <strong>Chất lượng Quốc Tế</strong> đảm bảo theo tiêu chuẩn cho người dùng tại Việt Nam
  </>,
  <>
    Sản xuất tại nhà máy SAVIMEX với gần <strong>40 năm kinh nghiệm</strong>
  </>,
];

export default function Cart() {
  const totalAmount = cart.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  return (
    <>
      <Breadcrumbs />
      <Container className="flex flex-col text-gray-900 w-full h-full">
        <h1 className="w-full text-center font-bold text-3xl my-10">Giỏ hàng của bạn</h1>
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          <div className="lg:col-span-7 flex flex-col gap-2">
            {cart.cartItems.length > 0 ? (
              <div className="flex flex-col">
                <div className="bg-gray-100 p-3 mb-3 rounded text-sm text-gray-700">
                  Có <strong>{cart.cartItems.length} sản phẩm</strong> trong giỏ hàng của bạn!
                </div>
                {cart.cartItems.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
                <div className="flex flex-col gap-3 p-4 bg-gray-100 rounded mt-5">
                  <h2 className="font-bold text-gray-700">Ghi chú đơn hàng</h2>
                  <textarea className="border w-full rounded p-3 h-40" />
                </div>
              </div>
            ) : (
              <div className="text-xl">Giỏ hàng của bạn đang trống !</div>
            )}
          </div>
          <div className="lg:col-span-3 flex flex-col gap-5">
            <div className="w-full border px-5 py-2 rounded-sm text-lg font-bold">
              <h1 className="border-b py-3">Thông tin đơn hàng</h1>
              <div className="flex flex-row justify-between border-b py-3">
                <span>Tổng tiền:</span>
                <span className="text-[#ef683a] text-xl">{formatCurrency(totalAmount)}</span>
              </div>
              <button className="my-3 border rounded-xl w-full py-2 mx-2 bg-red-500 text-white">
                THANH TOÁN
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              {policies.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✔</span>
                  <p className="leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
