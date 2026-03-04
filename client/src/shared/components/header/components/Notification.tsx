import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiNotificationLine } from "react-icons/ri";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import useToggle from "@/shared/hooks/useToggle";
import useClickOutside from "@/shared/hooks/use-click-outside";
import { cn } from "@/lib/utils";

// Dữ liệu mẫu cho thông báo chuyên nghiệp
const notifications = [
  {
    id: 1,
    title: "Xác nhận đơn hàng",
    content: "Đơn hàng sofa bộ Lux-01 của bạn đã được xác nhận.",
    time: "2 phút trước",
    isUnread: true,
  },
  {
    id: 2,
    title: "Ưu đãi đặc quyền",
    content: "Giảm 10% cho bộ sưu tập 'Spring Interior' dành riêng cho bạn.",
    time: "1 giờ trước",
    isUnread: true,
  },
  {
    id: 3,
    title: "Lịch hẹn tư vấn",
    content: "KTS. Hoàng Nam sẽ gọi cho bạn lúc 14:00 hôm nay.",
    time: "5 giờ trước",
    isUnread: false,
  },
];

export default function Notification() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { value: isOpen, toggle, off } = useToggle(false);
  useClickOutside(ref, off);

  return (
    <div ref={ref} className="relative cursor-pointer select-none">
      {/* Trigger: Icon & Label */}
      <div onClick={toggle} className="flex items-center gap-2.5 group transition-all duration-300">
        <div className="relative">
          <RiNotificationLine
            className={cn(
              "size-5 transition-colors",
              isOpen ? "text-[#A6894B]" : "text-[#2D2D2D] group-hover:text-[#A6894B]"
            )}
          />
          {/* Badge: Nhỏ gọn, màu Gold đồng bộ với Cart */}
          <span className="absolute -top-2 -right-2 bg-[#A6894B] h-4 min-w-4 px-1 flex justify-center items-center rounded-full text-white font-bold text-[9px] leading-none shadow-sm">
            13
          </span>
        </div>
        <span className="text-[13px] font-medium text-[#2D2D2D] hidden xl:block uppercase tracking-wider group-hover:text-[#A6894B] transition-colors">
          Thông báo
        </span>
      </div>

      {/* Dropdown Menu: Tối ưu không gian giống Account Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 z-[100] mt-4 w-80 bg-white border border-[#E8E2DA] shadow-[0_20px_40px_rgba(0,0,0,0.06)] rounded-sm overflow-hidden"
          >
            {/* Header Dropdown */}
            <div className="px-5 py-4 bg-[#FAF9F6] border-b border-[#E8E2DA] flex justify-between items-center">
              <div>
                <h3 className="text-[12px] font-bold text-[#2D2D2D] uppercase tracking-widest">
                  Thông báo
                </h3>
                <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-tighter font-medium">
                  Luxhouse Updates
                </p>
              </div>
              <button className="text-[10px] text-[#A6894B] hover:underline flex items-center gap-1 font-medium transition-all">
                <IoCheckmarkDoneOutline size={14} />
                Đánh dấu đã đọc
              </button>
            </div>

            {/* List Content */}
            <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((noti) => (
                  <div
                    key={noti.id}
                    className={cn(
                      "px-5 py-4 border-b border-[#F5F1ED] last:border-none cursor-pointer transition-colors",
                      noti.isUnread ? "bg-[#FAF9F6]/30 hover:bg-[#FAF9F6]" : "hover:bg-gray-50"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4
                        className={cn(
                          "text-[12px] font-bold leading-tight truncate pr-4",
                          noti.isUnread ? "text-[#2D2D2D]" : "text-gray-500"
                        )}
                      >
                        {noti.title}
                      </h4>
                      {noti.isUnread && (
                        <div className="size-1.5 bg-[#A6894B] rounded-full shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-2 font-light">
                      {noti.content}
                    </p>
                    <span className="text-[9px] text-gray-300 font-medium uppercase tracking-tighter">
                      {noti.time}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <RiNotificationLine className="size-8 text-[#E8E2DA] mx-auto mb-3" />
                  <p className="text-xs text-gray-400 font-light italic">Không có thông báo mới.</p>
                </div>
              )}
            </div>

            {/* Footer Dropdown */}
            <div
              className="py-3 bg-white border-t border-[#F5F1ED] text-center"
              onClick={() => off()}
            >
              <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#2D2D2D] hover:text-[#A6894B] transition-colors">
                Xem tất cả thông báo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
