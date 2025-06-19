"use client";
import { Navbar } from "@/components/navbar";
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { BannerFooter } from "@/components/banner-footer";
import { Footer } from "@/components/footer";

export default function Page() {
    const [selectedSection, setSelectedSection] = useState<number>(1);

    const handleClick = (sect: number) => {
        setSelectedSection(sect);
    };

    return (
        <div className="flex min-h-screen w-screen flex-col">
            <Navbar />
            {/* Banner */}
            <div>
                <Image src={"/bg-sludge-management.svg"} alt="sludge management" width={1920} height={659} />
            </div>
            {/* Content */}
            <div className="flex flex-col items-center justify-center mb-20">
                <div className="flex w-full h-[504px]">
                    <div className="px-20 py-16 flex flex-col justify-center space-y-5 w-[50%] ">
                        <h1 className="text-7xl font-radley">
                            We&apos;re Here to Help <br /> Your Business Unlock ESG Value
                        </h1>
                        <p className="text-xl text-[#505050]">
                            We provide end-to-end support for sustainability reporting, ensuring full compliance with GRI and other frameworks, and helping you communicate your ESG performance with clarity and accountability.
                        </p>
                    </div>
                    <Image src={"/Rectangle 110.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                </div>
                <div className="flex w-full h-[504px]">
                    <Image src={"/Rectangle 111.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                    <div className="px-24 flex flex-col justify-center space-y-7 w-[50%] ">
                        <h1 className="text-7xl font-radley">
                            Your Zero-Waste <br /> Sludge Solution
                        </h1>
                        <p className="text-xl text-[#505050]">
                            We provide end-to-end sludge management for both hazardous (B3) and non-hazardous waste using a zero-waste approach, in partnership with licensed provider Pituku. Our service includes full ESG support—complete
                            with carbon emission tracking and sustainability reporting to help you meet compliance and stakeholder expectations.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-14 items-center justify-center w-screen px-24 py-10 bg-[#FAFAFA]">
                <div className="flex justify-start w-full">
                    <h1 className="text-7xl text-left font-radley">
                        Track Progress With Our Sludge <br /> Management Dashboard
                    </h1>
                </div>
                <div className="flex w-full">
                    <div className="w-[40%] space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-radley border-b py-3"> 01 Visibility</h1>
                            <p className="text-xl text-[#505050]">Get a clear, real-time overview of your sludge operations from volumes handled to CO₂ impact—empowering smarter, data-driven decisions.</p>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-3xl font-radley border-b py-3"> 02 ESG & Compliance-Ready</h1>
                            <p className="text-xl text-[#505050]">Easily track carbon reductions, manage reporting, and meet regulatory standards to strengthen your ESG performance and sustainability goals.</p>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-3xl font-radley border-b py-3"> 03 Value Creation </h1>
                            <p className="text-xl text-[#505050]">Turn waste into measurable impact through carbon credits and zero-waste strategies, contributing directly to cost efficiency and environmental value.</p>
                        </div>
                    </div>
                    <Image src={"/management-dashboard.svg"} alt="management-dashboard" height={504} width={831} className="-mt-8 object-cover block w-[60%] h-[544px]" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mb-20 bg-[#FAFAFA]">
                <div className="flex w-full h-[504px]">
                    <Image src={"/Rectangle 112.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                    <div className="px-24 flex flex-col justify-center space-y-7 w-[50%] ">
                        <h1 className="text-7xl font-radley">We Transform Your Non-B3 Sludge Into Organic Fertilizer</h1>
                        <p className="text-xl text-[#505050]">
                            Through our sustainable treatment process, we convert your sludge into high-quality organic fertilizer, helping you reduce waste, cut emissions, and support regenerative agriculture
                        </p>
                    </div>
                </div>
                <div className="flex w-full h-[504px]">
                    <div className="px-24 flex flex-col justify-center space-y-7 w-[50%] ">
                        <h1 className="text-7xl font-radley">B3 Sludge Co-Processing Service</h1>
                        <p className="text-xl text-[#505050]">
                            We treat B3 sludge safely through cement kiln co-processing—eliminating harmful substances while converting waste into alternative fuel or raw material. A zero-residue, regulation-compliant solution aligned with
                            ESG and circular economy goals.
                        </p>
                    </div>
                    <Image src={"/Rectangle 113.svg"} alt="bg-client" height={504} width={721} className="w-[50%] object-cover block h-[504px]" />
                </div>
            </div>
            {/* Sludge Management Workflow*/}
            <div className="h-screen my-36">
                {selectedSection === 1 && (
                    <div>
                        <h1 className="text-7xl text-center font-radley">Non-B3 Sludge Management Workflow</h1>
                        <Image src={"/non-b3-workflow.svg"} alt="bg-client" height={688} width={1120} className="w-[100%] h-[690px]" />
                    </div>
                )}
                {selectedSection === 2 && (
                    <div>
                        <h1 className="text-7xl text-center font-radley">B3 Sludge Management Workflow</h1>
                        <Image src={"/b3-workflow.svg"} alt="bg-client" height={688} width={1119} className="w-[100%] h-[688px]" />
                    </div>
                )}
                <div className="font-radley text-4xl flex items-center justify-center gap-4 p-4">
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
