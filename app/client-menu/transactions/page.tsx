"use client";
import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Image from "next/image";
import clsx from "clsx";
import { ClientNavbarMobile } from "@/components/client-navbar-mobile";
import Link from "next/link";

const data: Transactions[] = [
    {
        id: "SLD240",
        service_name: { name: "Sludge Management", type: "B3" },
        time: "Thu, 23 May 2025",
        location: "Jakarta, Indonesia",
        volume: 1000,
        status: "Completed",
    },
    {
        id: "SLD241",
        service_name: { name: "Non-B3 Collection", type: "Non-B3" },
        time: "Fri, 24 May 2025",
        location: "Bandung, Indonesia",
        volume: 850,
        status: "Waiting Payment",
    },
    {
        id: "SLD242",
        service_name: { name: "Oil Waste Pickup", type: "B3" },
        time: "Sat, 25 May 2025",
        location: "Surabaya, Indonesia",
        volume: 760,
        status: "On Process",
    },
    {
        id: "SLD243",
        service_name: { name: "Hazardous Sludge", type: "B3" },
        time: "Sun, 26 May 2025",
        location: "Medan, Indonesia",
        volume: 1120,
        status: "Cancelled",
    },
    {
        id: "SLD244",
        service_name: { name: "Chemical Waste", type: "B3" },
        time: "Mon, 27 May 2025",
        location: "Bekasi, Indonesia",
        volume: 900,
        status: "Completed",
    },
    {
        id: "SLD245",
        service_name: { name: "Food Waste", type: "Non-B3" },
        time: "Tue, 28 May 2025",
        location: "Yogyakarta, Indonesia",
        volume: 650,
        status: "Waiting Payment",
    },
    {
        id: "SLD246",
        service_name: { name: "Medical Waste", type: "B3" },
        time: "Wed, 29 May 2025",
        location: "Palembang, Indonesia",
        volume: 980,
        status: "Completed",
    },
    {
        id: "SLD247",
        service_name: { name: "Grease Trap Service", type: "Non-B3" },
        time: "Thu, 30 May 2025",
        location: "Depok, Indonesia",
        volume: 770,
        status: "On Process",
    },
    {
        id: "SLD248",
        service_name: { name: "Industrial Sludge", type: "B3" },
        time: "Fri, 31 May 2025",
        location: "Tangerang, Indonesia",
        volume: 1020,
        status: "Completed",
    },
    {
        id: "SLD249",
        service_name: { name: "Plastic Waste", type: "Non-B3" },
        time: "Sat, 01 Jun 2025",
        location: "Bali, Indonesia",
        volume: 880,
        status: "Cancelled",
    },
];

const status = ["Waiting Payment", "On Process", "Completed", "Cancelled"];

const stats = [
    {
        icon: "/Frame 527.svg",
        title: "Completed",
        value: 150,
        percentage: 8,
        change: "positive",
    },
    {
        icon: "/Frame 464.svg",
        title: "Waiting Payments",
        value: 50,
        percentage: 15,
        change: "positive",
    },
    {
        icon: "/Frame 529.svg",
        title: "On Process",
        value: 100,
        percentage: 30,
        change: "positive",
    },
    {
        icon: "/Frame 530.svg",
        title: "Cancelled",
        value: 15,
        percentage: 32,
        change: "negative",
    },
];

export default function Page() {
    const [selectedStatus, setSelectedStatus] = useState<string | null>("Waiting Payment");

    return (
        <div className="lg:py-8 lg:px-20 md:p-5 lg:space-y-6 font-calibri">
            <div className="flex border-b items-center justify-between py-4 md:p-0 md:pl-0 pl-4">
                <h1 className="font-bold text-4xl">Transaction</h1>
                <ClientNavbarMobile />
            </div>
            <div className="flex md:grid md:grid-cols-4 gap-2 lg:gap-5 p-4 overflow-x-auto md:overflow-x-visible hide-scrollbar font-calibri">
                {stats.map((stat, index) => (
                    <div key={index} className="border rounded-[10px] border-[#D9D9D9] min-w-[170px] md:min-w-0 md:w-full">
                        <div className="flex items-center gap-2 border-b p-2">
                            <Image src={stat.icon} alt="Completed" width={50} height={50} className="w-[20px] h-[20px] md:w-[50px] md:h-[50px]" />
                            <div>
                                <h1 className="text-sm lg:text-base font-bold">{stat.title}</h1>
                                <h1 className="text-sm md:text-lg lg:text-2xl font-bold">{stat.value}</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 p-2 bg-[#FAFAFA]">
                            <div className="flex items-center gap-1">
                                {stat.change == "positive" ? <Image src={"/line-md_arrow-up.svg"} alt="up" width={15} height={15} /> : <Image src={"/line-md_arrow-down.svg"} alt="up" width={15} height={15} />}
                                <h1 className={clsx(stat.change === "positive" ? "text-[#20FF0C]" : "text-[#FF0707]", "text-xs md:text-base")}>{stat.percentage}%</h1>
                            </div>
                            <h1 className="text-xs md:text-sm lg:text-base">From The Last Month</h1>
                        </div>
                    </div>
                ))}
            </div>
            <DataTable columns={columns} data={data} />
            <div className="px-5 md:hidden">
                <div className="flex justify-between gap-2 border-t border-b border-[#D9D9D9]">
                    {status.map((stat, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedStatus(stat)}
                            className={clsx("flex relative items-center justify-center text-xs px-1 py-2 cursor-pointer", selectedStatus === stat && "border-b-2 border-black -mb-[1.5px]")}
                        >
                            <h1 className="font-bold">{stat}</h1>
                        </div>
                    ))}
                </div>
                <div className=" flex flex-col gap-3 mt-3 h-[550px]  overflow-y-scroll hide-scrollbar">
                    {data
                        .filter((transaction) => transaction.status === selectedStatus)
                        .map((transaction, index) => (
                            <div key={index} className="flex flex-col items-start justify-between gap-2 border border-[#D9D9D9] rounded-[10px] p-2">
                                <div className="flex items-center justify-between gap-2 w-full">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-sm font-bold border border-[#D9D9D9] rounded-[10px] p-4">{transaction.id}</h1>
                                        <div className="">
                                            <h1 className="text-sm">{transaction.service_name.name}</h1>
                                            <span className="text-xs text-gray-500">Type {transaction.service_name.type}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h1>Volume:</h1>
                                        <h1 className="text-sm">{transaction.volume} Tons</h1>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-sm">{transaction.location}</h1>
                                    <h1 className="text-sm">{transaction.time}</h1>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
