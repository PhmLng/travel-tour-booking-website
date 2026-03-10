import React from "react";
import data from "@/lib/data.json";
import { SidebarInset } from "../../ui/sidebar";
import { SiteHeader } from "../../site-header";
import { SectionCards } from "../../section-cards";
import { ChartAreaInteractive } from "../../chart-area-interactive";
import { DataTable } from "../../data-table";
import { cardData } from "@/lib/data";
import { customerColumns } from "./customer-colums";
const dataCustomer = data.customers;
export const ContentDashBoard = () => {
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
            <DataTable data={dataCustomer} columns={customerColumns()}/>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
