"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function ClientMenu() {
    // const [selectedSection, setSelectedSection] = useState<number | null>(null);
    // const pageNumbers = [1, 2, 3, 4];

    // useEffect(() => {
    //     const saved = localStorage.getItem("section");
    //     if (saved) {
    //         setSelectedSection(JSON.parse(saved));
    //     } else {
    //         setSelectedSection(1);
    //     }
    // }, []);

    // const handleClick = (sect: number) => {
    //     setSelectedSection(sect);
    //     localStorage.setItem("section", JSON.stringify(sect));
    // };

    // if (selectedSection === null) {
    //     return null;
    // }
    const stats = [
        {
            title: "Carbon Credit",
            value: "50,450 ton CO2",
            icon_change: <Image src="/arrow-up.svg" alt="recycle" width={20} height={20} />,
            change: "12%",
            changeType: "positive",
            icon: "/carbon-stats.svg",
        },
        {
            title: "Emission Reduction",
            value: "100,450 ton CO2",
            icon_change: <Image src="/arrow-down.svg" alt="recycle" width={20} height={20} />,
            change: "0,8%",
            changeType: "negative",
            icon: "/emission-stats.svg",
        },
        {
            title: "Sludge Managed (ton)",
            value: "900.839 ton ",
            icon_change: <Image src="/arrow-up.svg" alt="recycle" width={20} height={20} />,
            change: "35%",
            changeType: "positive",
            icon: "/sludge-stats.svg",
        },
    ];

    return (
        <div className="px-8 py-12 font-calibri space-y-5 max-w-[1280px]">
            <h1 className="text-4xl font-bold font-calibri border-b border-[#D9D9D9] pb-3">Your ESG Journey Starts Here</h1>
            <div className="space-y-5">
                {/*Stats */}
                <div className="flex justify-between">
                    {stats.map((stat, index) => {
                        return (
                            <div key={index} className="bg-[#FAFAFA] w-[251px] rounded-2xl shadow-md p-3 space-y-2">
                                <div className="flex items-center justify-between">
                                    <h1 className="">{stat.title}</h1>
                                    <div
                                        className={`flex items-center gap-2 text-sm font-medium rounded-[5px] p-1 ${
                                            stat.changeType === "positive" ? "text-[#407E8B] bg-[#EAF1EF] " : stat.changeType === "negative" ? "text-[#A74941] bg-[#F5EBE7]" : ""
                                        }`}
                                    >
                                        <h1>{stat.icon_change}</h1>
                                        <h1>{stat.change}</h1>
                                    </div>
                                </div>
                                <Image src={stat.icon} alt={stat.title} width={226} height={60} />
                                <h1 className="text-2xl">{stat.value}</h1>
                            </div>
                        );
                    })}
                    <div className="bg-[#FAFAFA] w-[251px] rounded-2xl shadow-md p-3 flex flex-col">
                        <h1 className="text-left">Active Projects</h1>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                <Image src={"/progress-2.svg"} alt="active projects" width={30} height={30} />
                                <h1 className="text-[#407E8B] font-bold font-calibri text-2xl">5 In Progress</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full bg-[#FAFAFA] rounded-2xl shadow-md p-6">
                    <Image src={"/Rectangle 134.svg"} alt="bg-client" height={279} width={490} className="w-[490px] h-[279px]" />
                    <div className="px-8 space-y-10">
                        <div className="space-y-2 w-[538px]">
                            <h1 className="text-4xl font-calibri font-bold">Zero-Waste Sludge Solutions</h1>
                            <p className="text-xl font-calibri text-[#505050]">
                                We deliver integrated sludge management for hazardous and non-hazardous waste through a zero-waste model, in collaboration with licensed partner Pituku. Our offering includes end-to-end ESG support, with
                                carbon tracking and waste reporting to ensure compliance and build stakeholder trust.
                            </p>
                        </div>
                        <Link href={"/request/sludge-pickup"}>
                            <Button className="font-radley text-xl px-9 py-2">Request Pick up</Button>
                        </Link>
                    </div>
                </div>
                <div className="flex w-full bg-[#FAFAFA] rounded-2xl shadow-md p-6">
                    <div className="px-8 space-y-10">
                        <div className="space-y-2 w-[538px]">
                            <h1 className="text-4xl font-calibri font-bold">Sustainability Reporting</h1>
                            <p className="text-xl font-calibri text-[#505050]">
                                We provide end-to-end sustainability reporting aligned with GRI Standards, combining strategic ESG advisory with comprehensive Scope 1, 2, and 3 carbon emissions calculations. Our service enables clear,
                                credible disclosures that support regulatory compliance, investor confidence, and long-term value creation
                            </p>
                        </div>
                        <Link href={"/request/sustainability-reports"}>
                            <div className="flex justify-start">
                                <Button className="font-radley text-xl px-9 py-2">Request Report</Button>
                            </div>
                        </Link>
                    </div>
                    <Image src={"/Rectangle 135.svg"} alt="bg-client" height={279} width={490} className="w-[490px] h-[279px]" />
                </div>
                <h1 className="text-4xl font-bold font-calibri">Industry Updates</h1>
                <div className="grid grid-cols-2 gap-5">
                    <div className="w-full row-span-2 bg-[#FAFAFA] rounded-2xl shadow-md flex flex-col justify-around p-6">
                        <div className="font-calibri border-b pb-2">
                            <h1 className="text-xl font-bold">Indonesia’s Journey to Net Zero by 2060</h1>
                            <p className="text-[#525252]">
                                The Indonesian government has launched a new roadmap to achieve net zero emissions by 2060. The plan places strong emphasis on the industrial and waste management sectors, aiming for a 41% reduction in
                                emissions from waste by 2030.
                            </p>
                        </div>
                        <div className="font-calibri border-b pb-2">
                            <h1 className="text-xl font-bold">Indonesia’s Journey to Net Zero by 2060</h1>
                            <p className="text-[#525252]">
                                The Indonesian government has launched a new roadmap to achieve net zero emissions by 2060. The plan places strong emphasis on the industrial and waste management sectors, aiming for a 41% reduction in
                                emissions from waste by 2030.
                            </p>
                        </div>
                        <div className="font-calibri border-b pb-2">
                            <h1 className="text-xl font-bold">Indonesia’s Journey to Net Zero by 2060</h1>
                            <p className="text-[#525252]">
                                The Indonesian government has launched a new roadmap to achieve net zero emissions by 2060. The plan places strong emphasis on the industrial and waste management sectors, aiming for a 41% reduction in
                                emissions from waste by 2030.
                            </p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="flex -space-x-6">
                                <Image src={"/Ellipse 7.svg"} alt="badge" width={47} height={47} />
                                <Image src={"/Ellipse 8.svg"} alt="badge" width={47} height={47} />
                                <Image src={"/Ellipse 9.svg"} alt="badge" width={47} height={47} />
                            </div>
                            <h1 className="text-[#525252] text-xl font-bold">100 Source</h1>
                        </div>
                    </div>
                    <div className="w-full bg-[#FAFAFA] rounded-2xl shadow-md space-y-5 p-6">
                        <h1 className="font-bold text-xl text-center">Most Polluted Industry</h1>
                        <div className="flex justify-between font-calibri border-b pb-2 w-full">
                            <div className="flex items-center gap-2">
                                <Image src={"/Rectangle 219.svg"} alt="manufacture" width={29} height={29} />
                                <h1>Manufacture</h1>
                            </div>
                            <h1 className="text-[#FF0707]">7,000,000 ton CO2</h1>
                        </div>
                        <div className="flex justify-between font-calibri border-b pb-2 w-full">
                            <div className="flex items-center gap-2">
                                <Image src={"/Rectangle 220.svg"} alt="Oil and Gas" width={29} height={29} />
                                <h1>Oil and Gas</h1>
                            </div>
                            <h1 className="text-[#FF0707]">2,000,000 ton CO2</h1>
                        </div>
                        <div className="flex justify-between font-calibri border-b pb-2 w-full">
                            <div className="flex items-center gap-2">
                                <Image src={"/Rectangle 221.svg"} alt="Mining and Energy" width={29} height={29} />
                                <h1>Mining and Energy</h1>
                            </div>
                            <h1 className="text-[#FF0707]">1,000,000 ton CO2</h1>
                        </div>
                    </div>
                    <div className="w-full bg-[#FAFAFA] rounded-2xl shadow-md space-y-5 p-6">
                        <h1 className="font-bold text-xl text-center">Top Performing Client</h1>
                        <div className="flex justify-between font-calibri border-b pb-2 w-full">
                            <div className="flex items-center gap-2">
                                <Image src={"/Ellipse 10.svg"} alt="PT Unilever" width={29} height={29} />
                                <h1>PT Unilever</h1>
                            </div>
                            <h1 className="text-[#3CAA32]">32,000 ton CO2</h1>
                        </div>
                        <div className="flex justify-between font-calibri border-b pb-2 w-full">
                            <div className="flex items-center gap-2">
                                <Image src={"/Ellipse 10 (1).svg"} alt="PT Hartadinata" width={29} height={29} />
                                <h1>PT Hartadinata</h1>
                            </div>
                            <h1 className="text-[#3CAA32]">28,000 ton CO2</h1>
                        </div>
                        <div className="flex justify-between font-calibri border-b pb-2 w-full">
                            <div className="flex items-center gap-2">
                                <Image src={"/Ellipse 10 (2).svg"} alt="PT Sri Rejeki Isman" width={29} height={29} />
                                <h1>PT Sri Rejeki Isman</h1>
                            </div>
                            <h1 className="text-[#3CAA32]">25,800 ton CO2</h1>
                        </div>
                        <div className="flex justify-between font-calibri border-b pb-2 w-full">
                            <div className="flex items-center gap-2">
                                <Image src={"/Ellipse 10 (3).svg"} alt="PT Avian Brands" width={29} height={29} />
                                <h1>PT Avian Brands</h1>
                            </div>
                            <h1 className="text-[#3CAA32]">25,800 ton CO2</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
