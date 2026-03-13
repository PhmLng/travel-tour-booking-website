import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Routes, Route } from "react-router-dom";
import { ContentDashBoard } from "@/components/DashBoardPage/DashBoardContent/ContentDashBoard";
import { TourManage } from "@/components/DashBoardPage/TourMangager/TourManage";
import { Customer } from "@/components/DashBoardPage/Customer/Customer";

export default function Dashboard() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <Routes>
        <Route path="contentDashboard" element={<ContentDashBoard />} />
        <Route path="tours" element={<TourManage />} />
        <Route path="customers" element={<Customer />} />
      </Routes>
    </SidebarProvider>
  );
}
