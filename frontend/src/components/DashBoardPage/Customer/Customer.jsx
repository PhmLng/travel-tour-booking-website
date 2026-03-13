import data from "@/lib/data.json";
import { SidebarInset } from "../../ui/sidebar";
import { SiteHeader } from "../../site-header";
import { DataTable } from "../../data-table";
import { customersColumns } from "./colums-customers";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const testdataCustomer = data.customers;

export const Customer = () => {
    const [dataCustomer, setDataCustomer] = useState([]);

useEffect(() => {
    getDataCustomer();
}, [])


    const getDataCustomer = async () => {
        try {
            const res = api.get("/customers");
            setDataCustomer(res.data);
            toast.success("Lấy dữ liệu khách hàng thành công");
        } catch (error) {
            confirm.error("Lỗi khi lấy dữ liệu khách hàng:", error);
            toast.error("Lỗi khi lấy dữ liệu khách hàng");
        }
    }

    const handleEdit = (customer) => {
        console.log("Khách hàng cần sửa:", customer);
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/customers/${id}`);
            toast.success("Xóa khách hàng thành công");
            getDataCustomer();
        } catch (error) {
            toast.error("Xóa khách hàng thất bại");
        }
      };
      


    
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-col flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">           
            <DataTable data={testdataCustomer} columns={customersColumns()}/>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};