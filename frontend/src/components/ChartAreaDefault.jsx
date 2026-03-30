import { TrendingUp } from "lucide-react";
import { TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartData = [
  { month: "January", bookings: 120 },
  { month: "February", bookings: 98 },
  { month: "March", bookings: 150 },
  { month: "April", bookings: 210 },
  { month: "May", bookings: 300 },
  { month: "June", bookings: 280 },
];

const chartConfig = {
  bookings: {
    label: "Lượt đặt tour",
    color: "var(--chart-1)",
  },
};

export function ChartAreaDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Số lượng khách hàng truy cập</CardTitle>
        <CardDescription>
          Hiển thị tổng số lượt khách truy cập trong 6 tháng qua.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="bookings"
              type="natural"
              fill="var(--color-bookings)"
              fillOpacity={0.4}
              stroke="var(--color-bookings)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-start w-full gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Giảm 3% trong tháng này <TrendingDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Tháng 1- Tháng 6 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
