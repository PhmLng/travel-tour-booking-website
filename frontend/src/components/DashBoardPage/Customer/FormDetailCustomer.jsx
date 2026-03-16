import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent } from '@/components/ui/tabs'

export const FormDetailCustomer = ({ customer, close, setEditingCustomer }) => {
  if (!customer) return null;

  return (
    <Tabs
      defaultValue="outline"
      className="flex-col justify-start w-2/3 gap-6 bg-white border rounded-2xl"
    >
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 px-4 overflow-auto lg:px-6"
      >
        <h2 className="m-5 text-2xl font-bold text-center">
          Chi tiết khách hàng
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <Label>Họ tên</Label>
            <Input value={customer.fullName || ""} disabled />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Tài khoản</Label>
            <Input value={customer.username || ""} disabled />
          </div>  
          <div className="flex flex-col gap-3">
            <Label>Email</Label>
            <Input value={customer.email || ""} disabled />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Số điện thoại</Label>
            <Input value={customer.phone || ""} disabled />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Địa chỉ</Label>
            <Input value={customer.address || ""} disabled />
          </div>   
          <div className="flex flex-col gap-3">
            <Label>Vai trò</Label>
            <Input value={customer.role || ""} disabled />
          </div>  
          <div className="flex flex-col gap-3">
            <Label>Ngày tạo</Label>
            <Input value={customer.createdAt || ""} disabled />
          </div>
        </div>
        <div className="flex justify-center gap-4 my-6">
          <Button variant="outline" onClick={close}>
            Đóng
          </Button>
          <Button
            onClick={() => {
              setEditingCustomer(customer);
              close();
            }}
          >
            Sửa
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};