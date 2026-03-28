import React from "react";
import CountUp from "react-countup";

export const Counter = () => {
  return (
    <div className="grid grid-cols-1 gap-10 mt-16 text-center md:grid-cols-3">
      <div className="p-6 transition rounded-2xl hover:shadow-lg">
        <h2 className="text-5xl font-extrabold text-primary">
          <CountUp end={10000} duration={3} suffix="+" />
        </h2>

        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          Du khách đã đồng hành
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Chúng tôi đồng hành cùng bạn từ lúc lên kế hoạch đến khi kết thúc
          chuyến đi, đảm bảo an toàn, tiện lợi và tràn đầy cảm hứng.
        </p>
      </div>

      <div className="p-6 transition rounded-2xl hover:shadow-lg">
        <h2 className="text-5xl font-extrabold text-primary">
          <CountUp end={115} duration={3} suffix="+" />
        </h2>

        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          Tour trong nước & quốc tế
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Khám phá những hành trình đáng nhớ với các tour du lịch được thiết kế
          trọn gói, linh hoạt và phù hợp cho mọi nhu cầu nghỉ dưỡng, trải nghiệm
          và khám phá văn hóa.
        </p>
      </div>

      <div className="p-6 transition rounded-2xl hover:shadow-lg">
        <h2 className="text-5xl font-extrabold text-primary">
          <CountUp end={85} duration={3} suffix="%" />
        </h2>

        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          Khách hàng hài lòng
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Hơn 78% khách hàng đánh giá hài lòng sau mỗi chuyến đi, nhờ dịch vụ
          tận tâm, lịch trình hợp lý và đội ngũ hỗ trợ luôn sẵn sàng đồng hành.
        </p>
      </div>
    </div>
  );
};
