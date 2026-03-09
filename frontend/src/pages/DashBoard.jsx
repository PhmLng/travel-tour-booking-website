import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Routes, Route } from "react-router-dom";
import { ContentDashBoard } from "@/components/DashBoardPage/ContentDashBoard";
import { TourManage } from "@/components/DashBoardPage/TourManage";

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
      </Routes>
    </SidebarProvider>
  );
}
