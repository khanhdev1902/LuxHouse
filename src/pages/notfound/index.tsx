import Container from "@/components/ui/Container";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container className=" flex flex-col py-20 justify-center items-center text-4xl gap-5">
      <span>Quay lại trang chủ</span>
      <button
        onClick={() => navigate("/")}
        className="text-xl text-col-hover font-bold border border-gray-200 rounded-xl shadow-xl px-20 py-8 hover:scale-110 active:scale-90 transition-all duration-300 ease-in-out"
      >
        {"Click me =))"}
      </button>
    </Container>
  );
}
