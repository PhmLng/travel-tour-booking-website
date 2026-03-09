import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarInset } from "../../ui/sidebar";
import { SiteHeader } from "../../site-header";
import { columnsTour } from "./colums-tour";
import { DataTable } from "@/components/data-table";
import data from "@/lib/data.json";
import { tourCardData } from "@/lib/data";
import { SectionCards } from "@/components/section-cards";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { FormEdit } from "./FormEdit";

const testTourData = data.tours;

export const TourManage = () => {
  const [toursData, setToursData] = useState([]);

  useEffect(() => {
    getToursData();
  }, []);

  const getToursData = async () => {
    try {
      const res = await api.get("/tours");
      setToursData(res.data);
      console.log(res.data);
      toast.success("Lấy dữ liệu tour thành công");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tour:", error);
      toast.error("Lỗi khi lấy dữ liệu tour");
    }
  };

  const handleEdit = (tour) => {
    console.log("Tour cần sửa:", tour);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tours/${id}`);
      toast.success("Xóa tour thành công");
      getToursData();
    } catch (error) {
      toast.error("Xóa tour thất bại");
    }
  };

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-col flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards data={tourCardData} />
            <DataTable
              data={testTourData}
              columns={columnsTour(handleEdit, handleDelete)}
            />
            <FormEdit />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
