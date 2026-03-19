import Container from "@/shared/components/ui/Container";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaPhoneAlt,
  FaHome,
  FaBriefcase,
  FaTrashAlt,
  FaPen,
  FaEllipsisV,
} from "react-icons/fa";
import useAddress from "./hooks/useAddress";
import type { AddressType } from "./types/address.type";
import AddressModal from "./components/AddressModal";
import { useState } from "react";

export default function Addresses() {
  const { addresses, isLoading, onDelete, onUpdate, onCreate, isPending } = useAddress();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);

  const IconAddress = {
    HOME: <FaHome />,
    OFFICE: <FaBriefcase />,
    OTHER: <FaMapMarkerAlt />,
  };

  const handleSetDefault = (id: number) => {
    onUpdate(id, { isDefault: true });
  };

  const handleOpenCreate = () => {
    setSelectedAddress(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr: AddressType) => {
    setSelectedAddress(addr);
    setIsModalOpen(true);
  };

  return (
    <Container className=" relative min-h-screen bg-[#FAF9F6] py-12 w-full">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6 border-b border-[#E8E2DA] pb-8">
          <div className="space-y-2">
            <h2 className="text-4xl text-[#1A1A1A]">
              Sổ địa chỉ <span className="italic text-[#A6894B]">Giao hàng</span>
            </h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-medium">
              Nơi lưu giữ các tọa độ không gian sống của LuxHouse
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="group relative flex items-center gap-3 px-10 py-4 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:bg-[#A6894B] disabled:opacity-50"
            disabled={isPending}
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaPlus className="size-3" /> Thêm địa chỉ mới
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Trạng thái Loading Skeleton */}
          {isLoading &&
            [1, 2].map((i) => (
              <div
                key={i}
                className="h-[300px] bg-white animate-pulse border border-[#F0EDE8] p-10"
              >
                <div className="size-12 bg-gray-100 mb-6"></div>
                <div className="h-6 bg-gray-100 w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-100 w-full mb-2"></div>
                <div className="h-4 bg-gray-100 w-2/3"></div>
              </div>
            ))}

          {/* Danh sách địa chỉ thực tế */}
          {!isLoading &&
            addresses.map((addr: AddressType) => (
              <div
                key={addr.id}
                className={`group relative bg-white transition-all duration-500 hover:-translate-y-2 ${
                  addr.isDefault
                    ? "ring-1 ring-[#A6894B] shadow-[0_20px_50px_rgba(166,137,75,0.1)]"
                    : "border border-[#F0EDE8] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                }`}
              >
                {addr.isDefault && (
                  <div className="absolute -top-3 -right-3 bg-[#A6894B] text-white text-[9px] uppercase font-bold px-4 py-2 tracking-tighter shadow-lg rotate-3 z-20">
                    Mặc định
                  </div>
                )}

                {isPending && (
                  <div className=" absolute inset-0 m-auto bg-white bg-opacity-35 z-10 flex justify-center items-center">
                    <div className=" animate-spin rounded-full border-4 border-main border-b-white w-8 h-8 opacity-80 duration-700"></div>
                  </div>
                )}

                <div className="p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <div
                        className={`size-12 flex items-center justify-center text-lg transition-colors ${
                          addr.isDefault ? "bg-[#A6894B] text-white" : "bg-[#F8F5F2] text-[#A6894B]"
                        }`}
                      >
                        {IconAddress[addr.addressType as keyof typeof IconAddress] || (
                          <FaMapMarkerAlt />
                        )}
                      </div>
                      <div>
                        <span className="text-[9px] uppercase text-[#A6894B] font-bold tracking-[0.2em]">
                          {addr.addressType}
                        </span>
                        <h4 className="text-xl font-semibold text-gray-600">{addr.fullName}</h4>
                      </div>
                    </div>
                    <button className="text-gray-300 hover:text-[#1A1A1A] transition-colors p-2">
                      <FaEllipsisV />
                    </button>
                  </div>

                  <div className="space-y-4 mb-8 min-h-[80px]">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FaPhoneAlt className="text-[#A6894B]/50 size-3" />
                      <span className="tracking-widest">{addr.phoneNumber}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <FaMapMarkerAlt className="mt-1 text-[#A6894B]/50 size-3" />
                      <p>
                        {addr.streetAddress}
                        <br />
                        <span className="text-gray-400">
                          {addr.ward}, {addr.district}, {addr.province}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#F8F5F2] flex justify-between items-center">
                    <div className="flex gap-6">
                      <button
                        onClick={() => handleOpenEdit(addr)}
                        className="text-[10px] uppercase font-bold text-gray-400 hover:text-[#A6894B] transition-colors flex items-center gap-2"
                      >
                        <FaPen className="size-2.5" /> Sửa
                      </button>
                      {!addr.isDefault && (
                        <button
                          onClick={() => onDelete(addr.id!)}
                          className="text-[10px] uppercase font-bold text-red-200 hover:text-red-500 transition-colors flex items-center gap-2"
                        >
                          <FaTrashAlt className="size-2.5" /> Xóa
                        </button>
                      )}
                    </div>

                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefault(addr.id!)}
                        className="text-[10px] uppercase font-bold text-[#A6894B] border-b border-transparent hover:border-[#A6894B] transition-all opacity-0 group-hover:opacity-100"
                      >
                        Đặt làm mặc định
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

          {/* Nút thêm địa chỉ nhanh */}
          <div
            onClick={handleOpenCreate}
            className="border-2 border-dashed border-[#E8E2DA] flex flex-col items-center justify-center p-12 text-gray-400 hover:bg-white hover:border-[#A6894B] transition-all group cursor-pointer min-h-[300px]"
          >
            <div className="size-14 rounded-full border border-gray-200 flex items-center justify-center mb-4 group-hover:bg-[#1A1A1A] group-hover:text-white transition-all duration-500">
              <FaPlus className="size-4" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]">
              Thêm địa chỉ giao hàng
            </p>
            <p className="text-[10px] mt-2 italic font-serif">
              Dành cho các tuyệt tác nội thất mới
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center border-t border-[#E8E2DA] pt-8">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest">
            © 2026 LuxHouse Nội thất ZORO — Premium Furniture Experience
          </p>
        </div>
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedAddress}
        onSubmit={(data) => {
          if (selectedAddress) onUpdate(selectedAddress.id, data);
          else onCreate(data);
          setIsModalOpen(false);
        }}
        isPending={isPending}
      />
    </Container>
  );
}
