import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export const FormCustomer = () => {
  return (
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-3">
              <Label htmlFor="" className="block text-sm">
                Tên khách hàng
              </Label>
              <Input  />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Email</Label>
              <Input  />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Số điện thoại</Label>
              <Input  />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Địa chỉ</Label>
              <Input  />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="block text-sm">Trang thái</Label>
              <Input  />
            </div>
          </div>
          <Button type="submit" className="block w-1/2 mx-auto my-5 ">
            {tour ? "Sửa" : "Xác nhận"}
          </Button>
        </form>
    </div>
  )
}
