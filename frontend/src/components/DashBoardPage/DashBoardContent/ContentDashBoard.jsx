import React from "react";
import data from "@/lib/data.json";
import { SidebarInset } from "../../ui/sidebar";
import { SiteHeader } from "../../site-header";
import { SectionCards } from "../../section-cards";
import { ChartAreaInteractive } from "../../chart-area-interactive";
import { DataTable } from "../../data-table";
import { cardData } from "@/lib/data";
import { customerColumns } from "./customer-colums";
import { customersColumns } from "../Customer/colums-customers";
import { ChartAreaLinear } from "@/components/ChartAreaLinear";
import { ChartAreaDefault } from "@/components/ChartAreaDefault";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
export const ContentDashBoard = () => {
  const mapDashboardData = (data) => {
    return [
      {
        description: "Tour đã đặt",
        value: data.totalBookings.toString(),
        change: "+0",
        trend: "up",
        note: "So với tuần trước",
        sub: "Số tour khách đã đặt",
      },
      {
        description: "Khách hàng mới",
        value: data.totalUsers.toString(),
        change: "+0",
        trend: "up",
        note: "Người dùng đăng ký",
        sub: "Tổng số khách hàng",
      },
      {
        description: "Tour đang hoạt động",
        value: (data.activeTours-2).toString(),
        change: "+0",
        trend: "up",
        note: "Tour đang mở bán",
        sub: "Tour còn nhận khách",
      },
      {
        description: "Doanh thu",
        value: formatCurrency(data.totalRevenue),
        change: "+0%",
        trend: "up",
        note: "Tổng doanh thu",
        sub: "Từ các tour đã đặt",
      },
    ];
  };
  const formatCurrency = (number) => {
    if (!number) return "0";

    if (number >= 1_000_000_000) {
      return (number / 1_000_000_000).toFixed(1) + "B";
    }
    if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1) + "M";
    }
    return number.toString();
  };
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboards");
      const mapped = mapDashboardData(res.data);
      setCardData(mapped);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-col flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards data={cardData} />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-2">
              <div className="h-full">
                <ChartAreaLinear />
              </div>
              <div className="h-full">
                <ChartAreaDefault />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
