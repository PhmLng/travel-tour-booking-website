import React from "react";
import CountUp from "react-countup";

export const Counter = () => {
  return (
    <div className="grid grid-cols-3 gap-8 text-center mt-10">
      <div>
        <h2 className="text-4xl font-bold ">
          <CountUp end={10000} duration={3} suffix="+" />
        </h2>
        <h3 className="text-md mt-3 font-medium">Du khách đã đồng hành</h3>
        <p className="text-sm text-gray-500 text-center">
          Chúng tôi đồng hành cùng bạn từ lúc lên kế hoạch đến khi kết thúc
          chuyến đi, đảm bảo an toàn, tiện lợi và tràn đầy cảm hứng.
        </p>
      </div>

      <div>
        <h2 className="text-4xl font-bold ">
          <CountUp end={115} duration={3} suffix="+" />
        </h2>
        <h3 className="text-md mt-3 font-medium">Tour trong nước & quốc tế</h3>
        <p className="text-sm text-gray-500 text-center">
          Khám phá những hành trình đáng nhớ với các tour du lịch được thiết kế
          trọn gói, linh hoạt và phù hợp cho mọi nhu cầu nghỉ dưỡng, trải nghiệm
          và khám phá văn hóa
        </p>
      </div>

      <div>
        <h2 className="text-4xl font-bold ">
          <CountUp end={85} duration={3} suffix="%" />
        </h2>
        <h3 className="text-md mt-3 font-medium">Khách hàng hài lòng</h3>
        <p className="text-sm text-gray-500 text-center">
          Hơn 78% khách hàng đánh giá hài lòng sau mỗi chuyến đi, nhờ dịch vụ
          tận tâm, lịch trình hợp lý và đội ngũ hỗ trợ luôn sẵn sàng đồng hành
          trong suốt hành trình của bạn.
        </p>
      </div>
    </div>
  );
};
