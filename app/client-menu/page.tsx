"use client";

import { ClientNavbar } from "@/components/client-navbar";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function ClientMenu() {
    const [selectedSection, setSelectedSection] = useState<number | null>(null);
    const pageNumbers = [1, 2, 3, 4];

    useEffect(() => {
        const saved = localStorage.getItem("section");
        if (saved) {
            setSelectedSection(JSON.parse(saved));
        } else {
            setSelectedSection(1);
        }
    }, []);

    const handleClick = (sect: number) => {
        setSelectedSection(sect);
        localStorage.setItem("section", JSON.stringify(sect));
    };

    if (selectedSection === null) {
        return null;
    }

    return (
        <div>
            <ClientNavbar />
            {/* Banner */}
            <div className="bg-[url('/bg-client.svg')]  bg-no-repeat bg-cover bg-center h-[462px] flex flex-col justify-center pl-[10%] text-secondary">
                <h1 className="text-5xl font-radley">Insights That Drive Sustainable Impact</h1>
                <h2>Explore the latest articles, reports, and expert perspectives on ESG and waste management.</h2>
            </div>

            <div className="flex items-center h-[80px] p-6 space-x-10 bg-[#FAFAFA]">
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Image src="/stats.svg" width={43} height={43} alt="stats" />
                    <h1 className="font-radley text-xl leading-tight">
                        Trending <br /> Insights
                    </h1>
                </div>

                <div className="w-[1px] h-[40px] bg-black flex-shrink-0" />

                {/* Trending Headlines */}
                {[
                    <>
                        Smart Waste Strategies for Green <br /> & Gold PORPER
                    </>,
                    <>
                        79% of global investors consider ESG a <br /> critical factor in their investment decisions
                    </>,
                    <>
                        AI & Sustainability: The Power <br /> Of Integration
                    </>,
                    <>
                        Transforming Hazardous <br /> Sludge Into Organic Fertilizer
                    </>,
                ].map((item, idx, arr) => (
                    <div key={idx} className="flex items-center space-x-10 flex-shrink-0">
                        <h1 className="leading-tight">{item}</h1>
                        {idx !== arr.length - 1 && <div className="w-[1px] h-[40px] bg-black" />}
                    </div>
                ))}
            </div>

            {/* Section Selection */}
            <div className="font-radley text-4xl flex items-center justify-end gap-4 p-4">
                <div className={clsx(selectedSection === 1 && "bg-primary text-white", "border px-4 py-1 rounded-[10px] cursor-pointer")} onClick={() => handleClick(1)}>
                    1
                </div>
                <div className={clsx(selectedSection === 2 && "bg-primary text-white", "border px-4 py-1 rounded-[10px] cursor-pointer")} onClick={() => handleClick(2)}>
                    2
                </div>
            </div>

            <div>
                {selectedSection === 1 && (
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex w-full h-[504px]">
                                <Image src={"/Rectangle 104.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                                <div className="px-12 space-y-10 w-[50%] ">
                                    <h1 className="text-5xl font-radley">
                                        Zero-Waste Sludge <br /> Solutions
                                    </h1>
                                    <p className="text-3xl text-[#505050]">
                                        Manage your B3 and non-B3 sludge waste sustainably and in full compliance with regulations. We provide detailed reports covering waste treatment activities and carbon footprint calculations to support
                                        your ESG and decarbonization goals.
                                    </p>
                                    <div className="flex gap-2 font-radley w-[340px]">
                                        <div>
                                            <h1 className="text-4xl">1500+</h1>
                                            <h1>Tons of sludge managed</h1>
                                        </div>
                                        <div>
                                            <h1 className="text-4xl">1000+</h1>
                                            <h1>Tons carbon emissions Reduced</h1>
                                        </div>
                                    </div>
                                    <Button className="font-radley text-xl px-9 py-2">Request Pick up</Button>
                                </div>
                            </div>
                            <div className="flex w-full h-[504px]">
                                <div className="p-12 space-y-7 w-[50%] ">
                                    <h1 className="text-5xl font-radley">Sustainability Reporting</h1>
                                    <p className="text-3xl text-[#505050]">
                                        We provide end-to-end support for sustainability reporting, ensuring full compliance with GRI and other frameworks, and helping you communicate your ESG performance with clarity and accountability.
                                    </p>
                                    <div className="flex gap-6 font-radley w-[400px]">
                                        <div>
                                            <h1 className="text-4xl">180+</h1>
                                            <h1>Clients Sustainability Reporting</h1>
                                        </div>
                                        <div>
                                            <h1 className="text-4xl">GRI</h1>
                                            <h1>Sustainability Reporting standards</h1>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button className="font-radley text-xl px-9 py-2">Request Report</Button>
                                    </div>
                                </div>
                                <Image src={"/Rectangle 104.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-8 w-screen p-12">
                            <div className="border border-gray-200 w-[636px] h-[781px] flex flex-col justify-between rounded-xl p-10">
                                <Image src={"/Rectangle 105.svg"} alt="bg-client" height={504} width={721} className="w-[560.26px] object-cover block h-[377px]" />
                                <div>
                                    <h1 className="font-radley text-5xl">AI-Powered ESG Analyst</h1>
                                    <p className="text-2xl text-[#505050]">
                                        Our AI-powered analyst delivers automated ESG assessments, materiality mapping, and carbon insights with precision. Helping you stay compliant, proactive, and ahead of ESG expectations.
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <Button className="font-radley text-xl px-9 py-2">Access Sludgify AI</Button>
                                </div>
                            </div>
                            <div className="border border-gray-200 w-[636px] h-[781px] flex flex-col justify-between rounded-xl p-10">
                                <Image src={"/Rectangle 109.svg"} alt="bg-client" height={504} width={721} className="w-[560.26px] object-cover block h-[377px]" />
                                <div>
                                    <h1 className="font-radley text-5xl">Carbon Consulting</h1>
                                    <p className="text-2xl text-[#505050]">
                                        Our carbon consulting service delivers actionable insights and customized strategies to help you measure sludge-related emissions, ensure regulatory compliance, and confidently reach your climate
                                        targets.
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <Button className="font-radley text-xl px-9 py-2">Consult Now</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {selectedSection === 2 && (
                    <div className="flex flex-col gap-20 py-4">
                        <div className="flex flex-col gap-20 items-center">
                            <div className="flex w-full h-[504px]">
                                <Image src={"/Rectangle 95.svg"} alt="bg-client" height={504} width={721} className="w-[55%] object-cover block h-[504px]" />
                                <div className="px-12 space-y-10 w-[50%] ">
                                    <h1 className="text-5xl font-radley">
                                        AI & Sustainability: The <br /> Power Of Integration
                                    </h1>
                                    <p className="text-2xl text-[#505050]">
                                        There are three key practices that can help companies adopt a more carbon-conscious approach to artificial intelligence, often referred to as “eco-AI.” By aligning their technology strategies with
                                        sustainability goals, organizations can ensure that their use of AI not only drives innovation but also minimizes environmental impact.
                                    </p>
                                    <Button className="font-radley text-xl px-9 py-2">Read More</Button>
                                </div>
                            </div>
                            <div>
                                <div className="flex w-full h-[504px]">
                                    <div className="p-12 space-y-7 w-[50%] ">
                                        <h1 className="text-5xl font-radley">Smart Waste Strategies for Green & Gold PROPER</h1>
                                        <p className="text-2xl text-[#505050]">
                                            This article explores industrial waste management strategies that go beyond regulatory compliance to enhance operational efficiency. It outlines key challenges, innovative solutions, and practical
                                            steps companies can take to manage waste sustainably and responsibly.
                                        </p>
                                        <div className="flex justify-end">
                                            <Button className="font-radley text-xl px-9 py-2">Request Report</Button>
                                        </div>
                                    </div>
                                    <Image src={"/Rectangle 96.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                                </div>
                                <div className="flex w-full h-[504px]">
                                    <Image src={"/Sludgify Ilustration (7) 1.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                                    <div className="p-12 space-y-10 w-[50%] ">
                                        <h1 className="text-5xl font-radley">79% of global investors consider ESG a critical factor in their investment decisions</h1>
                                        <p className="text-2xl text-[#505050]">
                                            A recent survey reveals that 79% of global investors now view ESG (Environmental, Social, and Governance) factors as a crucial part of their investment decision-making. This shift reflects growing
                                            awareness of sustainability risks and opportunities in the financial sector.
                                        </p>
                                        <Button className="font-radley text-xl px-9 py-2">Read More</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full h-[504px]">
                                <Image src={"/Rectangle 99.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                                <div className="px-12 space-y-10 w-[50%] ">
                                    <h1 className="text-5xl font-radley">Transforming Hazardous Sludge into Organic Fertilizer: A Sustainable Solution for the Environment and Agriculture</h1>
                                    <p className="text-2xl text-[#505050]">
                                        Hazardous and Toxic Waste (B3) has long been a major concern in industrial waste management and wastewater treatment. However, what many may not realize is that B3 sludge—often seen as harmful
                                        waste—holds significant potential to be transformed into organic fertilizer useful for agriculture. In this article, we explore how this process can deliver dual benefits: reducing the environmental
                                        impact of B3 waste while enhancing agricultural productivity.
                                    </p>
                                    <Button className="font-radley text-xl px-9 py-2">Read More</Button>
                                </div>
                            </div>
                            <div className="flex w-full h-[504px]">
                                <div className="p-12 space-y-7 w-[50%] ">
                                    <h1 className="text-5xl font-radley">German Chancellor Pushes EU to Scrap Corporate Sustainability Due Diligence Law</h1>
                                    <p className="text-2xl text-[#505050]">
                                        The German Chancellor is urging the European Union to withdraw or reconsider the Corporate Sustainability Due Diligence Directive (CSDDD), a proposed law that would require companies to ensure their
                                        supply chains meet environmental and human rights standards. The move reflects concerns from Germany’s business sector about regulatory burdens and potential impacts on competitiveness.
                                    </p>
                                    <div className="flex justify-end">
                                        <Button className="font-radley text-xl px-9 py-2">Read More</Button>
                                    </div>
                                </div>
                                <Image src={"/Rectangle 100.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                            </div>
                        </div>
                        <Pagination>
                            <PaginationContent className="text-xl [&>li>a]:text-xl">
                                <PaginationItem className="border rounded-lg">
                                    <PaginationPrevious />
                                </PaginationItem>
                                {pageNumbers.map((num) => (
                                    <PaginationItem key={num} className="border rounded-lg flex items-center justify-center w-10 h-10">
                                        <PaginationLink className="text-2xl text-center">{num}</PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem className="border rounded-lg flex items-center">
                                    <PaginationNext />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
