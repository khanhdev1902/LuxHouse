const AboutLuxhouse = () => {
  return (
    <div className="bg-white text-[#333] font-serif">
      {/* SECTION 1: HERO - Bố cục lệch tầng (ảnh 1) */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 relative">
          <div className="border-[1px] border-gray-200 p-2 inline-block">
            <img
              src="https://via.placeholder.com/500x650" // Thay bằng ảnh Mr. Juanny
              alt="Director"
              className="w-full object-cover"
            />
          </div>
          {/* Label tên đè lên ảnh hoặc sát cạnh */}
          <div className="mt-4">
            <h2 className="text-xl font-medium tracking-widest uppercase">
              Mr. Juanny Barceló Borges
            </h2>
            <p className="text-gray-400 italic text-sm">Design Director</p>
          </div>
        </div>

        <div className="md:w-1/2 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.3em] text-gray-400 uppercase">Introduction</h3>
            <h1 className="text-5xl font-light leading-tight">
              Nội thất <br /> <span className="font-bold">Luxhouse</span>
            </h1>
          </div>
          <p className="text-lg leading-relaxed font-sans font-light text-gray-600 max-w-lg">
            Trong nhịp sống đô thị hiện đại, Luxhouse mang đến giải pháp nội thất:
            <span className="text-black font-medium">
              {" "}
              An toàn & Bền vững - Giá trị thực tế - Đẹp và Hiện đại.
            </span>
          </p>
          <div className="w-20 h-[1px] bg-black"></div>
        </div>
      </section>

      {/* SECTION 2: TẦM NHÌN & SỨ MỆNH (Bố cục ảnh 2) */}
      <section className="bg-[#f9f9f9] py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-6">
            <h4 className="text-2xl italic border-b border-black pb-4 w-fit">Tầm nhìn</h4>
            <p className="font-sans text-gray-600 leading-loose">
              Trở thành thương hiệu nội thất Việt tiên phong trong việc mang đến lối sống tối giản,
              an toàn và bền vững cho mọi gia đình Việt Nam.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-2xl italic border-b border-black pb-4 w-fit">Sứ mệnh</h4>
            <p className="font-sans text-gray-600 leading-loose">
              Cam kết kiến tạo không gian sống chất lượng. Mỗi sản phẩm bạn chọn tại Luxhouse đều là
              một lời hứa về sự tử tế và trách nhiệm với môi trường.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: CHỨNG CHỈ (Style thanh ngang trong ảnh 3) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light tracking-[0.2em] uppercase mb-4">Chứng chỉ quốc tế</h2>
          <div className="flex justify-center italic text-gray-400 gap-4 items-center">
            <span className="h-[1px] w-10 bg-gray-300"></span>
            Standard & Safety
            <span className="h-[1px] w-10 bg-gray-300"></span>
          </div>
        </div>

        {/* Bố cục Grid 5 cột cho chứng chỉ */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-end">
          {[
            { name: "FSC", detail: "Quản lý rừng" },
            { name: "CARB P2", detail: "An toàn gỗ" },
            { name: "ISO 9001", detail: "Chất lượng" },
            { name: "SA 8000", detail: "Trách nhiệm" },
            { name: "BSCI", detail: "Tuân thủ xã hội" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="w-full aspect-[3/4] bg-gray-50 mb-4 flex items-center justify-center border border-transparent group-hover:border-gray-200 transition-all">
                {/* Thay bằng icon/img chứng chỉ thật */}
                <div className="text-2xl font-bold text-gray-300">{item.name}</div>
              </div>
              <p className="text-[10px] tracking-widest uppercase font-sans font-bold">
                {item.name}
              </p>
              <p className="text-[10px] text-gray-400 font-sans uppercase">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: NỘI DUNG FORMALDEHYDE (Đặc trưng ảnh 3) */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-2xl font-light italic">Vì sức khỏe gia đình bạn</h3>
          <div className="relative pt-10 pb-4">
            <div className="h-[2px] w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
            <div className="absolute top-0 left-[10%] flex flex-col items-center">
              <span className="text-[10px] mb-2 bg-white text-black px-2 py-1 font-bold">
                LUXHOUSE (CARB-P2)
              </span>
              <div className="w-[1px] h-4 bg-white"></div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-sans text-gray-400">
              <span>0.01 PPM (An toàn)</span>
              <span>0.11 PPM (Trung bình)</span>
              <span>0.50 PPM (Độc hại)</span>
            </div>
          </div>
          <p className="font-sans font-light text-sm text-gray-400">
            Chúng tôi kiểm soát nồng độ Formaldehyde dưới mức 0.01ppm, đảm bảo an toàn tuyệt đối cho
            trẻ nhỏ và người già.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutLuxhouse;
