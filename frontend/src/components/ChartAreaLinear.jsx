import { TrendingUp } from "lucide-react";
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

export const description = "A linear area chart";

const chartData = [
  { month: "January", revenue: 25000000 },
  { month: "February", revenue: 18000000 },
  { month: "March", revenue: 32000000 },
  { month: "April", revenue: 45000000 },
  { month: "May", revenue: 52000000 },
  { month: "June", revenue: 60000000 },
];

const chartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "var(--chart-1)",
  },
};

export function ChartAreaLinear() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu theo tháng</CardTitle>
        <CardDescription>Tổng doanh thu trong 6 tháng qua</CardDescription>
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
              content={
                <ChartTooltipContent
                  indicator="dot"
                  formatter={(value) => value.toLocaleString("vi-VN") + " đ"}
                />
              }
            />
            <Area
              dataKey="revenue"
              type="linear"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-start w-full gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tăng trưởng 9,2% trong tháng này{" "}
              <TrendingUp className="w-4 h-4" />
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
