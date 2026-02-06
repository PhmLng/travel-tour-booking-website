import { Counter } from "@/components/Counter";
import { FromContact } from "@/components/FromContact";
import { Button } from "@/components/ui/button";

const Nav = () => {
  return (
    <div className="flex flex-row items-center justify-between p-5 m-10 ">
      <div className="flex flex-row gap-3">
        <a href="/">
          <img src="./logo.png" alt="" className="h-15 w-55" />
        </a>
      </div>
      <div className="flex flex-row gap-10 text-white">
        <div>
          <a href="#">Trang chủ</a>
        </div>
        <div>
          <a href="#">Tour</a>
        </div>
        <div>
          <a href="#">Liên hệ</a>
        </div>
        <Button
          variant="outline"
          className="text-white bg-blue-500 hover:bg-blue-700 hover:text-white"
        >
          Đặt lịch ngay
        </Button>
      </div>
    </div>
  );
};
const Hero = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-150 w-full bg-[url(https://demos.creative-tim.com/material-kit-pro-react/static/media/bg-rental.cbe4acac.jpeg)]
    bg-center bg-no-repeat bg-cover"
    >
      <div className="absolute inset-0 bg-black/35"></div>
      <div className="absolute z-10 m-auto text-center text-white w-fit">
        <h3 className="text-3xl font-bold ">
          Chúng tôi ở đây để chuyến đi của bạn trọn vẹn hơn
        </h3>
        <h4 className="text-xl text-center">
          Hãy liên hệ với chúng tôi để được đội ngũ tư vấn tận tâm hỗ trợ, giúp
          bạn lựa chọn hành trình phù hợp và có một chuyến du lịch trọn vẹn,
          đáng nhớ
        </h4>
      </div>
    </div>
  );
};
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
const Question = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 h-200">
      <div>
        <h2 className="my-10 text-2xl font-bold text-center">
          Câu hỏi thường gặp
        </h2>
        <p className="text-sm text-center text-gray-500">
          Hãy liên hệ với chúng tôi để được đội ngũ tư vấn tận tâm hỗ trợ, giúp
          bạn lựa chọn hành trình phù hợp và có một chuyến du lịch trọn vẹn,
          đáng nhớ.
        </p>
      </div>
      <div className="flex flex-row justify-between w-3/5">
        <h3 className="text-xl font-bold">
          Tôi có thể đặt tour bằng những hình thức nào?
        </h3>
        <p className="text-xl font-bold">+</p>
      </div>
      <div className="w-3/5 border border-gray-400"></div>
      <div className="flex flex-row justify-between w-3/5">
        <h3 className="text-xl font-bold">
          Sau khi đặt tour, tôi sẽ nhận được thông tin xác nhận như thế nào?
        </h3>
        <p className="text-xl font-bold">+</p>
      </div>
      <div className="w-3/5 border border-gray-400"></div>
      <div className="flex flex-row justify-between w-3/5">
        <h3 className="text-xl font-bold">
          Giá tour đã bao gồm những dịch vụ gì?
        </h3>
        <p className="text-xl font-bold">+</p>
      </div>
      <div className="w-3/5 border border-gray-400"></div>
      <div className="flex flex-row justify-between w-3/5">
        <h3 className="text-xl font-bold">
          Tôi có thể hủy hoặc thay đổi lịch trình tour không?
        </h3>
        <p className="text-xl font-bold">+</p>
      </div>
      <div className="w-3/5 border border-gray-400"></div>
      <div className="flex flex-row justify-between w-3/5">
        <h3 className="text-xl font-bold">
          Tôi cần chuẩn bị gì trước khi tham gia tour?
        </h3>
        <p className="text-xl font-bold">+</p>
      </div>
      <div className="w-3/5 border border-gray-400"></div>
    </div>
  );
};
const Testimonials = () => {
  return (
    <div className="flex flex-col items-center w-full h-auto gap-10 bg-black rounded-4xl">
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

export const ContactPage = () => {
  return (
    <div className="h-full bg-gray-200">
      <div className="relative ">
        <Hero />
        <div className="absolute inset-0 w-3/4 mx-auto">
          <Nav />
        </div>
      </div>
      <div className="relative flex flex-col gap-10 px-10 py-1 mx-10 -mt-32 bg-white ">
        <div className="">
          <Counter />
        </div>
        <div className="">
          <Testimonials />
        </div>
        <div className="">
          <Question />
        </div>
        <div className="">
          <FromContact />
        </div>
      </div>
      <div className="h-screen"></div>
    </div>
  );
};
