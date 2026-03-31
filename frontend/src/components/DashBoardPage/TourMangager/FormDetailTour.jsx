import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export const FormDetailTour = ({ tour, close, setEditingTour }) => {
  if (!tour) return null;

  return (
    <Tabs
      defaultValue="outline"
      className="flex-col justify-start w-2/3 gap-6 bg-white border rounded-2xl"
    >
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 px-4 overflow-auto lg:px-6"
      >
        <h2 className="m-5 text-2xl font-bold text-center">Chi tiết Tour</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Tên tour */}
          <div className="flex flex-col gap-3">
            <Label>Tên Tour</Label>
            <Input value={tour.title || ""} disabled />
          </div>

          {/* Giá người lớn */}
          <div className="flex flex-col gap-3">
            <Label>Giá người lớn</Label>
            <Input value={tour.adultPrice || ""} disabled />
          </div>

          {/* Giá trẻ em */}
          <div className="flex flex-col gap-3">
            <Label>Giá trẻ em</Label>
            <Input value={tour.childPrice || ""} disabled />
          </div>

          {/* Ngày khởi hành */}
          <div className="flex flex-col gap-3">
            <Label>Ngày khởi hành</Label>
            <Input
              type="date"
              value={tour.startDate?.slice(0, 10) || ""}
              disabled
            />
          </div>

          {/* Thời gian */}
          <div className="flex flex-col gap-3">
            <Label>Thời gian</Label>
            <Input value={tour.duration || ""} disabled />
          </div>

          {/* Điểm khởi hành */}
          <div className="flex flex-col gap-3">
            <Label>Điểm khởi hành</Label>
            <Input value={tour.departureLocation || ""} disabled />
          </div>

          {/* Phương tiện */}
          <div className="flex flex-col gap-3">
            <Label>Phương tiện</Label>
            <Input value={tour.transport || ""} disabled />
          </div>

          {/* Tổng số chỗ */}
          <div className="flex flex-col gap-3">
            <Label>Tổng số chỗ</Label>
            <Input value={tour.maxSlots || ""} disabled />
          </div>

          {/* Chỗ còn */}
          <div className="flex flex-col gap-3">
            <Label>Chỗ còn</Label>
            <Input value={tour.remainingSlots || ""} disabled />
          </div>

          {/* Trạng thái */}
          <div className="flex flex-col gap-3">
            <Label>Trạng thái</Label>
            <Input value={tour.status || ""} disabled />
          </div>

          {/* Lịch trình */}
          <div className="flex flex-col gap-3">
            <Label>Lịch trình</Label>
            <Textarea
              value={tour?.itinerary || ""}
              disabled
              className="overflow-y-auto resize-none h-50"
            />
          </div>

          {/* Chính sách */}
          <div className="flex flex-col gap-3">
            <Label>Chính sách</Label>
            <Textarea
              value={tour?.policy || ""}
              disabled
              className="overflow-y-auto resize-none h-50"
            />
          </div>

          {/* Hướng dẫn đăng ký */}
          <div className="flex flex-col gap-3">
            <Label>Hướng dẫn đăng ký</Label>
            <Textarea
              value={tour?.registrationGuide || ""}
              disabled
              className="overflow-y-auto resize-none h-50"
            />
          </div>

          {/* Ảnh chính */}
          <div className="flex flex-col gap-3">
            <Label>Ảnh chính</Label>
            {tour.mainImage ? (
              <img
                src={tour.mainImage}
                alt="Tour"
                className="object-cover border w-55 h-35 rounded-xl"
              />
            ) : (
              <Input value="" disabled />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 my-6">
          <Button variant="outline" onClick={close} className="cursor-pointer">
            Đóng
          </Button>

          <Button
            onClick={() => {
              setEditingTour(tour);
              close();
            }}
            className="cursor-pointer"
          >
            Sửa
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};
