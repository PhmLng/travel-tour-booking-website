import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { api } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import BookingList from "./BookingList";
import { BookingTabs } from "./BookingTabs";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export const BookingManage = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [dataBooking, setDataBooking] = useState([]);
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = dataBooking.slice(startIndex, endIndex);
  
  useEffect(() => {
  getAllBookings();
}, []);

  // useEffect(() => {
  //   getDataBooking(status);
  // }, [status]);
  const getAllBookings = async () => {
  const res = await api.get("/bookings");
  setAllBookings(res.data);
};
useEffect(() => {
  if (status === "all") {
    setDataBooking(allBookings);
  } else {
    setDataBooking(
      allBookings.filter((b) => b.status === status)
    );
  }
}, [status, allBookings]);

  const totalPages = Math.ceil(dataBooking.length / pageSize);

const counts = {
  all: allBookings.length,
  PENDING: allBookings.filter((b) => b.status === "PENDING").length,
  CONFIRMED: allBookings.filter((b) => b.status === "CONFIRMED").length,
  PAID: allBookings.filter((b) => b.status === "PAID").length,
  PARTIALLY_PAID: allBookings.filter((b) => b.status === "PARTIALLY_PAID").length,
  CANCELED: allBookings.filter((b) => b.status === "CANCELED").length,
  CANCELED_PENDING: allBookings.filter((b) => b.status === "CANCELED_PENDING").length,
};

  const getDataBooking = async (status) => {
    try {
      const res = await api.get("/bookings", {
        params: status !== "all" ? { status } : {},
      });

      setDataBooking(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu booking", error);
      toast.error("Lỗi khi lấy dữ liệu");
    }
  };

  const handleAction = async (item, action) => {
    try {
      if (action === "APPROVE_CANCEL") {
        await api.post(`/bookings/${item.Id}/approval-cancel`);
        toast.success("Đã duyệt huỷ booking");
      }

      if (action === "DELETE") {
        const ok = confirm("Bạn có chắc muốn xóa booking này?");
        if (!ok) return;

        await api.delete(`/bookings/${item.Id}`);
        toast.success("Xóa booking thành công");
      }
      getDataBooking(status);
    } catch (error) {
      console.error("Action error:", error);
      toast.error("Thao tác thất bại");
    }
  };

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-col flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-6">
              <BookingTabs
                active={status}
                setActive={setStatus}
                counts={counts}
              />
              <BookingList data={currentData} onAction={handleAction} />
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 rounded"
              >
                <ArrowLeft className="h-5 cursor-pointer w-7 hover:text-primary" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded cursor-pointer hover:bg-primary/10 ${
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "border-none"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 rounded"
              >
                <ArrowRight className="h-5 cursor-pointer w-7 hover:text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
