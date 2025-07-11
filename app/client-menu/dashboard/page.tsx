"use client";
import { FileDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { ChartConfig } from "@/components/ui/chart";
import { Barchart } from "@/components/barchart";
import { Areachart } from "@/components/areachart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";

const chartConfig = {
    sludgeB3: {
        label: "Sludge B3",
        color: "#1C274C",
    },
    sludgeNonB3: {
        label: "Sludge Non-B3",
        color: "#D7DDFF",
    },
} satisfies ChartConfig;

const carbonEmissionChartConfig = {
    emissionProduced: {
        label: "Emission Produced (ton CO2)",
        color: "#B93131",
    },
    emissionManaged: {
        label: "Emission Managed (ton CO2)",
        color: "#20FF0C",
    },
} satisfies ChartConfig;

export const description = "A multiple line chart";

export default function Page() {
    const [calculateCarbon, setCalculateCarbon] = useState({
        massa: 0,
        sludge_type: "",
    });

    const chartData = [
        { month: "January", sludgeB3: 186, sludgeNonB3: 80 },
        { month: "February", sludgeB3: 305, sludgeNonB3: 200 },
        { month: "March", sludgeB3: 237, sludgeNonB3: 120 },
        { month: "April", sludgeB3: 73, sludgeNonB3: 190 },
        { month: "May", sludgeB3: 209, sludgeNonB3: 130 },
        { month: "June", sludgeB3: 214, sludgeNonB3: 140 },
    ];

    const carbonEmissionData = [
        { month: "January", emissionProduced: 186, emissionManaged: 100 },
        { month: "February", emissionProduced: 305, emissionManaged: 180 },
        { month: "March", emissionProduced: 237, emissionManaged: 150 },
        { month: "April", emissionProduced: 220, emissionManaged: 120 },
        { month: "May", emissionProduced: 280, emissionManaged: 200 },
        { month: "June", emissionProduced: 214, emissionManaged: 160 },
    ];

    const stats = [
        {
            title: "Total Slude Manage",
            value: "23,560 tons",
            icon_change: <Image src="/trendup.svg" alt="recycle" width={30} height={30} />,
            change: "12% from last month",
            changeType: "positive",
            icon: <Image src="/recycle.svg" alt="recycle" width={30} height={30} />,
        },
        {
            title: "CO2 Emission Reduction",
            value: "4,712 tons",
            icon_change: <Image src="/trendup.svg" alt="recycle" width={30} height={30} />,
            change: "8% from last month",
            changeType: "positive",
            icon: <Image src="/co2.svg" alt="co2" width={30} height={30} />,
        },
        {
            title: "Project Completed",
            value: "30",
            icon_change: <Image src="/progress.svg" alt="recycle" width={30} height={30} />,
            change: "5 in progress",
            changeType: "progress",
            icon: <Image src="/document.svg" alt="co2" width={30} height={30} />,
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCalculateCarbon((prev) => ({ ...prev, [name]: value }));
        console.log(calculateCarbon);
    };

    const handleCalculate = async () => {
        const token = localStorage.getItem("accessToken");
        await axiosInstance.get("/sludgify/carbon-emissions/calculator", {
            params: calculateCarbon,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

    return (
        <div className="py-8 px-36 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold">Welcome Back, PT Eco Solution!</h1>
                    <p className="text-2xl">Here’s your sludge management summary</p>
                </div>
                <div className="font-radley flex gap-2 h-fit">
                    <div className="border px-4 py-2 rounded-xl">Monthly</div>
                    <button className="flex gap-2 border bg-black text-white px-4 py-2 rounded-xl">
                        Download Report <FileDown />
                    </button>
                </div>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stats.map((stat, index) => {
                    return (
                        <div key={index} className="bg-[#FAFAFA] rounded-2xl shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className="p-3 rounded-xl">{stat.icon}</div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <span className={`flex items-center gap-2 text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : stat.changeType === "negative" ? "text-red-600" : "text-[#273E8A]"}`}>
                                    {stat.icon_change}
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-2 gap-10">
                <div className="bg-[#FAFAFA] rounded-2xl space-y-2 shadow-md p-6">
                    <h1 className="text-2xl font-bold">Sludge Management Summary</h1>
                    <Barchart chartConfig={chartConfig} chartData={chartData} />
                </div>
                <div className="bg-[#FAFAFA] rounded-2xl space-y-2 shadow-md p-6">
                    <h1 className="text-2xl font-bold">Carbon Emission Comparison</h1>
                    <Areachart chartConfig={carbonEmissionChartConfig} chartData={carbonEmissionData} />
                </div>

                <div className="bg-[#FAFAFA] rounded-2xl space-y-8 shadow-md p-6">
                    <h1 className="text-2xl font-bold">Carbon Credit Status</h1>
                    <div className="flex gap-3 justify-between">
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h1>Total Available Credit</h1>
                            <p className="text-2xl font-bold">350</p>
                            <h1>Equivalent to 350 tons of CO2</h1>
                        </div>
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h1>Credit Price (1 ton of CO2)</h1>
                            <p className="text-2xl font-bold">IDR 150.000</p>
                        </div>
                    </div>
                    <div className="flex-1 border-t border-primary"></div>
                    <h1 className="text-2xl font-bold">Buy Carbon Credit</h1>
                    <div className="flex justify-between">
                        <input type="text" className="border border-gray-300 rounded-md p-2 focus:outline-none" />
                        <div>
                            <h1>Total Price</h1>
                            <h1 className="font-bold">IDR 150.000</h1>
                        </div>
                        <button className="bg-primary text-white rounded-md px-4 py-2 font-radley">Buy Now</button>
                    </div>
                </div>

                <div className="bg-[#FAFAFA] rounded-2xl space-y-8 shadow-md p-6">
                    <h1 className="text-2xl font-bold">Carbon Emissions Calculator</h1>
                    <p>Input sludge volume to predict carbon emissions produced</p>
                    <div className="flex gap-3 justify-between">
                        <div className="space-y-2 w-full">
                            <h1 className="text-xl">Volume Sudge (ton)</h1>
                            <input type="text" name="massa" onChange={handleChange} className="border border-gray-300 rounded-md px-3 h-[36px] text-base focus:outline-none w-full" />
                        </div>
                        <div className="space-y-2 text-xl w-full">
                            <h1>Sludge Type</h1>

                            <Select name="sludge_type" onValueChange={handleChange}>
                                <SelectTrigger className="border border-gray-300 rounded-md px-3 text-base w-full">
                                    <SelectValue placeholder="B3" defaultValue={"B3"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="B3">B3</SelectItem>
                                    <SelectItem value="Non-B3">Non-B3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <button type="button" onClick={handleCalculate} className="bg-primary text-white rounded-md px-4 py-2 font-radley w-full">
                        Calculate Emissions
                    </button>
                    <div className="flex-1 border-t border-primary"></div>
                    <h1 className="text-2xl font-bold">Calculation Result</h1>
                    <div className="flex justify-between gap-2 w-full">
                        <div className="bg-[#FFB2B273] py-6 px-4 w-full">
                            <h1>Emissions Produced</h1>
                            <h1 className="font-bold text-[#C63B3B]">ton CO2</h1>
                        </div>
                        <div className="bg-[#20FF0C33] py-6 px-4 w-full">
                            <h1>Emissions Produced</h1>
                            <h1 className="font-bold text-[#3CAA32]"> ton CO2</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
