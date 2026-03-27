import { SidebarInset } from "../../ui/sidebar";
import { SiteHeader } from "../../site-header";
import { DataTable } from "../../data-table";
import { customersColumns } from "./colums-customers";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import DetailCustomer from "./DetailCustomer";

export const Customer = () => {
  const [dataCustomer, setDataCustomer] = useState([]);
  const [detailCustomer, setDetailCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataCustomer();
  }, []);

  // hàm lấy dữ liệu
  const getDataCustomer = async () => {
    try {
      const res = await api.get("/passengers");
      console.log(res.data);
      setDataCustomer(res.data.content);
      toast.success("Lấy dữ liệu khách hàng thành công");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
      toast.error("Lỗi khi lấy dữ liệu khách hàng");
    }
  };

  //   chi tiết
  const handleDetail = async (customer) => {
    try {
      setLoading(true);
      const res = await api.get(`/passengers/${customer.id}`);
      console.log(res.data);
      setDetailCustomer(res.data);
    } catch (error) {
      toast.error("Không lấy được chi tiết");
    }
  };
  const handleClear = () => {
  setDetailCustomer(null);
};

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-col flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable
              data={dataCustomer}
              columns={customersColumns(handleDetail)}
            />
          </div>
          <div className="flex flex-col gap-4 py-4 mx-5 md:gap-6 md:py-6">
            <DetailCustomer
              selectedCustomer={detailCustomer}
              loading={loading}
              onClear={handleClear}
            />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
