import { useState } from "react";
import type { ProductDetail } from "@/shared/types/product";

const lstTitle = [
  { id: "desc", label: "Mô tả" },
  { id: "review", label: "Đánh giá" },
  { id: "policy", label: "Chính sách" },
  { id: "care", label: "Bảo quản" },
];

export default function ProductStory({ product }: { product?: ProductDetail }) {
  const [activeTab, setActiveTab] = useState("desc");

  const renderContent = () => {
    if (!product) return <p className="text-gray-400 italic">Đang tải dữ liệu...</p>;

    switch (activeTab) {
      case "desc":
        return <div className="animate-fadeIn">{"Chưa có thông tin..."}</div>;
      case "review":
        return <div className="animate-fadeIn">Chưa có thông tin...</div>;
      case "policy":
        return <div className="animate-fadeIn">Chưa có thông tin...</div>;
      case "care":
        return <div className="animate-fadeIn">Chưa có thông tin...</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Tab Header */}
      <header className="flex border-b border-gray-200 bg-gray-50/50">
        {lstTitle.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-8 py-4 text-sm font-medium transition-all duration-200 relative
                ${isActive ? "text-[#a6894b]" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}
              `}
            >
              {tab.label}

              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#a6894b] transition-all" />
              )}
            </button>
          );
        })}
      </header>

      {/* Tab Content Body */}
      <main className="p-6 min-h-[200px] text-gray-700 leading-relaxed text-sm">{renderContent()}</main>
    </div>
  );
}
