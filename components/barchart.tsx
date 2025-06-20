import React from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis } from "recharts";
import {  ChartContainer } from "@/components/ui/chart";

type BarchartProps = {
    chartConfig: Record<string, { label: string }>;
    chartData: Array<Record<string, unknown>>;
};

export const Barchart = ({chartConfig, chartData}: BarchartProps) => {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart data={chartData}>
                <XAxis dataKey="month" orientation={"top"} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                <Tooltip />
                <Bar dataKey="sludgeB3" fill="var(--color-sludgeB3)" radius={4} />
                <Bar dataKey="sludgeNonB3" fill="var(--color-sludgeNonB3)" radius={4} />
                <Legend verticalAlign="bottom" align="center" wrapperStyle={{ marginTop: 20 }} formatter={(value) => <span style={{ color: "#1f2937", fontWeight: 500 }}>{chartConfig[value as keyof typeof chartConfig]?.label}</span>} />
            </BarChart>
        </ChartContainer>
    );
};
