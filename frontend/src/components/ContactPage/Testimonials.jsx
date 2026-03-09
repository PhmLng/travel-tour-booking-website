const TestimonialsCard = () => {
  return (
    <>
      <div className="relative w-full max-w-sm p-8 pt-16 text-center bg-white shadow-xl md:max-w-md lg:max-w-lg rounded-2xl min-h-90">
        <img
          src="./anh2.png"
          className="absolute object-cover w-20 h-20 -translate-x-1/2 border-4 border-white rounded-full shadow-lg md:w-24 md:h-24 -top-10 left-1/2"
        />
        <h3 className="text-xl font-bold md:text-2xl">Nguyễn Quốc Huy</h3>
        <p className="text-indigo-400">@nguyenquochuy</p>
        <p className="mt-4 text-gray-500">
          Đây là lần đầu mình đặt tour online nhưng trải nghiệm rất tốt. Nhân
          viên tư vấn rõ ràng, tour đúng mô tả, chuyến đi rất đáng nhớ. Mọi thứ
          đều được chuẩn bị kỹ lưỡng, lịch trình hợp lý, không bị phát sinh chi
          phí. Rất đáng tin cậy.
        </p>
      </div>
    </>
  );
};
export const Testimonials = () => {
  return (
    <div className="flex flex-col items-center w-full h-auto gap-10 bg-[rgb(17,16,16)] bg-[url('./topography.svg')] rounded-4xl">
      <div className="flex flex-col items-center justify-center ">
        <p className="mt-20 text-4xl font-bold text-white">Lạc Việt Travel</p>
        <h1 className="my-5 text-3xl font-bold text-white">
          Một số đánh giá từ khách hàng của chúng tôi
        </h1>
        <p className="w-3/5 font-bold text-center text-white">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trong việc lựa chọn
          tour, lên kế hoạch hành trình và giải đáp mọi thắc mắc để chuyến đi
          của bạn diễn ra suôn sẻ nhất
        </p>
      </div>
      <div className="grid grid-cols-1 gap-20 ml-10 mr-10 xl:grid-cols-3 my-30">
        <TestimonialsCard />
        <TestimonialsCard />
        <TestimonialsCard />
      </div>
    </div>
  );
};