import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

    const coreValue = [
        {
            number: "01",
            title: "Transparency",
            desc: " At Sludgify, we believe that honest, clear communication isn’t just a value, it’s a responsibility. From the way data is collected and reported, to how sustainability goals are shared with stakeholders, we help businesses build credibility through openness. By making every step visible and verifiable, we empower our clients to act with integrity, earn trust, and drive meaningful impact throughout their sustainability journey.",
        },
        {
            number: "02",
            title: "Sustainability",
            desc: " At Sludgify, sustainability means managing both hazardous (B3) and non-hazardous sludge with zero-waste, environmentally friendly methods. We focus on minimizing environmental impact while helping your business achieve long-term, responsible growth through practical and compliant solutions.",
        },
        {
            number: "03",
            title: "Collaboration",
            desc: " Sludgify collaborates with Pituku, a fully licensed waste management partner, to guarantee safe and compliant handling of sludge waste. This trusted partnership allows us to provide reliable, environmentally responsible services that meet regulatory standards.",
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
            title: "Carbon Consulting",
            desc: "We provide expert carbon consulting to help you measure, manage, and reduce your greenhouse gas emissions. We help you achieve net zero through actionable strategies and insights backed by data.",
            url: "service4.svg",
        },
    ];
    return (
        <div className="flex min-h-screen w-screen flex-col">
            <Navbar />
            <main className="flex-1 w-full">
                {/* Hero Section*/}
                <div className="container space-y-3 mx-auto flex flex-col items-center justify-center gap-3 py-20 max-w-[1054px] ">
                    <h1 className="text-6xl font-radley text-center">Boost Your ESG Performance with Zero-Waste Sludge Management</h1>
                    <p className="text-center max-w-[815px]">
                        Unlock environmental value by transforming industrial sludge into sustainable outcomes. Our zero-waste approach helps your business stay compliant, responsible, and future-ready.
                    </p>
                    <div className="flex items-center justify-center gap-2 h-14">
                        <div className="flex flex-row -space-x-2">
                            <Image src="Ellipse 2.svg" alt="Ellipse 2" width={50} height={50} />
                            <Image src="Ellipse 3.svg" alt="Ellipse 3" width={50} height={50} />
                            <p className="bg-primary h-14 w-14 rounded-full flex items-center justify-center text-secondary font-radley">50+</p>
                        </div>
                        <Separator orientation="vertical" className="w-[4px] h-full bg-black mx-4" />
                        <Button className="font-radley p-6 text-lg cursor-pointer">Join Us</Button>
                    </div>
                </div>
                {/* Background Image */}
                <div className="w-screen bg-[url('/Group.svg')] bg-no-repeat bg-cover bg-center h-[657.2px]"></div>
                {/* Content Section */}
                <div className="container flex gap-8 px-10 mx-auto py-10">
                    <Image src={"/Sludgify.svg"} width={448.35} height={472} alt="Sludgify illustration" />
                    <div className="max-w-[700px] flex flex-col space-y-6 justify-center">
                        <h1 className="text-4xl font-radley">Together, we’ll turn your ESG ambitions into measurable impacts</h1>
                        <p className="text-lg text-[#505050]">
                            Sludgify helps businesses take meaningful steps toward sustainability by offering zero-waste sludge management, carbon consulting, sustainability reporting, and AI-powered ESG analysis. Our integrated solutions
                            are designed to simplify compliance, elevate transparency, and help you deliver real, measurable ESG outcomes, efficiently and responsibly.
                        </p>
                        <div className="grid grid-cols-2 items-center gap-8 my-6">
                            {content.map((item, index) => (
                                <div key={index}>
                                    <h1 className="text-3xl font-radley">{item.h1}</h1>
                                    <h2 className="text-lg font-radley text-[#000000]">{item.h2}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Core Value Section */}
                <div className="bg-[#FAFAFA] font-radley w-screen p-12 flex flex-col items-center justify-center gap-8">
                    <h1 className="text-6xl">Our Core Value</h1>
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                        {coreValue.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger>
                                    <div className="text-3xl flex gap-4">
                                        <h1>{item.number}</h1>
                                        <h1>{item.title}</h1>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance px-12 text-lg">
                                    <p>{item.desc}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
                {/* Services Section */}
                <div className="container mx-auto px-10 py-20">
                    <h1 className="text-6xl font-radley text-center mb-12">Our Services</h1>
                    <div className="columns-1 md:columns-2 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="mb-8 break-inside-avoid bg-white p-6 w-[592px] inline-block">
                                <Image src={service.url} alt={service.title} width={592} height={400} className="mb-4 object-cover" />
                                <h2 className="text-4xl font-radley font-bold mb-4">{service.title}</h2>
                                <Separator className="my-2" />
                                <p className="text-xl text-[#505050]">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Banner Section */}
                <div className="relative container rounded-2xl bg-[url('/banner.jpg')] bg-no-repeat bg-cover bg-center h-[376px] mx-auto px-10 flex flex-col items-start justify-center gap-6 overflow-hidden -mb-20 z-10">
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0 rounded-2xl" />

                    <div className="relative z-10 text-white text-left font-radley w-[522px]">
                        <h1 className="text-5xl">Take Your First Step in ESG with Sludgify</h1>
                        <Button className="mt-6 bg-[#1B2F73] text-secondary font-radley text-2xl p-6 cursor-pointer">Let’s Work Together</Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
