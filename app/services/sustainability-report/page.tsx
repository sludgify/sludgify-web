"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BannerFooter } from "@/components/banner-footer";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Page() {
    const services = [
        {
            title: "Strategic Advisory",
            desc: "We provide expert guidance to help companies integrate sustainability into core strategy, identifying ESG priorities, setting measurable goals, and aligning reporting with business objectives and stakeholder expectations.",
            url: "/content-report1.svg",
        },
        {
            title: "GHG Accounting",
            desc: "Track and manage your company’s carbon footprint with precision, ensuring regulatory compliance, setting actionable reduction targets, and unlocking insights to inform strategy and demonstrate climate leadership.",
            url: "/content-report2.svg",
        },
        {
            title: "Concrete ESG Efforts",
            desc: "Demonstrate credible progress toward a net-zero future by aligning your sustainability commitments with measurable actions and outcomes, reinforcing your institution’s position as a leader in climate responsibility.",
            url: "/content-report3.svg",
        },
    ];

    const clients = [
        {
            id: 1,
            position: "Business Sustainability Manager",
            company: "PT. Sri Rejeki Isman",
            image: "/client1.svg",
            banner: "/client-banner-1.svg",
            testimonial: "We appreciated how the report translated complex ESG metrics into actionable insights. It’s not just documentation, it became part of how we communicate sustainable progress to our global stakeholders.",
        },
        {
            id: 2,
            position: "Corporate Affairs Manager",
            company: "PT. Avian Brands",
            image: "/client2.svg",
            banner: "/client-banner-2.svg",
            testimonial:
                "The sustainability report developed by this team not only helped us comply with regulations but also gave us strategic clarity in managing our environmental impact. Their advisory approach was practical and tailored to our industry needs",
        },
        {
            id: 3,
            position: "Business Sustainability Manager",
            company: "PT. Sri Rejeki Isman",
            image: "/client1.svg",
            banner: "/client-banner-1.svg",
            testimonial: "We appreciated how the report translated complex ESG metrics into actionable insights. It’s not just documentation, it became part of how we communicate sustainable progress to our global stakeholders.",
        },
        {
            id: 4,
            position: "Corporate Affairs Manager",
            company: "PT. Avian Brands",
            image: "/client2.svg",
            banner: "/client-banner-2.svg",
            testimonial:
                "The sustainability report developed by this team not only helped us comply with regulations but also gave us strategic clarity in managing our environmental impact. Their advisory approach was practical and tailored to our industry needs",
        },
    ];

    return (
        <div className="flex min-h-screen w-screen flex-col">
            <Navbar />
            <main className="flex-1 w-full">
                {/* Hero Section*/}
                <div className="bg-[url('/bg-sustainability-report.svg')] text-secondary w-full bg-no-repeat bg-cover bg-center h-[690px] space-y-3 flex flex-col justify-center gap-3 p-20 ">
                    <h1 className="text-6xl font-radley">Embedding Sustainability into Core Business Strategy</h1>
                    <p className="max-w-[815px]">
                        We deliver data-driven sustainability reports and strategic advisory services that align ESG priorities with core business objectives. Building trust, meeting global standards, and driving long-term value
                    </p>
                    <Button className="font-radley p-6 w-fit text-lg cursor-pointer bg-gradient-to-b from-primary to-[#525252]">Let’s Collaborate</Button>
                </div>
                {/* Content Section */}
                <div className="bg-[#FAFAFA] flex gap-8 px-10 items-center justify-center py-10">
                    <div className="max-w-[700px] flex flex-col space-y-6 justify-center">
                        <h1 className="text-4xl font-radley">Reporting for Sustainable Impact</h1>
                        <p className="text-lg text-[#505050]">
                            A sustainability report explains how a company generates long-term value by addressing key environmental, social, and governance (ESG) issues. It goes beyond fulfilling regulatory requirements by providing a
                            transparent view of the company&apos;s impact and commitments.
                        </p>
                        <p className="text-lg text-[#505050]">
                            For leading businesses, sustainability reporting is a strategic tool, used to build stakeholder trust, guide investment decisions, and integrate ESG into core operations. It signals accountability, business
                            resilience, and readiness for a sustainable future.
                        </p>
                    </div>
                    <Image src={"/report.svg"} width={558} height={359} alt="Sludgify illustration" />
                </div>
                {/* Core Value Section */}
                <div className="font-radley w-screen p-12 flex flex-col items-center justify-evenlygap-8">
                    <h1 className="text-6xl font-radley text-primary text-center w-[810px]">Unlock Value Through Sustainability Reporting</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="mb-8 break-inside-avoid bg-white p-6 w-[592px] inline-block">
                                <Image src={service.url} alt={service.title} width={592} height={400} className="mb-4 object-cover" />
                                <h2 className="text-4xl font-radley  mb-4">{service.title}</h2>
                                <p className="text-xl text-[#505050]">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Client Section */}
                <div className="w-full bg-white px-4 py-12 flex flex-col items-center gap-8 overflow-x-visible relative">
                    <h1 className="text-6xl font-radley text-primary text-center">What Our Client Say</h1>
                    <p className="text-[#525252] text-lg max-w-[1000px] text-center">
                        Hear directly from our clients on how our ESG advisory and reporting services have supported their journey toward compliance, transparency, and sustainable growth.
                    </p>
                    <div className="w-[120vw]">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 2000,
                                }),
                            ]}
                            className="w-full"
                        >
                            <CarouselContent>
                                {clients.map((client) => (
                                    <CarouselItem key={client.id} className="basis-1/3">
                                        <div className="bg-white drop-shadow-lg border border-[#D9D9D9] rounded-lg w-[590px] h-[692px] p-5 flex flex-col gap-4">
                                            <Image src={client.banner} alt={`${client.company} banner`} width={600} height={200} className="object-cover rounded" />
                                            <p className="text-lg text-[#505050]">&rdquo;{client.testimonial}&rdquo;</p>
                                            <div className="flex items-center mt-auto gap-4">
                                                <Image src={client.image} alt={client.company} width={75} height={75} className="rounded-full" />
                                                <div className="text-lg font-radley">
                                                    <h3>{client.position}</h3>
                                                    <p>{client.company}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>

                {/* Approach Section */}
                <div className="container mx-auto px-10 py-20">
                    <h1 className="text-6xl font-radley text-center mb-12">Our approach to classify greenhouse gas emissions across institutions</h1>
                    <Image src={"/approach.svg"} alt="Approach illustration" width={1200} height={801} className="w-full h-auto object-cover" />
                </div>
                <BannerFooter />
            </main>
            <Footer />
        </div>
    );
}
