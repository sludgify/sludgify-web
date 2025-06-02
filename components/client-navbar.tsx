"use client";

import React, { useState, useEffect } from "react";
import { Menu, House, Sparkles, ShoppingCart, Settings } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const ClientNavbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const storedOpen = localStorage.getItem("open");
        if (storedOpen !== null) {
            setOpen(JSON.parse(storedOpen));
        }
    }, []);

    const toggleMenu = () => {
        setOpen((prev) => {
            const newState = !prev;
            localStorage.setItem("open", JSON.stringify(newState));
            return newState;
        });
    };

    const menu = [
        {
            name: "Home",
            link: "/client-menu",
            icon: <House size={24} />,
        },
        {
            name: "Dashboard",
            link: "/client-menu/dashboard",
            icon: <Image src="/dashboard.svg" alt="dashboard" width={24} height={24} />,
        },
        {
            name: "AI Analyst",
            link: "/client-menu/ai-analyst",
            icon: <Sparkles size={24} />,
        },
    ];

    const menu2 = [
        {
            name: "Transactions",
            link: "/client-menu/Transactions",
            icon: <ShoppingCart size={24} />,
        },
        {
            name: "Settings",
            link: "/client-menu/settings",
            icon: <Settings size={24} />,
        },
    ];

    return (
        <div className="flex justify-between w-screen p-4 bg-transparent absolute z-10">
            <Menu strokeWidth={1} className="cursor-pointer text-white" onClick={toggleMenu} size={70} />
            <Image src="/Ellipse 2.svg" alt="Ellipse 2" width={70} height={70} />
            {/* Overlay background */}
            {open && <div className="fixed inset-0 backdrop-blur-[2px] z-10" onClick={toggleMenu} />}
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-[780px] w-[292px] bg-white rounded-br-md shadow-lg transform transition-transform duration-300 z-20 ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <nav className="flex flex-col h-full justify-between p-5">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-4xl font-radley">
                            <Image src="/logo.svg" width={50} height={50} alt="logo" />
                            <h1>Sludgify</h1>
                        </div>
                        <Separator className="my-4 bg-[#D1D5DB] h-[1px]" />
                        <div className="flex flex-col gap-4">
                            {menu.map((item, index) => (
                                <Link href={item.link} key={index} className={clsx(pathname === item.link && "bg-black text-white rounded-lg", "flex text-2xl p-2 items-center gap-5")}>
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {menu2.map((item, index) => (
                            <Link href={item.link} key={index} className={clsx(pathname === item.link && "bg-black text-white rounded-lg", "flex text-2xl p-2 items-center gap-5")}>
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex gap-2 items-center mt-4">
                            <Image src="/Ellipse 2.svg" alt="Ellipse 2" width={50} height={50} />
                            <div>
                                <h1 className="text-2xl">Kim Gimyung</h1>
                                <p className="text-sm">ecosolution@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};
