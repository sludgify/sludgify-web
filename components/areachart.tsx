import React from "react";
import { Legend, XAxis, CartesianGrid, YAxis, AreaChart, Area } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type AreaChartProps = {
    chartConfig: Record<string, { label: string }>;
    chartData: Array<Record<string, unknown>>;
};

export const Areachart = ({ chartConfig, chartData }: AreaChartProps) => {
    return (
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
                <YAxis tickLine={false} axisLine={true} />
                <XAxis dataKey="month" tickLine={false} axisLine={true} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                    <linearGradient id="fillEmissionProduced" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#015AFF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#015AFF" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <Area dataKey="emissionManaged" stackId="1" type="natural" fill="transparent" fillOpacity={0.4} stroke="var(--color-emissionManaged)" dot={{ fill: "var(--color-emissionManaged)" }} activeDot={{ r: 6 }} />
                <Area dataKey="emissionProduced" stackId="1" type="natural" fill="url(#fillEmissionProduced)" fillOpacity={0.4} stroke="var(--color-emissionProduced)" dot={{ fill: "var(--color-emissionProduced)" }} activeDot={{ r: 6 }} />
                <Legend verticalAlign="bottom" align="center" wrapperStyle={{ marginTop: 20 }} formatter={(value) => <span style={{ color: "#1f2937", fontWeight: 500 }}>{chartConfig[value as keyof typeof chartConfig]?.label}</span>} />
            </AreaChart>
        </ChartContainer>
    );
};
