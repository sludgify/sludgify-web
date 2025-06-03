import React from "react";
import { Separator } from "./ui/separator";
import Image from "next/image";

export const Footer = () => {
    const menu = [
        {
            title: "Company",
            items: [
                { name: "About Us", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Media", href: "/media" },
            ],
        },
        {
            title: "Features",
            items: [
                { name: "Sludge Management", href: "/sludge-management" },
                { name: "Generate Reports", href: "/waste-management" },
                { name: "Carbon Consulting", href: "/waste-management" },
            ],
        },
        {
            title: "Help",
            items: [
                { name: "Contact Us", href: "/sludge-management" },
                { name: "FAQ", href: "/waste-management" },
                { name: "Customer Service", href: "/waste-management" },
            ],
        },
    ];
    return (
        <div className="h-[470px] bg-gradient-to-b from-[#2E2B2B] to-[#000000] p-14 space-y-3">
            <div className="flex justify-between gap-3 p-10 mt-10">
                <div className="flex  justify-between w-[802px] ">
                    {menu.map((section, index) => (
                        <div key={index} className="space-y-4">
                            <h1 className="text-2xl text-secondary font-radley">{section.title}</h1>
                            <ul className="space-y-2">
                                {section.items.map((item, idx) => (
                                    <li key={idx}>
                                        <a href={item.href} className="text-secondary font-radley text-lg ">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="font-radley text-secondary">
                    <h1 className="text-4xl">Sludgify</h1>
                    <h2 className="text-2xl">Subscribe to our social media</h2>
                    <div className="flex gap-4 mt-4">
                        <Image src="/instagram.svg" alt="Instagram" width={24} height={24} className="cursor-pointer" />
                        <Image src="/linkedin.svg" alt="Facebook" width={24} height={24} className="cursor-pointer" />
                    </div>
                </div>
            </div>
            <Separator />
            <h1 className="font-radley text-lg text-secondary">Copyright @ 2025 Sludgify, all rights reserved</h1>
        </div>
    );
};
