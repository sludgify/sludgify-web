"use client";
import { ChevronDown, FileDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { ChartConfig } from "@/components/ui/chart";
import { Barchart } from "@/components/barchart";
import { Areachart } from "@/components/areachart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ClientNavbarMobile } from "@/components/client-navbar-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

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

export default function Page() {
    const is1380 = useMediaQuery({ minWidth: 1380 });

    const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

    const [calculateCarbon, setCalculateCarbon] = useState({
        massa: 0,
        sludge_type: "",
    });
    const [calculateResult, setCalculateResult] = useState({
        emissions_produced: {
            emission_ton: 0,
            mass_ton: 0,
            method: "",
        },
        reduced_potential: {
            emission_ton: 0,
            mass_ton: 0,
            method: "",
        }
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
            icon_change: <Image src="/trendup.svg" alt="recycle" width={30} height={30} className="lg:w-[30px] lg:h-[30px] w-[15px] h-[15px]" />,
            change: "12% from last month",
            changeType: "positive",
            icon: <Image src="/recycle.svg" alt="recycle" width={30} height={30} className="lg:w-[30px] lg:h-[30px] w-[15px] h-[15px]" />,
        },
        {
            title: "CO2 Emission Reduction",
            value: "4,712 tons",
            icon_change: <Image src="/trendup.svg" alt="recycle" width={30} height={30} className="lg:w-[30px] lg:h-[30px] w-[15px] h-[15px]" />,
            change: "8% from last month",
            changeType: "positive",
            icon: <Image src="/co2.svg" alt="co2" width={30} height={30} className="lg:w-[30px] lg:h-[30px] w-[15px] h-[15px]" />,
        },
        {
            title: "Project Completed",
            value: "30",
            icon_change: <Image src="/progress.svg" alt="recycle" width={30} height={30} className="lg:w-[30px] lg:h-[30px] w-[15px] h-[15px]" />,
            change: "5 in progress",
            changeType: "progress",
            icon: <Image src="/document.svg" alt="co2" width={30} height={30} className="lg:w-[30px] lg:h-[30px] w-[15px] h-[15px]" />,
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCalculateCarbon((prev) => ({
            ...prev,
            [name]: name === "massa" ? parseFloat(value) : value,
        }));
    };

    const handleSelectChange = (value: string) => {
        setCalculateCarbon((prev) => ({ ...prev, sludge_type: value }));
    };

    const handleCalculate = async () => {
        try {
            const accessToken = Cookies.get("accessToken");
            const response = await axiosInstance.post("/sludgify/carbon-emissions/calculator", calculateCarbon, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data;
            console.log(data);
            setCalculateResult(data);
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            toast.error(error.response?.data.message);
        }
    };

    return (
        <div className="py-6 md:py-8 md:px-5 lg:px-16 space-y-6">
            <div className="flex lg:flex-row flex-col justify-between md:items-start md:gap-2 items-center w-full px-3 lg:px-0">
                <div className="flex w-full justify-between items-start h-full">
                    <div>
                        <h1 className="md:text-2xl lg:text-4xl font-bold">Welcome Back, PT Eco Solution!</h1>
                        <p className="text-sm md:text-xl lg:text-2xl text-[#525252]">Here’s your sludge management summary</p>
                    </div>
                    <ClientNavbarMobile />
                </div>
                <div className="font-radley flex gap-2 h-fit">
                    <button className="flex gap-2 border bg-black text-white md:w-[200px] lg:text-center px-4 py-2 rounded-md">Download Report</button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="border px-4 py-2 rounded-md min-w-[120px] lg:w-[160px] flex items-center justify-between">
                                {selectedPeriod}
                                <ChevronDown size={18} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedPeriod("Monthly")}>Monthly</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedPeriod("Annual")}>Annual</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* Stats */}
            <div className="overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory w-full">
                <div className="flex gap-4 px-4 lg:px-0 mb-2 lg:w-full">
                    {stats.map((stat, index) => {
                        return (
                            <div key={index} className="bg-[#FAFAFA] border flex-shrink-0 md:flex-shrink md:w-full p-3 border-[#D9D9D9] rounded-2xl shadow-md lg:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs md:text-sm  font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-base md:text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    </div>
                                    <div className="p-3 rounded-xl">{stat.icon}</div>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <span className={`flex items-center gap-2 text-xs md:text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : stat.changeType === "negative" ? "text-red-600" : "text-[#273E8A]"}`}>
                                        {stat.icon_change}
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3 lg:p-0">
                <div className="bg-[#FAFAFA] border border-[#D9D9D9] rounded-2xl space-y-2 shadow-md  p-4 lg:p-6">
                    <h1 className="text-sm md:text-xl lg:text-2xl font-bold">Sludge Management Summary</h1>
                    <Barchart chartConfig={chartConfig} chartData={chartData} />
                </div>
                <div className="bg-[#FAFAFA] border border-[#D9D9D9] rounded-2xl space-y-2 shadow-md  p-4 lg:p-6">
                    <h1 className="text-sm md:text-xl lg:text-2xl font-bold">Carbon Emission Comparison</h1>
                    <Areachart chartConfig={carbonEmissionChartConfig} chartData={carbonEmissionData} />
                </div>

                <div className="bg-[#FAFAFA] border border-[#D9D9D9] rounded-2xl space-y-8 shadow-md p-4 lg:p-6">
                    <h1 className="text-sm md:text-xl lg:text-2xl font-bold">Carbon Credit Status</h1>
                    <div className={clsx("w-full", "flex", is1380 ? "flex-row" : "flex-col", "gap-3")}>
                        <div className="bg-white border border-[#D9D9D9] lg:rounded-2xl rounded-[10px] w-full shadow-md p-4 lg:p-6">
                            <h1 className="text-[10px] md:text-sm lg:text-base">Credit Price (1 ton of CO2)</h1>
                            <p className="text-sm md:text-base lg:text-2xl font-bold">IDR 150.000</p>
                        </div>

                        <div className="bg-white border border-[#D9D9D9] lg:rounded-2xl rounded-[10px] w-full shadow-md p-4 lg:p-6">
                            <h1 className="text-[10px] md:text-sm lg:text-base">Total Available Credit</h1>
                            <p className="text-sm md:text-base lg:text-2xl font-bold">350 tons of CO2</p>
                        </div>
                    </div>
                    <div className="flex-1 border-t border-primary"></div>
                    <h1 className="text-sm md:text-xl lg:text-2xl font-bold">Buy Carbon Credit</h1>
                    {is1380 ? (
                        <div className="flex gap-3 justify-between ">
                            <input type="text" className="border border-gray-300 rounded-md p-2 focus:outline-none " />
                            <div className="hidden lg:block lg:text-sm">
                                <h1>Total Price</h1>
                                <h1 className="font-bold">IDR 150.000</h1>
                            </div>
                            <button className="bg-primary text-white rounded-md p-2 lg:px-4 lg:py-2 text-[clamp(0.5rem,1vw+0.5rem,1.25rem)] font-radley cursor-pointer">Buy Now</button>
                        </div>
                    ) : (
                        <>
                            <div className="flex w-full">
                                <input type="text" className="border border-gray-300 rounded-md p-2 focus:outline-none w-full" />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden lg:block lg:text-sm">
                                    <h1>Total Price</h1>
                                    <h1 className="font-bold">IDR 150.000</h1>
                                </div>
                                <button className="bg-primary text-white rounded-md p-2 lg:px-4 lg:py-2 text-[clamp(0.5rem,1vw+0.5rem,1.25rem)] font-radley cursor-pointer">
                                    Buy Now
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className="bg-[#FAFAFA] border border-[#D9D9D9] rounded-2xl space-y-4 lg:space-y-8 shadow-md p-4 lg:p-6">
                    <h1 className="text-sm md:text-xl lg:text-2xl font-bold">Carbon Emissions Calculator</h1>
                    <p className="text-[10px] md:text-base">Input sludge volume to predict carbon emissions produced</p>
                    <div className="flex gap-3 justify-between">
                        <div className="space-y-2 w-full">
                            <h1 className="text-[10px] md:text-base lg:text-xl">Volume Sudge (ton)</h1>
                            <input type="number" name="massa" onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 h-[36px] text-base focus:outline-none w-full" />
                        </div>
                        <div className="space-y-2 text-xl w-full">
                            <h1 className="text-[10px] md:text-base lg:text-xl">Sludge Type</h1>

                            <Select name="sludge_type" onValueChange={handleSelectChange}>
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
                    <button type="button" onClick={handleCalculate} className="bg-primary text-white rounded-md px-4 py-2 font-radley w-full cursor-pointer">
                        Calculate Emissions
                    </button>
                    <div className="flex-1 border-t border-primary"></div>
                    <h1 className="text-sm md:text-xl lg:text-2xl font-bold">Calculation Result</h1>
                    <div className="flex justify-between gap-2 w-full">
                        <div className="bg-[#FFB2B273] py-6 px-4 w-full rounded-sm">
                            <h1 className="text-sm lg:text-base">Emissions Produced</h1>
                            <h1 className="text-sm lg:text-base font-bold text-[#C63B3B]">{calculateResult?.emissions_produced.emission_ton} ton CO2</h1>
                        </div>
                        <div className="bg-[#20FF0C33] py-6 px-4 w-full rounded-sm">
                            <h1 className="text-sm lg:text-base">Reduced Potentional</h1>
                            <h1 className="text-sm lg:text-base font-bold text-[#3CAA32]">{calculateResult?.reduced_potential?.emission_ton} ton CO2</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
