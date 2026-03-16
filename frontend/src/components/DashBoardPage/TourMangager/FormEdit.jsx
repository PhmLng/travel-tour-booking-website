import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { api } from "@/lib/axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const FormEdit = ({ tour, getTourData, setEditingTour, setAddForm }) => {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      title: tour?.title || "",
      adultPrice: tour?.adultPrice || "",
      childPrice: tour?.childPrice || "",
      startDate: tour?.startDate?.slice(0, 10) || "",
      duration: tour?.duration || "",
      departureLocation: tour?.departureLocation || "",
      transport: tour?.transport || "",
      maxSlots: tour?.maxSlots || "",
      remainingSlots: tour?.remainingSlots || "",
      status: tour?.status || "",
      itinerary: tour?.itinerary || "",
      policy: tour?.policy || "",
      registrationGuide: tour?.registrationGuide || "",
      mainImage: tour?.mainImage || "",
    },
  });

  // Xử lý submit form
  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        adultPrice: Number(data.adultPrice),
        childPrice: Number(data.childPrice),
        startDate: data.startDate || null,
        duration: data.duration || "",
        departureLocation: data.departureLocation,
        transport: data.transport,
        maxSlots: Number(data.maxSlots),
        remainingSlots: Number(data.remainingSlots),
        status: data.status,
        itinerary: data.itinerary,
        policy: data.policy,
        registrationGuide: data.registrationGuide,
        mainImage: data.mainImage,
      };
      if (tour) {
        await api.put(`/tours/${tour.id}`, payload);
        toast.success("Cập nhật thành công");

        if (setEditingTour) setEditingTour(null);
      } else {
        console.log("PAYLOAD:", payload);
        await api.post("/tours", payload);

        toast.success("Thêm tour thành công");

        if (setAddForm) setAddForm(false);
      }

      getTourData();
    } catch (error) {
      console.error(error);
      console.log("BACKEND ERROR:", error.response?.data);
      toast.error("Thao tác thất bại");
    }
  };
  // Reset form khi tour thay đổi
  useEffect(() => {
    if (tour) {
      reset({
        ...tour,
        startDate: tour?.startDate?.slice(0, 10),
      });
    } else {
      reset({
        title: "",
        adultPrice: "",
        childPrice: "",
        startDate: "",
        duration: "",
        departureLocation: "",
        transport: "",
        maxSlots: "",
        remainingSlots: "",
        status: "",
        itinerary: "",
        policy: "",
        registrationGuide: "",
        mainImage: "",
      });
    }
  }, [tour, reset]);

  return (
    <Tabs
      defaultValue="outline"
      className="flex-col justify-start w-2/3 gap-6 border rounded-2xl"
    >
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 px-4 overflow-auto lg:px-6"
      >
        <h2 className="m-5 text-2xl text-center font-stretch-90%">
          {tour ? "Chỉnh sửa Tour" : "Thêm Tour"}
        </h2>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="" className="block text-sm">
                Tên Tour
              </Label>
              <Input type="text" {...register("title")} />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Giá người lớn</Label>
              <Input type="number" {...register("adultPrice")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Giá trẻ em</Label>
              <Input type="number" {...register("childPrice")} />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Ngày khởi hành</Label>
              <Input type="date" {...register("startDate")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Thời gian</Label>
              <Input {...register("duration")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Điểm khởi hành</Label>
              <Input {...register("departureLocation")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Phương tiện</Label>
              <Input {...register("transport")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Tổng số chỗ</Label>
              <Input type="number" {...register("maxSlots")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Chỗ còn</Label>
              <Input type="number" {...register("remainingSlots")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Trạng thái</Label>
              <select {...register("status")} className="p-2 border rounded">
                <option value=""> Chọn trạng thái </option>
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="DEPARTING">DEPARTING</option>
                <option value="FULL">FULL</option>
                <option value="PENDING">PENDING</option>
                <option value="CANCELED">CANCELED</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Lịch trình</Label>
              <Input {...register("itinerary")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Chính sách</Label>
              <Input {...register("policy")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Hướng dẫn đăng ký</Label>
              <Input {...register("registrationGuide")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Ảnh chính</Label>
              <Input {...register("mainImage")} />
            </div>
          </div>
          <Button type="submit" className="block w-1/2 mx-auto my-5 ">
            {tour ? "Sửa" : "Xác nhận"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};
