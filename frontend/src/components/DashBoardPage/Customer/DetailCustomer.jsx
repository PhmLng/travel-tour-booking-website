import React from "react";
import { Phone } from "lucide-react";
import { PersonStanding } from "lucide-react";
import { Mail } from "lucide-react";
import { MapPinHouse } from "lucide-react";
import { Cake } from "lucide-react";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';

const DetailCustomer = ({ selectedCustomer, loading, onClear }) => {
  return (
    <div className="p-6 mt-6 border shadow-sm bg-accent-foregroundbackground rounded-2xl">
      <div className="mb-6 text-center">
        <h2 className="flex items-center justify-center gap-5 text-xl font-bold">  <Info/> Chi tiết khách hàng</h2>
      </div>
      {!selectedCustomer && !loading && (
        <p className="mb-5 text-center text-gray-400 b-5">
        
          Chọn khách hàng để xem chi tiết
        </p>
      )}
      <div className="grid grid-cols-2 gap-6">
        {[
          {
            icon: <PersonStanding />,
            label: "Họ tên",
            value: selectedCustomer?.fullName,
          },
          {
            icon: <Phone />,
            label: "SĐT",
            value: selectedCustomer?.phoneNumber,
          },
          { icon: <Mail />, label: "Email", value: selectedCustomer?.email },
          {
            icon: <MapPinHouse />,
            label: "Địa chỉ",
            value: selectedCustomer?.address,
          },
          {
            icon: <Cake />,
            label: "Ngày sinh",
            value: selectedCustomer?.birth,
          },
          {
            icon: <IdCard />,
            label: "Booking ID",
            value: selectedCustomer?.bookingId,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-4 transition border rounded-xl bg-gray-50 hover:bg-gray-100"
          >
            <p className="flex items-center gap-2 mb-1 text-sm text-gray-500">
              <span className="flex items-center justify-center w-5 h-5">
                {item.icon}
              </span>

              <span>{item.label}:</span>

              <span className="text-base font-semibold">
                {item.value || "- - -"}
              </span>
            </p>
          </div>
        ))}
      </div>
      {selectedCustomer && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={onClear}
            className="px-4 py-2 text-sm text-white transition rounded-lg cursor-pointer bg-primary hover:bg-chart-3"
          >
            Hoàn tất
          </Button>
        </div>
      )}
    </div>
  );
};

export default DetailCustomer;
