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
import { FormDetailTour } from "./FormDetailTour";
import { BuildTour } from "./BuildTour";

const testTourData = data.tours;

export const TourManage = () => {
  const [toursData, setToursData] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [detailTour, setDetailTour] = useState(null);

  // Lấy dữ liệu tour khi component mount
  useEffect(() => {
    getToursData();
  }, []);

  // Lấy dữ liệu tour
  const getToursData = async () => {
    try {
      const res = await api.get("/tours?size=30");
      setToursData(res.data.content);
      console.log("Chi tiết tour:", res.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tour:", error);
      toast.error("Lỗi khi lấy dữ liệu tour");
    }
  };

  // lấy dữ liệu chi tiết tour
  const handleDetail = async (id) => {
    try {
      const res = await api.get(`/tours/${id}`);
      setDetailTour(res.data);

      setEditingTour(null);
      setOpenAddForm(false);
    } catch (error) {
      toast.error("Không lấy được chi tiết tour");
    }
  };

  // Mở form thêm tour
  const handleAddTour = () => {
    console.log("click add tour");
    setOpenAddForm(true);
    setEditingTour(null);
    setDetailTour(null);
  };

  // Mở form sửa
  const handleEdit = (tour) => {
    setEditingTour(tour);

    console.log("Tour cần sửa:", tour);
  };

  // Xóa tour
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tours/${id}`);
      setToursData((prev) => prev.filter((tour) => tour.id !== id));
      getToursData();
    } catch (error) {
      toast.error("Xóa tour thất bại");
    }
  };

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-col ">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards data={BuildTour({ content: toursData })} />
            <DataTable
              data={toursData}
              columns={columnsTour(handleEdit, handleDelete, handleDetail)}
              handleAdd={handleAddTour}
            />
          </div>
          <div className="flex justify-center">
            {editingTour && (
              <FormEdit
                tour={editingTour}
                getTourData={getToursData}
                setEditingTour={setEditingTour}
              />
            )}
          </div>
          <div className="flex justify-center">
            {openAddForm && (
              <FormEdit
                tour={null}
                setAddForm={setOpenAddForm}
                getTourData={getToursData}
              />
            )}
          </div>
          <div className="flex justify-center">
            {detailTour && (
              <FormDetailTour
                tour={detailTour}
                close={() => setDetailTour(null)}
                setEditingTour={setEditingTour}
              />
            )}
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
