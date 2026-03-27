import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const FormEdit = ({ tour, getTourData, setEditingTour, setAddForm }) => {
  const { register, reset, handleSubmit, setValue } = useForm({
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

  //
  const [preview, setPreview] = useState(tour?.mainImage || "");
  const [uploading, setUploading] = useState(false);
  const [gallery, setGallery] = useState([]);
  // hàm up ảnh
  const handleUploadImage = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Chỉ được chọn ảnh!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const rawUrl = res.data?.url || res.data?.data?.url || res.data;

      const imageUrl = rawUrl.startsWith("http")
        ? rawUrl
        : `http://localhost:8080${rawUrl}`;
      setValue("mainImage", imageUrl);
      setPreview(imageUrl);
      toast.success("Upload ảnh thành công");
    } catch (err) {
      toast.error("Upload thất bại");
    } finally {
      setUploading(false);
    }
  };
  //
  const handleUploadMultiple = async (files) => {
    if (!files || files.length === 0) return;

    const uploadedUrls = [];

    try {
      setUploading(true);

      for (let file of files) {
        if (!file.type.startsWith("image/")) continue;

        const formData = new FormData();
        formData.append("file", file);

        const res = await api.post("/files/upload", formData);

        const rawUrl = res.data?.url || res.data?.data?.url || res.data;

        const fullUrl = rawUrl.startsWith("http")
          ? rawUrl
          : `http://localhost:8080${rawUrl}`;

        uploadedUrls.push(fullUrl);
      }

      const newGallery = [...gallery, ...uploadedUrls];
      setGallery(newGallery);
      setValue(
        "gallery",
        newGallery.map((url) => ({
          imageUrl: url,
        })),
      );
    } catch (err) {
      toast.error("Upload ảnh thất bại");
    } finally {
      setUploading(false);
    }
  };

  // đóng form
  const handleClose = () => {
    if (setEditingTour) setEditingTour(null);
    if (setAddForm) setAddForm(false);
  };

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
        gallery: gallery.map((url) => ({
          imageUrl: url,
        })),
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
      setPreview(tour?.mainImage || "");

      const galleryUrls = tour?.gallery?.map((item) => item.imageUrl) || [];

      setGallery(galleryUrls);
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
        gallery: [],
      });
      setPreview("");
      setGallery([]);
    }
  }, [tour, reset]);
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();

    window.addEventListener("dragover", preventDefault);
    window.addEventListener("drop", preventDefault);

    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("drop", preventDefault);
    };
  }, []);

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
              <div className="flex flex-col gap-3">
                <Label className="block text-sm">Ảnh chính</Label>
                <Input
                  placeholder="Nhập URL ảnh..."
                  {...register("mainImage")}
                  onChange={(e) => setPreview(e.target.value)}
                />
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = e.dataTransfer.files;
                    if (files && files.length > 0) {
                      handleUploadImage(files[0]);
                      return;
                    }
                    const url = e.dataTransfer.getData("text/uri-list");

                    if (url) {
                      setPreview(url);
                      setValue("mainImage", url);
                      toast.success("Đã nhận URL ảnh");
                    }
                  }}
                  onClick={() => document.getElementById("uploadImage").click()}
                  className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <p className="text-sm text-gray-500">
                    {uploading
                      ? "Đang upload..."
                      : "Click hoặc kéo ảnh vào đây"}
                  </p>
                </div>

                <input
                  id="uploadImage"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleUploadImage(e.target.files[0])}
                />
                <Label>Ảnh xem trước</Label>
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="object-cover w-40 h-40 mt-2 border rounded-lg"
                  />
                )}
              </div>
              <div
                className="flex flex-col gap-3 mt-6"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();

                  const files = Array.from(e.dataTransfer.files);
                  if (files.length > 0) {
                    handleUploadMultiple(files);
                    return;
                  }
                  const url = e.dataTransfer.getData("text/uri-list");
                  if (url) {
                    const newGallery = [...gallery, url];
                    setGallery(newGallery);

                    setValue(
                      "gallery",
                      newGallery.map((u) => ({
                        imageUrl: u,
                      })),
                    );
                  }
                }}
              >
                <Label>Thư viện ảnh</Label>

                <div className="flex flex-wrap gap-3">
                  <div
                    onClick={() =>
                      document.getElementById("multiUpload").click()
                    }
                    className="flex items-center justify-center w-24 h-24 text-xl border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    +
                  </div>

                  {gallery.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        className="object-cover w-24 h-24 border rounded-lg"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          const newGallery = gallery.filter(
                            (_, i) => i !== index,
                          );
                          setGallery(newGallery);
                          setValue(
                            "gallery",
                            newGallery.map((url) => ({
                              imageUrl: url,
                            })),
                          );
                        }}
                        className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-sm"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  id="multiUpload"
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={(e) => handleUploadMultiple(e.target.files)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 my-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="cursor-pointer"
            >
              Đóng
            </Button>
            <Button type="submit" className="cursor-pointer">
              {tour ? "Sửa" : "Xác nhận"}
            </Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  );
};
