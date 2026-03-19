import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaTimes, FaMapMarkerAlt, FaPhoneAlt, FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { addressSchema, type AddressFormValues } from "../schemas/address.schema";
import type { AddressType } from "../types/address.type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddressFormValues) => void;
  initialData?: AddressType | null;
  isPending?: boolean;
}

export default function AddressModal({ isOpen, onClose, onSubmit, initialData, isPending }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressType: "HOME",
      isDefault: false,
    },
  });

  const addressType = watch("addressType");
  // Reset form khi đóng/mở hoặc khi có data mới (để Edit)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        addressType: "HOME",
        isDefault: false,
        fullName: "",
        phoneNumber: "",
        province: "",
        district: "",
        ward: "",
        streetAddress: "",
      });
    }
  }, [initialData, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-[#1A1A1A] p-6 text-white flex justify-between items-center">
          <h3 className="text-xl tracking-wide text-[#A6894B] not-italic font-bold">
            {initialData ? "Cập nhật" : "Thêm"}{" "}
            <span className="text-[#A6894B] not-italic font-bold">địa chỉ giao hàng!</span>
          </h3>
          <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
            <FaTimes className="size-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => {
            const parsed = addressSchema.parse(data);
            onSubmit(parsed);
          })}
          className="p-8 space-y-6"
        >
          {/* Row 1: Tên & SĐT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                <FaUser className="size-2.5" /> Họ và tên
              </label>
              <input
                {...register("fullName")}
                placeholder="Nguyễn Văn Admin"
                className={`w-full border-b py-2 focus:border-[#A6894B] outline-none transition-colors text-sm ${errors.fullName ? "border-red-400" : "border-[#E8E2DA]"}`}
              />
              {errors.fullName && (
                <p className="text-[10px] text-red-500 italic">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                <FaPhoneAlt className="size-2.5" /> Số điện thoại
              </label>
              <input
                {...register("phoneNumber")}
                placeholder="09xxx"
                className={`w-full border-b py-2 focus:border-[#A6894B] outline-none transition-colors text-sm ${errors.phoneNumber ? "border-red-400" : "border-[#E8E2DA]"}`}
              />
              {errors.phoneNumber && (
                <p className="text-[10px] text-red-500 italic">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Tỉnh - Huyện - Xã */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                Tỉnh / Thành
              </label>
              <input
                {...register("province")}
                placeholder="Hà Nội"
                className="w-full border-b border-[#E8E2DA] py-2 focus:border-[#A6894B] outline-none text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                Quận / Huyện
              </label>
              <input
                {...register("district")}
                placeholder="Nam Từ Liêm"
                className="w-full border-b border-[#E8E2DA] py-2 focus:border-[#A6894B] outline-none text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                Phường / Xã
              </label>
              <input
                {...register("ward")}
                placeholder="Mễ Trì"
                className="w-full border-b border-[#E8E2DA] py-2 focus:border-[#A6894B] outline-none text-sm"
              />
              {errors.ward && (
                <p className="text-[10px] text-red-500 italic">{errors.ward.message}</p>
              )}
            </div>
          </div>

          {/* Row 3: Địa chỉ cụ thể */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
              <FaMapMarkerAlt className="size-2.5" /> Địa chỉ cụ thể
            </label>
            <input
              {...register("streetAddress")}
              placeholder="Số nhà, tên tòa nhà, tên đường..."
              className="w-full border-b border-[#E8E2DA] py-2 focus:border-[#A6894B] outline-none text-sm"
            />
          </div>

          {/* Row 4: Loại địa chỉ & Mặc định */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
            <div className="flex gap-4">
              {(["HOME", "OFFICE", "OTHER"] as const).map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    value={type}
                    {...register("addressType")}
                    className="hidden"
                  />
                  <div
                    className={`px-4 py-2 border text-[10px] font-bold tracking-widest transition-all ${
                      addressType === type
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "border-[#E8E2DA] text-gray-400 hover:border-[#A6894B]"
                    }`}
                  >
                    {type}
                  </div>
                </label>
              ))}
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                {...register("isDefault")}
                className="size-4 accent-[#A6894B]"
              />
              <span className="text-[11px] font-bold text-[#2D2D2D] uppercase tracking-wider">
                Đặt làm mặc định
              </span>
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 pt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-[#E8E2DA] text-[11px] uppercase tracking-widest font-bold hover:bg-gray-50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-4 bg-[#A6894B] text-white text-[11px] uppercase tracking-widest font-bold hover:bg-[#8E743D] transition-all shadow-lg shadow-[#A6894B]/20 disabled:opacity-50"
            >
              {isPending ? "Đang xử lý..." : initialData ? "Lưu thay đổi" : "Xác nhận thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
