import data from "@/lib/data.json";
import { SidebarInset } from "../../ui/sidebar";
import { SiteHeader } from "../../site-header";
import { DataTable } from "../../data-table";
import { customersColumns } from "./colums-customers";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FormDetailCustomer } from "./FormDetailCustomer";
import { FormCustomer } from "./FormCustomer";

const testdataCustomer = data.customers;

export const Customer = () => {
    const [dataCustomer, setDataCustomer] = useState([]);
    const [detailCustomer, setDetailCustomer] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [addForm, setAddForm] = useState(false);

useEffect(() => {
    getDataCustomer();
}, [])

// hàm lấy dữ liệu
    const getDataCustomer = async () => {
        try {
            const res = await api.get("/customers");
            setDataCustomer(res.data);
            toast.success("Lấy dữ liệu khách hàng thành công");
        } catch (error) {
            confirm.error("Lỗi khi lấy dữ liệu khách hàng:", error);
            toast.error("Lỗi khi lấy dữ liệu khách hàng");
        }
    }

    // mở form chi tiết
  const handleDetail = (customer) => {
    setDetailCustomer(customer);
  };
    const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setDetailCustomer(null);
        console.log("Khách hàng cần sửa:", customer);
    }
    // ham add
    const handleAdd = () => {
    setAddForm(true);
    setDetailCustomer(null);
    setEditingCustomer(null);
    };
// hàm xóa
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
            <DataTable data={testdataCustomer} columns={customersColumns(handleDetail, handleDelete,handleEdit)} handleAdd={handleAdd}/>
          </div>
        </div>
        {detailCustomer && (
              <div className="flex justify-center">
                <FormDetailCustomer
                  customer={detailCustomer}
                  close={() => setDetailCustomer(null)}
                  setEditingCustomer={handleEdit}
                />
              </div>
            )}
            {addForm && (
              <div className="flex justify-center">
                <FormCustomer
                  getDataCustomer={getDataCustomer}
                  setAddForm={setAddForm}
                  close={() => setAddForm(false)}
                />
              </div>
            )}
            {editingCustomer && (
              <div className="flex justify-center">
                <FormCustomer
                  customer={editingCustomer}
                  getDataCustomer={getDataCustomer}
                  setEditingCustomer={setEditingCustomer}
                  close={() => setEditingCustomer(false)}
                />
              </div>
            )}
      </div>
    </SidebarInset>
  );
};