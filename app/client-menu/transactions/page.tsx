import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Image from "next/image";
import clsx from "clsx";

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
        status: "Failed",
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
        status: "Failed",
    },
];

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
    return (
        <div className="py-8 px-36 space-y-6 font-calibri">
            <h1 className="font-bold text-4xl">Transaction</h1>
            <div className="flex justify-between gap-5">
                {stats.map((stat, index) => (
                    <div key={index} className="border rounded-[10px] border-[#D9D9D9] w-full">
                        <div className="flex items-center gap-2 border-b p-4">
                            <Image src={stat.icon} alt="Completed" width={50} height={50} />
                            <div>
                                <h1>{stat.title}</h1>
                                <h1 className="text-2xl font-bold">{stat.value}</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2">
                            <div className="flex items-center gap-1">
                                {stat.change == "positive" ? <Image src={"/line-md_arrow-up.svg"} alt="up" width={15} height={15} /> : <Image src={"/line-md_arrow-down.svg"} alt="up" width={15} height={15} />}
                                <h1 className={clsx(stat.change === "positive" ? "text-[#20FF0C]" : "text-[#FF0707]")}>{stat.percentage}%</h1>
                            </div>
                            <h1>From The Last Month</h1>
                        </div>
                    </div>
                ))}
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
