export const Hero = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-150 w-full bg-[url(https://iit.com.vn/files/images/Article/5-dieu-can-biet-khi-thiet-ke-website-du-lich.jpg)]
    bg-center bg-no-repeat bg-cover"
    >
      <div className="absolute inset-0 bg-black/35"></div>
      <div className="absolute z-10 m-auto text-center text-white w-fit">
        <h3 className="text-3xl font-bold text-primary">
          Chúng tôi ở đây để chuyến đi của bạn trọn vẹn hơn
        </h3>
        <h4 className="text-xl text-center text-primary">
          Hãy liên hệ với chúng tôi để được đội ngũ tư vấn tận tâm hỗ trợ, giúp
          bạn lựa chọn hành trình phù hợp và có một chuyến du lịch trọn vẹn,
          đáng nhớ
        </h4>
      </div>
    </div>
  );
};