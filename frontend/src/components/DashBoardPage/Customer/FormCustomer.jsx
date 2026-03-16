import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { api } from "@/lib/axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const FormCustomer = (
  {
  customer,
  getDataCustomer,
  setEditingCustomer,
  setAddForm,
  close
}
) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: customer?.fullName || "",
      email: customer?.email || "",
      phoneNumber: customer?.phoneNumber || "",
      address: customer?.address || "",
      isLead: customer?.isLead || false,
    },
  });
  useEffect(() => {
    reset(customer);
  }, [customer]);

  const onSubmit = async (data) => {
    try {
      if (customer) {
        await api.put(`/customers/${customer.id}`, data);
        toast.success("Cập nhật khách hàng thành công");
        setEditingCustomer(null);
      } else {
        await api.post("/customers", data);
        toast.success("Thêm khách hàng thành công");
        setAddForm(false);
      }

      getDataCustomer();
    } catch (error) {
      toast.error("Lỗi khi lưu khách hàng");
    }
  };
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
          {customer ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"}
        </h2>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-3">
              <Label htmlFor="" className="block text-sm">
                Tên khách hàng
              </Label>
              <Input {...register("fullName")} />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Email</Label>
              <Input />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Số điện thoại</Label>
              <Input {...register("phoneNumber")} />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Địa chỉ</Label>
              <Input {...register("address")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Trang thái</Label>
              <select {...register("isLead")} className="p-2 border rounded-md">
                <option value="true">Người đặt chính</option>
                <option value="false">Khách đi cùng</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center gap-4 my-5">
            <Button type="button" variant="outline" onClick={close}>
              Đóng
            </Button>
            <Button type="submit">{customer ? "Cập nhật" : "Thêm"}</Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  );
};
