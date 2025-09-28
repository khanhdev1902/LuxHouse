import BreadCrumb from "@/components/ui/BreadCrumb";
import Container from "@/components/ui/Container";
import { useState } from "react";
export default function Products() {
  const [categories, setCategories] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setCategories(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // bỏ nếu đã có
          : [...prev, value] // thêm nếu chưa có
    );
  };
  return (
    <>
      <BreadCrumb />
      <div className="w-full h-auto">
        <img src="/bg-products.jpg" alt="" />
      </div>
      <Container>
        <nav>
          <div className=" flex flex-row justify-between my-4">
            <span className="text-3xl font-bold">Bộ sưu tập sản phẩm ZORO</span>

            <select id="category" name="category" className=" bottom-1 border-gray-100 p-1 px-3">
              <option value="">--Sản phẩm nổi bật--</option>
              <option value="Increasing">Giá: Tăng dần</option>
              <option value="Decreasing">Giá: Giảm dần</option>
              <option value="Latest">Mới nhất</option>
              <option value="Oldest">Cũ nhất</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium">Chọn danh mục:</span>

            <label>
              <input
                type="checkbox"
                checked={categories.includes("phone")}
                onChange={() => handleChange("phone")}
              />
              Điện thoại
            </label>

            <label>
              <input
                type="checkbox"
                checked={categories.includes("laptop")}
                onChange={() => handleChange("laptop")}
              />
              Laptop
            </label>

            <label>
              <input
                type="checkbox"
                checked={categories.includes("tablet")}
                onChange={() => handleChange("tablet")}
              />
              Máy tính bảng
            </label>

            <label>
              <input
                type="checkbox"
                checked={categories.includes("camera")}
                onChange={() => handleChange("camera")}
              />
              Máy ảnh
            </label>

            <div className="mt-2 text-sm text-gray-700">
              Đã chọn:{" "}
              {categories.length > 0 ? categories.join(", ") : "Chưa chọn gì"}
            </div>
          </div>
        </nav>
      </Container>
    </>
  );
}
