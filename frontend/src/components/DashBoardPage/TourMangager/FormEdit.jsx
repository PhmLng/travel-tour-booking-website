import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

export const FormEdit = () => {
  return (
    <div>
        <form action="">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label htmlFor="" className="block text-sm">
                  Tên Tour
                </Label>
                <Input
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="" className="block text-sm">
                  Địa điểm
                </Label>
                <Input
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="" className="block text-sm">
                  Giá
                </Label>
                <Input
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="" className="block text-sm">
                  Thời gian
                </Label>
                <Input
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="" className="block text-sm">
                    Số chỗ
                </Label>
                <Input
                />
              </div>
              <Button type="submit" className="w-full" >
                Sửa
              </Button>
            
            </div>
        </form>
    </div>
  )
}
