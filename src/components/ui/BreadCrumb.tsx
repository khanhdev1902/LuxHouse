import Container from "./Container";
import { useNavigate } from "react-router-dom";
//duong dan dieu huong
export default function BreadCrumb() {
  const navigation = useNavigate();
  return (
    <div className="w-full bg-[#F5F5F5]">
      <Container className="py-2 flex flex-row gap-2 items-center flex-wrap">
        <span
          onClick={() => navigation("/")}
          className="text-sm text-[#434343] cursor-pointer"
        >
          Trang chủ
        </span>
        <span
          onClick={() => navigation("/products")}
          className="text-sm text-[#434343] cursor-pointer"
        >
          <span className="text-[#434343] pr-2">/</span>
          Sản phẩm
        </span>
        <span className="text-sm text-[#777777]">
          <span className="text-[#434343] pr-2">/</span>
          Bộ Bàn Ghế Ăn 4 Ghế Gỗ Tự Nhiên PLANK
        </span>
      </Container>
    </div>
  );
}
