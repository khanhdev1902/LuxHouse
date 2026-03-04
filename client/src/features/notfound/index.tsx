import Container from "@/shared/components/ui/Container";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center bg-[#FDFCFB]">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Số 404 nghệ thuật với Typography lớn */}
          <div className="relative">
            <h1 className="text-[150px] md:text-[200px] font-serif font-light leading-none text-[#EAE4DD] select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm uppercase tracking-[0.5em] text-[#A6894B] font-bold mt-20">
                Lost Space
              </p>
            </div>
          </div>

          {/* Nội dung thông báo */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif text-[#2D2D2D] tracking-tight">
                Không gian này <br />{" "}
                <span className="italic font-light">đang được hoàn thiện.</span>
              </h2>
              <div className="w-20 h-[1px] bg-[#C5A25D] mx-auto md:mx-0"></div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Có vẻ như trang bạn đang tìm kiếm đã được di dời hoặc không tồn tại trong bộ sưu tập
              của Luxhouse.
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate("/")}
                className="group flex items-center justify-center md:justify-start gap-4 text-[11px] uppercase tracking-[0.3em] font-bold text-[#2D2D2D] hover:text-[#C5A25D] transition-all duration-500"
              >
                <div className="size-10 rounded-full border border-[#EAE4DD] flex items-center justify-center group-hover:border-[#C5A25D] group-hover:bg-[#C5A25D] group-hover:text-white transition-all duration-500">
                  <FaLongArrowAltLeft className="size-4" />
                </div>
                <span>Trở về trang chủ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Decor phía dưới cho đỡ trống width */}
        <div className="mt-20 flex justify-center gap-20 opacity-20 filter grayscale contrast-125">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=200"
            alt="decor"
            className="h-32 object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1616489953149-755e74c0e72d?q=80&w=200"
            alt="decor"
            className="h-32 object-cover hidden md:block"
          />
          <img
            src="https://images.unsplash.com/photo-1615876234586-4465890347cc?q=80&w=200"
            alt="decor"
            className="h-32 object-cover hidden md:block"
          />
        </div>
      </Container>
    </div>
  );
}
