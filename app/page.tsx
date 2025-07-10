import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BannerFooter } from "@/components/banner-footer";

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
    return (
        <div className="flex min-h-screen w-screen flex-col">
            <Navbar />
            <main className="flex-1 w-full">
                {/* Hero Section*/}
                <div className="bg-[url('/bg-about.svg')] text-secondary w-full bg-no-repeat bg-cover bg-center h-[690px] space-y-3 flex flex-col justify-center gap-3 p-20 ">
                    <h1 className="text-6xl font-radley">One Platform for Waste Compliance, ESG Reporting, and Carbon Reduction</h1>
                    <p className="max-w-[1000px]">
                        Sludgify offers an integrated solution that transforms industrial waste management into a strategic ESG and decarbonization asset. Our platform ensures regulatory compliance, delivers audit-ready sustainability
                        reports, and quantifies carbon impact, enabling companies to meet environmental goals with full transparency and measurable results
                    </p>
                    <div className="flex items-center gap-2 h-14">
                        <div className="flex flex-row -space-x-2">
                            <Image src="Ellipse 2.svg" alt="Ellipse 2" width={50} height={50} />
                            <Image src="Ellipse 3.svg" alt="Ellipse 3" width={50} height={50} />
                            <p className="bg-gradient-to-b from-primary to-[#525252] h-14 w-14 rounded-full flex items-center justify-center text-secondary font-radley">50+</p>
                        </div>
                        <Separator orientation="vertical" className="w-[10px] h-full bg-white mx-4" />
                        <Button className="font-radley p-6 text-lg cursor-pointer bg-gradient-to-b from-primary to-[#525252]">Join Us</Button>
                    </div>
                </div>
                {/* Content Section */}
                <div className="container flex gap-8 px-10 mx-auto py-10">
                    <Image src={"/image-about.svg"} width={448.35} height={472} alt="Sludgify illustration" />
                    <div className="max-w-[700px] flex flex-col space-y-6 justify-center">
                        <h1 className="text-4xl font-radley">We transform your ESG strategy into quantifiable business value and competitive advantage</h1>
                        <p className="text-lg text-[#505050]">
                            Sludgify accelerates enterprise sustainability transformation through integrated ESG solutions that deliver measurable impact. We enable organizations to achieve operational excellence across waste-to-value
                            conversion, carbon strategy, regulatory compliance, and AI-driven analytics, creating competitive advantage while meeting stakeholder expectations for transparent sustainability leadership.
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
                <div className="bg-[#FAFAFA] font-radley w-screen p-12 flex items-start justify-evenly gap-8">
                    {value.map((item, index) => (
                        <div key={index} className="flex flex-col gap-4 text-balance px-12 text-lg mb-8 w-[750px]">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-[#505050]" />
                                <h1 className="text-3xl">{item.title}</h1>
                            </div>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
                {/* Core Value Section */}
                <div className=" w-screen bg-white p-12 flex flex-col items-center justify-evenly gap-8">
                    <h1 className="text-6xl font-radley text-primary">What Drives Us</h1>
                    <p className="text-[#525252] text-lg max-w-[1000px] text-center">
                        KelolaCarbon is built on the belief that waste compliance, ESG reporting, and carbon reduction must be integrated. Our core value is enabling businesses to turn environmental obligations into measurable, strategic
                        climate impact, efficiently and at scale
                    </p>
                    <div className="flex gap-5">
                        <div className="border border-[#525252] rounded-md w-[428px] p-6 space-y-5 h-[365px] drop-shadow-md">
                            <h1 className="text-4xl font-radley">Transparancy</h1>
                            <p className="text-lg text-[#525252]">
                                We transform sustainability performance through integrated dashboards and verifiable data systems that enable data-driven decisions, build stakeholder confidence, and deliver measurable impact
                            </p>
                        </div>
                        <div className="bg-primary text-secondary border border-[#525252] rounded-md w-[428px] p-6 space-y-5 h-[365px] drop-shadow-md">
                            <h1 className="text-4xl font-radley">Sustainability</h1>
                            <p className="text-lg">We enable zero-waste sludge operations through comprehensive B3 and non-B3 management that creates competitive advantage while ensuring regulatory compliance and sustainable growth</p>
                        </div>
                        <div className="border border-[#525252] rounded-md w-[428px] p-6 space-y-5 h-[365px] drop-shadow-md">
                            <h1 className="text-4xl font-radley">Collaboration</h1>
                            <p className="text-lg text-[#525252]">Through our strategic partnership with licensed operator Pituku, we deliver compliant, risk-mitigated sludge management that creates measurable stakeholder value</p>
                        </div>
                    </div>
                </div>
                {/* Services Section */}
                <div className="container mx-auto px-10 py-20">
                    <h1 className="text-6xl font-radley text-center mb-12">Our Services</h1>
                    <div className="columns-1 md:columns-2 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="mb-8 break-inside-avoid bg-white p-6 w-[592px] inline-block">
                                <Image src={service.url} alt={service.title} width={592} height={400} className="mb-4 object-cover" />
                                <h2 className="text-4xl font-radley  mb-4">{service.title}</h2>
                                <p className="text-xl text-[#505050]">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <BannerFooter />
            </main>
            <Footer />
        </div>
    );
}
