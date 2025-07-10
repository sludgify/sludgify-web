"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type User = {
    first_name: string;
    last_name: string;
    avatar: string;
    // Add other properties if needed
};

export const ClientNavbar = () => {
    const [, setOpen] = useState(false);
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedOpen = localStorage.getItem("open");
        if (storedOpen !== null) {
            setOpen(JSON.parse(storedOpen));
        }

        const storedUser = localStorage.getItem("user");
        if (storedUser !== null) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const menu = [
        {
            name: "Home",
            link: "/client-menu",
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/home_white.svg" : "/home.svg"} alt="home" width={22} height={22} />,
        },
        {
            name: "Dashboard",
            link: "/client-menu/dashboard",
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/dashboard-white.svg" : "/dashboard.svg"} alt="dashboard" width={22} height={22} />,
        },
        {
            name: "AI Analyst",
            link: "/client-menu/chat",
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/AI_white.svg" : "/AI.svg"} alt="AI Analyst" width={22} height={22} />,
        },
    ];

    const menu2 = [
        {
            name: "Transactions",
            link: "/client-menu/transactions",
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/cart_white.svg" : "/cart.svg"} alt="transactions" width={22} height={22} />,
        },
        {
            name: "Settings",
            link: "/client-menu/settings",
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/settings_white.svg" : "/settings.svg"} alt="settings" width={22} height={22} />,
        },
    ];

    return (
        <div className="h-screen p-4 w-[262px] bg-white rounded-br-md border border-[#D9D9D9]">
            <nav className="flex flex-col h-full justify-between gap-5">
                <div className="flex flex-col gap-2 space-y-1">
                    <div className="flex items-center gap-2 text-2xl font-radley">
                        <Image src="/logo.svg" width={50} height={50} alt="logo" />
                        <h1>Sludgify</h1>
                    </div>
                    <Separator className="my-4 bg-[#D1D5DB] h-[1px]" />
                    <div className="flex flex-col space-y-3">
                        {menu.map((item, index) => {
                            const isActive = pathname === item.link;
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const [isHovered, setIsHovered] = React.useState(false); // Per item hover (untuk icon fungsi)

                            return (
                                <Link
                                    href={item.link}
                                    key={index}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className={clsx("flex items-center gap-5 text-xl p-2 min-h-[54px] rounded-lg transition", isActive ? "bg-black text-white" : "hover:bg-black text-[#525252] hover:text-white")}
                                >
                                    <div className={clsx("flex-shrink-0", isActive || isHovered ? "text-white" : "text-[#525252]")}>{typeof item.icon === "function" && item.icon(isActive, isHovered)}</div>
                                    <span className="ml-2 font-bold font-calibri">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col">
                    {menu2.map((item, index) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const [isHovered, setIsHovered] = React.useState(false);
                        const isActive = pathname === item.link;
                        return (
                            <Link
                                href={item.link}
                                key={index}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className={clsx("flex items-center gap-5 text-xl p-2 min-h-[64px] rounded-lg transition", isActive ? "bg-black text-white" : "hover:bg-black text-[#525252]  hover:text-white")}
                            >
                                <div className={clsx("flex-shrink-0", isActive || isHovered ? "text-white" : "text-[#525252]")}>{typeof item.icon === "function" && item.icon(isActive, isHovered)}</div>
                                <span className="ml-2 font-bold font-calibri">{item.name}</span>
                            </Link>
                        );
                    })}
                    <div className="flex gap-2 items-center min-h-[64px]">
                        <Image src="/Ellipse 1.svg" alt="Ellipse 2" width={45} height={45} />
                        <div className="ml-2">
                            <h1 className="text-xl text-[#525252] font-bold capitalize">
                                {user?.first_name} {user?.last_name}
                            </h1>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
