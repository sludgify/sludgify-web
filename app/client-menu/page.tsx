import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClientNavbarMobile } from "@/components/client-navbar-mobile";

export default function ClientMenu() {
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
        <div className="lg:px-8 py-4 lg:py-12 font-calibri space-y-5">
            <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-3">
                <h1 className="lg:text-4xl px-8 text-xl font-bold font-calibri ">Your ESG Journey Starts Here</h1>
                <ClientNavbarMobile />
            </div>
            <div className="space-y-5">
                {/*Stats */}
                <div className="overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory w-full">
                    <div className="flex gap-4 px-4 lg:px-0 mb-2 lg:w-full">
                        {stats.map((stat, index) => {
                            return (
                                <div key={index} className="bg-[#FAFAFA] border border-[#D9D9D9] flex-shrink-0 lg:flex-shrink lg:w-full rounded-2xl shadow-lg p-3 space-y-2 snap-center">
                                    <div className="flex items-center justify-between">
                                        <h1 className="lg:text-base text-[10px]">{stat.title}</h1>
                                        <div
                                            className={`flex items-center gap-2 text-lg font-medium rounded-[5px] p-1 ${
                                                stat.changeType === "positive" ? "text-[#407E8B] bg-[#EAF1EF]" : stat.changeType === "negative" ? "text-[#A74941] bg-[#F5EBE7]" : ""
                                            }`}
                                        >
                                            <h1>{stat.icon_change}</h1>
                                            <h1>{stat.change}</h1>
                                        </div>
                                    </div>
                                    <Image src={stat.icon} alt={stat.title} width={226} height={60} />
                                    <h1 className="text-[10px] lg:text-2xl">{stat.value}</h1>
                                </div>
                            );
                        })}

                        <div className="bg-[#FAFAFA] border border-[#D9D9D9] flex-shrink-0 lg:flex-shrink lg:w-full rounded-2xl shadow-lg p-3 flex flex-col snap-center">
                            <h1 className="text-left">Active Projects</h1>
                            <div className="flex-1 flex items-center justify-center">
                                <div className="flex items-center gap-2">
                                    <Image src="/progress-2.svg" alt="active projects" width={30} height={30} />
                                    <h1 className="text-[#407E8B] font-bold font-calibri text-lg lg:text-2xl">5 In Progress</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center lg:flex-row lg:gap-4 lg:justify-around w-fit h-fit lg:w-full border border-[#D9D9D9] bg-[#FAFAFA] rounded-2xl shadow-lg mx-4 lg:mx-0 lg:p-6 p-4">
                    <Image src="/Rectangle 134.svg" alt="bg-client" height={279} width={490} className="w-full lg:max-w-[490px] h-auto object-contain" />
                    <div className="flex flex-col space-y-5 lg:space-y-10 w-full min-w-0">
                        <div className="space-y-2 w-full">
                            <h1 className="text-lg sm:text-xl lg:text-4xl font-calibri font-bold">Zero-Waste Sludge Solutions</h1>
                            <p className="text-xs sm:text-sm lg:text-xl font-calibri text-[#505050]">
                                We deliver integrated sludge management for hazardous and non-hazardous waste through a zero-waste model, in collaboration with licensed partner Pituku. Our offering includes end-to-end ESG support, with
                                carbon tracking and waste reporting to ensure compliance and build stakeholder trust.
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <Link href="/request/sludge-pickup">
                                <Button className="font-radley text-sm sm:text-base lg:text-xl px-4 lg:px-9 py-2">Request Pick up</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse items-center lg:flex-row lg:gap-4 lg:justify-around w-fit h-fit lg:w-full border border-[#D9D9D9] bg-[#FAFAFA] rounded-2xl shadow-lg mx-4 lg:mx-0 lg:p-6 p-4">
                    <div className="flex flex-col space-y-5 lg:space-y-10 w-full min-w-0">
                        <div className="space-y-2 w-full">
                            <h1 className="text-lg lg:text-4xl font-calibri font-bold">Sustainability Reporting</h1>
                            <p className="text-[10px] lg:text-xl font-calibri text-[#505050]">
                                We provide end-to-end sustainability reporting aligned with GRI Standards, combining strategic ESG advisory with comprehensive Scope 1, 2, and 3 carbon emissions calculations. Our service enables clear,
                                credible disclosures that support regulatory compliance, investor confidence, and long-term value creation
                            </p>
                        </div>
                        <div className="flex lg:justify-start justify-end">
                            <Link href={"/request/sustainability-reports"}>
                                <Button className="font-radley lg:text-xl px-5 lg:px-9 py-2">Request Report</Button>
                            </Link>
                        </div>
                    </div>
                    <Image src={"/Rectangle 135.svg"} alt="bg-client" height={279} width={490} className="w-full lg:max-w-[490px] h-auto" />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 p-3">
                    <h1 className="text-lg lg:text-4xl font-bold font-calibri order-3 lg:order-1 col-span-2 lg:col-span-12">Industry Updates</h1>
                    <div className="w-full space-y-2 col-span-2 lg:col-span-8 order-4 lg:order-2 row-span-2 bg-[#FAFAFA] border border-[#D9D9D9] rounded-2xl shadow-lg flex flex-col justify-around p-6">
                        <div className="font-calibri border-b pb-2">
                            <h1 className="text-xs lg:text-xl font-bold">Indonesia’s Journey to Net Zero by 2060</h1>
                            <p className="text-[#525252] lg:text-base text-[10px]">
                                The Indonesian government has launched a new roadmap to achieve net zero emissions by 2060. The plan places strong emphasis on the industrial and waste management sectors, aiming for a 41% reduction in
                                emissions from waste by 2030.
                            </p>
                        </div>
                        <div className="font-calibri border-b pb-2">
                            <h1 className="text-xs lg:text-xl font-bold">New Industrial Waste Regulations Create Reporting Opportunities</h1>
                            <p className="text-[#525252] lg:text-base text-[10px]">
                                A new regulation mandates manufacturing companies to disclose the carbon footprint of their waste management activities. With a compliance deadline set for Q4 2025, this opens significant opportunities for
                                sustainability reporting services.
                            </p>
                        </div>
                        <div className="font-calibri border-b pb-2">
                            <h1 className="text-xs lg:text-xl font-bold">Carbon Credit Prices Surge, Driving Sustainability Investments</h1>
                            <p className="text-[#525252] lg:text-base text-[10px]">
                                Carbon credit prices have risen by 15% over the past three months, reaching $45 per ton of CO2. This upward trend is accelerating investments in waste management technologies and sustainability projects
                                across Southeast Asia.
                            </p>
                        </div>
                        <div className="flex gap-2 items-center border border-[#D9D9D9] rounded-lg p-2 w-fit">
                            <div className="flex lg:-space-x-6 -space-x-1">
                                <Image src={"/Ellipse 7.svg"} alt="badge" width={47} height={47} className="lg:w-[47px] lg:h-[47px] w-[15px] h-[15px]" />
                                <Image src={"/Ellipse 8.svg"} alt="badge" width={47} height={47} className="lg:w-[47px] lg:h-[47px] w-[15px] h-[15px]" />
                                <Image src={"/Ellipse 9.svg"} alt="badge" width={47} height={47} className="lg:w-[47px] lg:h-[47px] w-[15px] h-[15px]" />
                            </div>
                            <h1 className="text-[#525252] text-[10px] lg:text-xl font-bold">100 Source</h1>
                        </div>
                    </div>
                    <div className="w-full lg:col-span-4 order-1 lg:order-3 bg-[#FAFAFA] border border-[#D9D9D9] rounded-2xl shadow-lg space-y-5 p-3 lg:p-4">
                        <h1 className="font-bold text-center text-[clamp(0.75rem,1vw+0.5rem,1.25rem)]">Most Polluted Industry</h1>

                        {[
                            { src: "/Rectangle 219.svg", alt: "Manufacture", name: "Manufacture", value: "7,000,000 ton CO2" },
                            { src: "/Rectangle 220.svg", alt: "Oil and Gas", name: "Oil and Gas", value: "2,000,000 ton CO2" },
                            { src: "/Rectangle 221.svg", alt: "Mining and Energy", name: "Mining and Energy", value: "1,000,000 ton CO2" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-5 justify-between items-center font-calibri border-b pb-2 w-full text-[clamp(0.5rem,0.8vw,1rem)]">
                                <div className="flex items-center gap-2 w-[50%]">
                                    <Image src={item.src} alt={item.alt} width={29} height={29} className="w-[clamp(15px,3vw,29px)] h-[clamp(15px,3vw,29px)]" />
                                    <span>{item.name}</span>
                                </div>
                                <span className="text-[#FF0707] w-[50%]">{item.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full lg:col-span-4 order-2 lg:order-4 bg-[#FAFAFA] border border-[#D9D9D9] rounded-2xl shadow-lg space-y-5 p-3 lg:p-4">
                        <h1 className="font-bold text-center text-[clamp(0.75rem,1vw+0.5rem,1.25rem)]">Top Performing Client</h1>

                        {[
                            { src: "/Ellipse 10.svg", alt: "PT Unilever", name: "PT Unilever", value: "32,000 ton CO2" },
                            { src: "/Ellipse 10 (1).svg", alt: "PT Hartadinata", name: "PT Hartadinata", value: "28,000 ton CO2" },
                            { src: "/Ellipse 10 (2).svg", alt: "PT Sri Rejeki Isman", name: "PT Sri Rejeki Isman", value: "25,800 ton CO2" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-5 justify-between items-center font-calibri border-b pb-2 w-full text-[clamp(0.5rem,0.8vw,1rem)]">
                                <div className="flex items-center gap-2  ">
                                    <Image src={item.src} alt={item.alt} width={29} height={29} className="w-[clamp(15px,3vw,29px)] h-[clamp(15px,3vw,29px)]" />
                                    <span>{item.name}</span>
                                </div>
                                <span className="text-[#3CAA32] w-[50%]">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
