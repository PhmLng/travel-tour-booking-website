import { Button } from "@/components/ui/button";

export const Nav = () => {
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