import Container from "@/shared/components/ui/Container";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaPhoneAlt,
  FaHome,
  FaBriefcase,
  FaTrashAlt,
  FaPen,
} from "react-icons/fa";

const addressList = [
  {
    id: 1,
    name: "Nguyễn Văn Admin",
    phone: "090 ••• 8888",
    address: "Căn hộ A12, Tòa nhà Serenity Sky Villas, 259 Điện Biên Phủ",
    ward: "Phường Võ Thị Sáu, Quận 3",
    city: "TP. Hồ Chí Minh",
    isDefault: true,
    type: "Nhà riêng",
    icon: <FaHome />,
  },
  {
    id: 2,
    name: "Nguyễn Văn Admin",
    phone: "098 ••• 3210",
    address: "Tòa nhà Bitexco Financial, Số 2 Hải Triều",
    ward: "Phường Bến Nghé, Quận 1",
    city: "TP. Hồ Chí Minh",
    isDefault: false,
    type: "Văn phòng",
    icon: <FaBriefcase />,
  },
];

export default function Addresses() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-light tracking-tight text-[#2D2D2D] font-serif text-center md:text-left">
                Sổ địa chỉ <span className="font-semibold text-[#A6894B]">Giao hàng</span>
              </h2>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-2 text-center md:text-left">
                Quản lý các địa điểm nhận tuyệt tác nội thất
              </p>
            </div>

            <button className="flex items-center gap-3 px-8 py-3 bg-[#2D2D2D] text-white text-[11px] uppercase tracking-widest font-bold hover:bg-[#C5A25D] transition-all shadow-lg active:scale-95">
              <FaPlus className="size-3" /> Thêm địa chỉ mới
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {addressList.map((addr) => (
              <div
                key={addr.id}
                className={`bg-white border transition-all duration-300 relative group overflow-hidden ${
                  addr.isDefault
                    ? "border-[#C5A25D] shadow-md"
                    : "border-[#E8E2DA] hover:border-gray-300 shadow-sm"
                }`}
              >
                {/* Badge Trạng thái */}
                {addr.isDefault && (
                  <div className="absolute top-0 right-0 bg-[#C5A25D] text-white text-[9px] uppercase font-bold px-3 py-1 tracking-wider">
                    Mặc định
                  </div>
                )}

                <div className="p-8">
                  {/* Header Card */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-full bg-[#F8F5F2] text-[#A6894B] flex items-center justify-center border border-[#E8E2DA]">
                      {addr.icon}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#A6894B] font-bold tracking-widest">
                        {addr.type}
                      </span>
                      <h4 className="text-lg font-medium text-[#2D2D2D] flex items-center gap-2">
                        {addr.name}
                      </h4>
                    </div>
                  </div>

                  {/* Body Card */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <FaPhoneAlt className="mt-1 text-gray-300 size-3" />
                      <span>{addr.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <FaMapMarkerAlt className="mt-1 text-gray-300 size-3" />
                      <p>
                        {addr.address}
                        <br />
                        {addr.ward}, {addr.city}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-6 border-t border-[#F5F5F0] flex justify-between items-center">
                    <div className="flex gap-4">
                      <button className="text-[10px] uppercase font-bold text-gray-400 hover:text-[#2D2D2D] transition-colors flex items-center gap-2">
                        <FaPen className="size-2.5" /> Chỉnh sửa
                      </button>
                      {!addr.isDefault && (
                        <button className="text-[10px] uppercase font-bold text-red-300 hover:text-red-500 transition-colors flex items-center gap-2">
                          <FaTrashAlt className="size-2.5" /> Xóa
                        </button>
                      )}
                    </div>

                    {!addr.isDefault && (
                      <button className="text-[10px] uppercase font-bold text-[#A6894B] border-b border-[#A6894B] pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        Đặt làm mặc định
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State / Add Placeholder - Giúp lấp đầy khoảng trống */}
            <div className="border-2 border-dashed border-[#E8E2DA] rounded-sm flex flex-col items-center justify-center p-12 text-gray-400 hover:bg-[#FDFCFB] hover:border-[#C5A25D] transition-all group cursor-pointer">
              <div className="size-12 rounded-full border border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaPlus className="size-4" />
              </div>
              <p className="text-[11px] uppercase tracking-widest font-bold">
                Thêm địa chỉ giao hàng
              </p>
              <p className="text-[10px] mt-2 italic">Dành cho các dự án nội thất mới</p>
            </div>
          </div>

          {/* Lưu ý nhỏ */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-xs italic">
              * Lưu ý: Địa chỉ mặc định sẽ được ưu tiên sử dụng cho các đơn hàng và báo giá thi
              công.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
