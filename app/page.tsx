"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BannerFooter } from "@/components/banner-footer";

import { ValuesCarousel } from "@/components/values-carousel";

export default function Home() {
    const content = [
        {
            h1: "1500+",
            h2: "Tons of sludge managed",
        },
        {
            h1: "180+",
            h2: "Clients Sustainability reporting",
        },
        {
            h1: "1000+",
            h2: "Tons Carbon Emissions Reduced",
        },
        {
            h1: "50+",
            h2: "Compliance Awards",
        },
    ];

    const value = [
        {
            title: "Our Vision",
            desc: "Leading industrial sludge management transformation through sustainable, measurable solutions that accelerate Indonesia's net zero emissions target by 2060. We enable organizations to achieve zero-waste-to-landfill operations while building competitive advantage in accountable environmental stewardship.",
        },
        {
            title: "Our Mission",
            desc: "We accelerate enterprise environmental excellence through comprehensive sludge management, carbon analytics, and data-driven insights that deliver regulatory compliance, stakeholder accountability, and competitive differentiation.",
        },
    ];

    const services = [
        {
            title: "Sludge Pick Up & Management",
            desc: "We manage both B3 and non-B3 sludge responsibly using a zero-waste approach delivered through our licensed partnership with Pituku, an authorized waste management provider.",
            url: "service1.svg",
        },
        {
            title: "AI-Powered ESG Analyst",
            desc: "Our AI-powered ESG analysis turns complex data into actionable insights to help you manage risks, monitor performance, and drive better sustainability outcomes.",
            url: "service3.svg",
        },
        {
            title: "Sustainability Reporting",
            desc: "We create sustainability reports aligned with GRI, SASB, and local ESG standards. We ensure your reports are accurate, transparent, and meet both regulatory and stakeholder needs.",
            url: "service2.svg",
        },
        {
            title: "Decarbonization Project",
            desc: "We deliver measurable carbon reduction through integrated zero-waste sludge management, enabling organizations to achieve carbon credits while creating competitive advantage.",
            url: "service4.svg",
        },
    ];

    const values = [
        {
            id: 1,
            title: "Transparancy",
            description: "We transform sustainability performance through integrated dashboards and verifiable data systems that enable data-driven decisions, build stakeholder confidence, and deliver measurable impact",
            className: "border border-[#525252] bg-white text-[#525252]",
        },
        {
            id: 2,
            title: "Sustainability",
            description: "We enable zero-waste sludge operations through comprehensive B3 and non-B3 management that creates competitive advantage while ensuring regulatory compliance and sustainable growth",
            className: "bg-primary text-secondary border border-[#525252]",
        },
        {
            id: 3,
            title: "Collaboration",
            description: "Through our strategic partnership with licensed operator Pituku, we deliver compliant, risk-mitigated sludge management that creates measurable stakeholder value",
            className: "border border-[#525252] bg-white text-[#525252]",
        },
    ];
    return (
        <div className="flex min-h-screen w-full flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 w-full overflow-hidden">
                {/* Hero Section*/}
                <div className="bg-[url('/bg-about.svg')] text-secondary w-full bg-no-repeat bg-cover bg-center h-[300px] md:h-[690px] md:space-y-3 flex flex-col justify-center gap-3 p-8 md:p-20 ">
                    <h1 className="text-2xl md:text-6xl font-radley">One Platform for Waste Compliance, ESG Reporting, and Carbon Reduction</h1>
                    <p className="max-w-[1000px] text-[10px] md:text-base">
                        Sludgify offers an integrated solution that transforms industrial waste management into a strategic ESG and decarbonization asset. Our platform ensures regulatory compliance, delivers audit-ready sustainability
                        reports, and quantifies carbon impact, enabling companies to meet environmental goals with full transparency and measurable results
                    </p>
                    <div className="flex items-center md:gap-2 md:h-14">
                        <div className="flex flex-row -space-x-2">
                            <Image src="Ellipse 2.svg" alt="Ellipse 2" width={50} height={50} className="w-[38px] h-[38px] md:w-[50px] md:h-[50px]" />
                            <Image src="Ellipse 3.svg" alt="Ellipse 3" width={50} height={50} className="w-[38px] h-[38px] md:w-[50px] md:h-[50px]" />
                            <p className="bg-gradient-to-b from-primary to-[#525252] w-[38px] h-[38px] md:w-[50px] md:h-[50px] rounded-full flex items-center justify-center text-secondary font-radley">50+</p>
                        </div>
                        <Separator orientation="vertical" className="w-[15px] h-full bg-white mx-4" />
                        <Button className="font-radley md:p-6 p-3 text-sm md:text-lg cursor-pointer bg-gradient-to-b from-primary to-[#525252]">Join Us</Button>
                    </div>
                </div>
                {/* Content Section */}
                <div className="container flex flex-col-reverse md:flex-row justify-center gap-8 md:px-10 px-8 mx-auto py-5 md:py-10">
                    <Image src={"/image-about.svg"} width={448.35} height={472} alt="Sludgify illustration" className="hidden md:block" />
                    <Image src={"/p (4).svg"} width={334} height={162} alt="Sludgify illustration" className="md:hidden block" />
                    <div className="max-w-[700px] flex flex-col space-y-3 md:space-y-6 justify-center">
                        <h1 className="text-sm md:text-4xl font-radley">We transform your ESG strategy into quantifiable business value and competitive advantage</h1>
                        <p className="text-[10px] md:text-lg text-[#505050] font-calibri">
                            Sludgify accelerates enterprise sustainability transformation through integrated ESG solutions that deliver measurable impact. We enable organizations to achieve operational excellence across waste-to-value
                            conversion, carbon strategy, regulatory compliance, and AI-driven analytics, creating competitive advantage while meeting stakeholder expectations for transparent sustainability leadership.
                        </p>
                        <div className="grid grid-cols-4 md:grid-cols-2 md:items-center gap-8 md:my-6">
                            {content.map((item, index) => (
                                <div key={index}>
                                    <h1 className="text-sm md:text-3xl font-radley">{item.h1}</h1>
                                    <h2 className="text-[8px] md:text-lg font-radley text-[#000000]">{item.h2}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Core Value Section */}
                <div className="bg-[#FAFAFA] font-radley md:p-12 md:flex items-start justify-evenly md:gap-8">
                    {value.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1 md:gap-4 text-balance px-8 md:px-12 text-lg mb-8 md:w-[750px] w-[334px]">
                            <div className="flex items-center gap-2 md:gap-4">
                                <div className="w-1.5 h-1.5 md:w-3 md:h-3 bg-[#505050]" />
                                <h1 className="text-sm md:text-3xl">{item.title}</h1>
                            </div>
                            <p className="md:text-base text-[10px] text-[#525252] font-calibri">{item.desc}</p>
                        </div>
                    ))}
                </div>
                {/* Core Value Section */}
                <div className=" w-screen bg-white p-8 md:p-12 flex flex-col items-center justify-evenly gap-2 md:gap-8">
                    <h1 className="text-sm md:text-6xl font-radley text-primary">What Drives Us</h1>
                    <p className="text-[#525252] text-[10px] md:text-lg max-w-[1000px] text-center">
                        Sludgify is built on the belief that waste compliance, ESG reporting, and carbon reduction must be integrated. Our core value is enabling businesses to turn environmental obligations into measurable, strategic
                        climate impact, efficiently and at scale.
                    </p>
                    <div className="hidden md:flex gap-5">
                        {values.map((item) => (
                            <div key={item.id} className={`rounded-md drop-shadow-md w-full max-w-[428px] h-[365px] px-3 py-3 ${item.className}`}>
                                <h1 className="text-4xl font-radley">{item.title}</h1>
                                <p className="text-lg mt-5">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    {/* Mobile Values Carousel */}
                    <ValuesCarousel values={values} />
                </div>
                {/* Services Section */}
                <div className="container flex flex-col justify-center items-center mx-auto px-10 py-20">
                    <h1 className="text-[20px] md:text-6xl font-radley text-center mb-5 md:mb-12">Our Services</h1>
                    <div className="w-full">
                        <div className="columns-1 md:columns-2 gap-3 md:gap-8 max-w-[1248px] mx-auto">
                            {services.map((service, index) => (
                                <div key={index} className="mb-4 md:mb-8 break-inside-avoid bg-white md:p-6 w-[325px] md:w-[592px] inline-block">
                                    <Image src={service.url} alt={service.title} width={592} height={400} className="mb-1 md:mb-4 rounded-[8px] object-cover" />
                                    <h2 className="text-xl md:text-4xl font-radley mb-1 md:mb-4">{service.title}</h2>
                                    <p className="text-[10px] md:text-xl text-[#525252]">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <BannerFooter />
            <Footer />
        </div>
    );
}
