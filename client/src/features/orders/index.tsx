import Container from "@/shared/components/ui/Container";
import { FaReceipt, FaGem, FaShippingFast, FaSearch } from "react-icons/fa";
import { orderApi } from "./apis/order.api";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { LoadingOverlay } from "@/shared/components/ui/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import type { OrderResponse } from "./types/order.type";

export default function Orders() {
  const [orderData, setOrderData] = useState<OrderResponse[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await orderApi.getMyListOrder();
    setOrderData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("orderData:", orderData);
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-10">
      <Container>
        <div className="grid grid-cols-12 gap-8 relative">
          {/* CỘT TRÁI: BỘ LỌC VÀ THÔNG TIN PHỤ (3 CỘT) */}
          <div className="col-span-12 lg:col-span-3 space-y-6 sticky self-start top-44">
            <div className="bg-white border border-[#EAE4DD] p-6">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#A6894B] mb-6">
                Quản lý mua hàng
              </h3>
              <nav className="space-y-1">
                {[
                  "Tất cả đơn hàng",
                  "Đang xử lý",
                  "Đang vận chuyển",
                  "Đã hoàn thành",
                  "Đã hủy",
                ].map((tab, i) => (
                  <button
                    key={tab}
                    className={`w-full text-left px-4 py-3 text-sm transition-all ${i === 0 ? "bg-[#2D2D2D] text-white" : "text-gray-500 hover:bg-[#F5F5F0]"}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-[#2D2D2D] p-6 text-white relative overflow-hidden">
              <FaGem className="absolute -right-4 -bottom-4 size-24 opacity-10 text-[#C5A25D]" />
              <p className="text-[10px] uppercase tracking-widest text-[#C5A25D] font-bold mb-2">
                Hạng thẻ Diamond
              </p>
              <p className="text-sm font-light leading-relaxed">
                Bạn nhận được đặc quyền bảo trì nội thất định kỳ miễn phí.
              </p>
              <button className="mt-4 text-[10px] uppercase border-b border-[#C5A25D] text-[#C5A25D] pb-1">
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: DANH SÁCH ĐƠN HÀNG (9 CỘT) - Tận dụng tối đa Width */}
          <div className="col-span-12 lg:col-span-9 space-y-6 relative">
            {/* Search Bar - Làm giao diện bớt trống và chuyên nghiệp hơn */}
            <div className="flex gap-4 mb-8">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mã đơn hàng hoặc tên sản phẩm..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#EAE4DD] text-sm outline-none focus:border-[#C5A25D] transition-all"
                />
              </div>
              <button className="px-8 bg-white border border-[#EAE4DD] text-[11px] uppercase tracking-widest font-bold hover:bg-gray-50">
                Lọc đơn
              </button>
            </div>

            {orderData.length <= 0 ? (
              <LoadingOverlay />
            ) : (
              orderData.map((order, key) => (
                <div key={key} className="bg-white border border-[#EAE4DD] shadow-sm group">
                  {/* Order Header */}
                  <div className="px-8 py-5 border-b border-[#F5F5F0] flex justify-between items-center bg-[#FCFBFA]">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-[9px] uppercase text-gray-400 font-bold tracking-tighter">
                          Mã đơn hàng
                        </p>
                        <p className="text-sm text-center font-semibold text-[#2D2D2D]">
                          {order?.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase text-gray-400 font-bold tracking-tighter">
                          Ngày đặt
                        </p>
                        <p className="text-sm text-[#2D2D2D]">{order?.createdAt}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase text-gray-400 font-bold tracking-tighter">
                        Trạng thái
                      </p>
                      <p className="text-xs text-[#A6894B] font-bold uppercase tracking-widest flex items-center gap-2 justify-end">
                        <span className="size-1.5 bg-[#A6894B] rounded-full animate-pulse"></span>{" "}
                        {order?.status}
                      </p>
                    </div>
                  </div>

                  {/* Items Grid - Tận dụng width bằng cách hiển thị Grid 3 cột */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {order?.orderItems.map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-3 group/item cursor-pointer">
                          <div
                            onClick={() => navigate(`/products/${item?.slug}`)}
                            className="overflow-hidden bg-[#F5F5F0]"
                          >
                            <img
                              src={item?.imageUrl}
                              className="w-full h-40 object-cover group-hover/item:scale-105 transition-transform duration-500 opacity-90"
                            />
                          </div>
                          <div>
                            <p className="text-xs uppercase text-[#A6894B] font-bold tracking-wide">
                              {item?.attribute && `${item?.attribute}`}
                            </p>
                            <h4 className="text-sm font-medium text-[#2D2D2D] line-clamp-1">
                              {item?.name}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {`${formatCurrency(item?.unitPrice)}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer - Tóm tắt tiền tệ trải dài */}
                  <div className="px-8 py-6 border-t border-[#F5F5F0] flex justify-between items-center">
                    <div className="flex gap-6 text-[#999]">
                      <FaReceipt
                        className="hover:text-[#A6894B] cursor-pointer transition-colors"
                        title="Tải hóa đơn VAT"
                      />
                      <FaShippingFast
                        className="hover:text-[#A6894B] cursor-pointer transition-colors"
                        title="Tra cứu vận chuyển"
                      />
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <p className="text-[10px] uppercase text-gray-400 font-bold tracking-[0.2em]">
                          Tổng thanh toán
                        </p>
                        <p className="text-xl font-light text-[#2D2D2D] tracking-tight">
                          {formatCurrency(order?.totalAmount ?? 0)}
                        </p>
                      </div>
                      <button className="px-10 py-3 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#C5A25D] transition-all duration-300">
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
