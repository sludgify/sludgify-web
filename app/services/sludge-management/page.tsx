"use client";
import { Navbar } from "@/components/navbar";
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { BannerFooter } from "@/components/banner-footer";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function Page() {
    const [selectedSection, setSelectedSection] = useState<number>(1);

    const handleClick = (sect: number) => {
        setSelectedSection(sect);
    };
    const content = [
        {
            h1: "1500+",
            h2: "Tons of sludge managed",
        },
        {
            h1: "500+",
            h2: "Business-to-business client",
        },
        {
            h1: "450+",
            h2: "Sludge Management Projects",
        },
    ];

    return (
        <div className="flex min-h-screen w-screen flex-col">
            <Navbar />
            {/* Banner */}
            <div className="bg-[url('/bg-sludge-management.svg')] text-secondary w-full bg-no-repeat bg-cover bg-center h-[300px] md:h-[690px] md:space-y-3 flex flex-col justify-center gap-3 p-8 md:p-20 ">
                <h1 className="text-2xl md:text-6xl  font-radley">We Transform Industrial Sludge Into Competitive Advantage And Accelerate Your ESG Performance</h1>
                <p className="max-w-[815px] text-[10px] md:text-base">
                    Sludgify transforms industrial waste into competitive advantage, delivering zero-waste sludge solutions that drive ESG performance, ensure regulatory compliance, and create measurable value for forward-thinking
                    manufacturers
                </p>
                <Button className="font-radley md:p-6 p-3 w-fit text-sm md:text-lg cursor-pointer bg-gradient-to-b from-primary to-[#525252]">Let’s Collaborate</Button>
            </div>
            {/* Content */}
            <div className="container flex flex-col-reverse md:flex-row justify-center gap-8 md:px-10 px-8 mx-auto py-5 md:py-10">
                <Image src={"/Rectangle 111.svg"} width={549} height={497} alt="Sludgify illustration" className="rounded-xl md:block hidden" />
                <Image src={"/Rectangle 111 (1).svg"} width={549} height={497} alt="Sludgify illustration" className="rounded-xl md:hidden block" />
                <div className="md:px-24 flex flex-col justify-center md:space-y-7 w-full md:w-[50%] ">
                    <h1 className="hidden md:block text-7xl font-radley">
                        Your Zero-Waste <br /> Sludge Solution
                    </h1>
                    <h1 className="block md:hidden text-sm font-radley">Your Zero-Waste Sludge Solution</h1>
                    <p className="text-[10px] md:text-xl text-[#505050]">
                        We provide end-to-end sludge management for both hazardous (B3) and non-hazardous waste using a zero-waste approach, in partnership with licensed provider Pituku. Our service includes full ESG support—complete with
                        carbon emission tracking and sustainability reporting to help you meet compliance and stakeholder expectations.
                    </p>
                    <div className="grid grid-cols-3 items-center md:gap-8 my-6">
                        {content.map((item, index) => (
                            <div key={index} className="md:w-[170px]">
                                <h1 className="text-sm md:text-3xl font-radley">{item.h1}</h1>
                                <h2 className="text-xs md:text-lg font-radley text-[#000000]">{item.h2}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-14 items-center justify-center w-screen px-10 md:px-24 py-10 bg-[#FAFAFA]">
                <div className="flex justify-start w-full">
                    <h1 className="text-xl md:text-7xl text-center md:text-left font-radley">
                        Track Progress With Our Sludge <br /> Management Dashboard
                    </h1>
                </div>
                <div className="md:flex md:flex-row flex flex-col-reverse items-center w-full">
                    <div className="md:w-[40%] space-y-10">
                        <div className="space-y-2 md:space-y-4">
                            <h1 className="text-sm md:text-3xl font-radley md:py-3"> Visibility</h1>
                            <p className="text-[10px] md:text-xl text-[#505050]">Get a clear, real-time overview of your sludge operations from volumes handled to CO₂ impact—empowering smarter, data-driven decisions.</p>
                        </div>
                        <div className="space-y-2 md:space-y-4">
                            <h1 className="text-sm md:text-3xl font-radley md:py-3">ESG & Compliance-Ready</h1>
                            <p className="text-[10px] md:text-xl text-[#505050]">Easily track carbon reductions, manage reporting, and meet regulatory standards to strengthen your ESG performance and sustainability goals.</p>
                        </div>
                        <div className="space-y-2 md:space-y-4">
                            <h1 className="text-sm md:text-3xl font-radley md:py-3">Value Creation </h1>
                            <p className="text-[10px] md:text-xl text-[#505050]">Turn waste into measurable impact through carbon credits and zero-waste strategies, contributing directly to cost efficiency and environmental value.</p>
                        </div>
                    </div>
                    <Image src={"/management-dashboard.svg"} alt="management-dashboard" height={504} width={831} className="-mt-8 object-cover hidden md:block w-[60%] h-[544px]" />
                    <Image src={"/management-dashboard-mobile.svg"} alt="management-dashboard" height={198} width={302} className="-mt-8 object-cover block md:hidden h-[198px]" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mb-20 gap-10 md:gap-0 bg-[#FAFAFA] p-10 md:p-0">
                {/* Desktop Section */}
                <div className="md:flex hidden w-full h-[504px]">
                    <Image src={"/Rectangle 112.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                    <div className="px-24 flex flex-col justify-center space-y-7 w-[50%] ">
                        <h1 className="text-7xl font-radley">We Transform Your Non-B3 Sludge Into Organic Fertilizer</h1>
                        <p className="text-xl text-[#505050]">
                            Through our sustainable treatment process, we convert your sludge into high-quality organic fertilizer, helping you reduce waste, cut emissions, and support regenerative agriculture
                        </p>
                    </div>
                </div>
                <div className="md:flex hidden w-full h-[504px]">
                    <div className="px-24 flex flex-col justify-center space-y-7 w-[50%] ">
                        <h1 className="text-7xl font-radley">B3 Sludge Co-Processing Service</h1>
                        <p className="text-xl text-[#505050]">
                            We treat B3 sludge safely through cement kiln co-processing—eliminating harmful substances while converting waste into alternative fuel or raw material. A zero-residue, regulation-compliant solution aligned with
                            ESG and circular economy goals.
                        </p>
                    </div>
                    <Image src={"/Rectangle 113.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                </div>
                {/* Mobile Section */}
                <div className="md:hidden flex flex-col items-center space-y-4 w-full">
                    <h1 className="text-xl px-6 text-center font-radley">We Transform Your Non-B3 Sludge Into Organic Fertilizer</h1>
                    <Image src={"/Rectangle 112.svg"} alt="bg-client" height={200} width={301} className="object-cover rounded-[8px] block w-[301px] h-[200px]" />
                    <p className="text-[10px] text-center md:text-xl text-[#505050]">
                        Through our sustainable treatment process, we convert your sludge into high-quality organic fertilizer, helping you reduce waste, cut emissions, and support regenerative agriculture
                    </p>
                </div>
                <div className="md:hidden flex flex-col items-center space-y-4 w-full">
                    <h1 className="text-xl px-6 text-center font-radley">B3 Sludge Co-Processing Service</h1>
                    <Image src={"/Rectangle 113.svg"} alt="bg-client" height={200} width={301} className="object-cover rounded-[8px] block w-[301px] h-[200px]" />
                    <p className="text-[10px] text-center md:text-xl text-[#505050]">
                        We treat B3 sludge safely through cement kiln co-processing—eliminating harmful substances while converting waste into alternative fuel or raw material. A zero-residue, regulation-compliant solution aligned with ESG
                        and circular economy goals.
                    </p>
                </div>
            </div>
            {/* Sludge Management Workflow*/}
            <div className="md:h-screen p-10 md:p-0 md:my-36">
                {selectedSection === 1 && (
                    <div>
                        <h1 className="text-xl md:text-7xl text-center font-radley">Non-B3 Sludge Management Workflow</h1>
                        <Image src={"/non-b3-workflow.svg"} alt="bg-client" height={688} width={1120} className="w-[100%] md:h-[690px]" />
                    </div>
                )}
                {selectedSection === 2 && (
                    <div>
                        <h1 className="text-xl md:text-7xl  text-center font-radley">B3 Sludge Management Workflow</h1>
                        <Image src={"/b3-workflow.svg"} alt="bg-client" height={688} width={1119} className="w-[100%] md:h-[688px]" />
                    </div>
                )}
                <div className="font-radley text-xl md:text-4xl flex items-center justify-center gap-4 p-4">
                    <div className={clsx(selectedSection === 1 && "bg-primary text-white", "border px-4 py-1 rounded-[10px] cursor-pointer")} onClick={() => handleClick(1)}>
                        1
                    </div>
                    <div className={clsx(selectedSection === 2 && "bg-primary text-white", "border px-4 py-1 rounded-[10px] cursor-pointer")} onClick={() => handleClick(2)}>
                        2
                    </div>
                </div>
            </div>
            <BannerFooter />
            <Footer />
        </div>
    );
}
