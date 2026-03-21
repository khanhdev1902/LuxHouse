import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { orderApi } from "../orders/apis/order.api";
import { formatCurrency } from "@/utils/formatCurrency";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Payment() {
  const { orderCode } = useParams(); // Lấy mã đơn hàng từ URL: /payment/:orderCode
  const navigate = useNavigate();

  // 1. Lấy thông tin đơn hàng từ BE
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderCode],
    queryFn: () => orderApi.getOrderByCode(orderCode!),
    enabled: !!orderCode,
    refetchInterval: 5000, // Cứ 5 giây tự gọi API một lần để check trạng thái thanh toán (Polling)
  });

  // 2. Tự động chuyển trang khi BE báo đã thanh toán thành công
  useEffect(() => {
    if (order?.status === "SUCCESS") {
      toast.success("Thanh toán thành công!");
      navigate("/orders"); // Hoặc trang danh sách đơn hàng
    }
  }, [order?.status, navigate]);

  if (isLoading) return <div className="text-center py-20">Đang tải thông tin thanh toán...</div>;
  if (error || !order)
    return <div className="text-center py-20 text-red-500">Không tìm thấy đơn hàng!</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {/* Header trang thanh toán */}
        <div className="bg-black text-white p-6 text-center">
          <h1 className="text-xl font-bold uppercase tracking-wider">Thanh toán qua QR</h1>
          <p className="text-gray-400 text-sm mt-1">Đơn hàng: #{orderCode}</p>
        </div>

        <div className="p-8 flex flex-col items-center">
          {/* Thông tin số tiền */}
          <div className="text-center mb-6">
            <span className="text-gray-500 text-sm uppercase font-semibold">Tổng số tiền</span>
            <div className="text-3xl font-extrabold text-red-600 mt-1">
              {formatCurrency(order.totalPrice)}
            </div>
          </div>

          {/* Mã QR */}
          <div className="relative p-4 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            {/* Giả sử BE trả về link ảnh QR trong order.qrCodeUrl */}
            <img
              src={order.QRCODE_URL}
              alt="QR Code thanh toán"
              className="w-64 h-64 object-contain transition-opacity hover:opacity-90"
            />

            {/* Hiệu ứng quét quét cho nó nguy hiểm */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-scan opacity-50 shadow-[0_0_10px_red]"></div>
          </div>

          {/* Hướng dẫn */}
          <div className="mt-8 w-full space-y-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                1
              </span>
              <p>Mở ứng dụng Ngân hàng hoặc Ví điện tử của bạn.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                2
              </span>
              <p>
                Chọn chức năng <b>Quét mã QR</b> và quét ảnh phía trên.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                3
              </span>
              <p>
                Kiểm tra thông tin và nhấn <b>Xác nhận thanh toán</b>.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/orders")}
            className="mt-8 text-gray-400 hover:text-black transition text-sm underline decoration-dotted"
          >
            Quay lại danh sách đơn hàng
          </button>
        </div>

        {/* Footer thông báo chờ */}
        <div className="bg-gray-50 p-4 border-t flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 italic">
            Đang chờ hệ thống xác nhận thanh toán...
          </span>
        </div>
      </div>

      {/* CSS cho hiệu ứng quét (Bạn có thể bỏ vào file CSS global) */}
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          position: absolute;
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
