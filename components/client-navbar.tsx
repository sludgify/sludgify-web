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
    const compactMode = pathname.startsWith("/request") || (pathname.startsWith("/client-menu") && pathname !== "/client-menu");
    const [isHovered, setIsHovered] = useState(false);

    const shouldShowMenu = compactMode ? isHovered : open;

    useEffect(() => {
        const storedOpen = localStorage.getItem("open");
        if (storedOpen !== null) {
            setOpen(JSON.parse(storedOpen));
        } else {
            setOpen(!compactMode); // default open if not in compact mode
        }
    }, [compactMode]);

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
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/dashboard-white.svg" : "/dashboard.svg"} alt="dashboard" width={24} height={24} />,
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
            {!compactMode && (
                <>
                    <Menu strokeWidth={1} className="cursor-pointer text-white" onClick={toggleMenu} size={70} />
                    <Image src="/Ellipse 2.svg" alt="Ellipse 2" width={70} height={70} />
                </>
            )}

            {shouldShowMenu && <div className="fixed inset-0 backdrop-blur-[2px] z-10" onClick={() => !compactMode && toggleMenu()} />}

            <div
                className={clsx(
                    "fixed top-0 left-0 h-[620px] bg-white rounded-br-md shadow-lg transform transition-all duration-300 z-20",
                    compactMode ? (shouldShowMenu ? "w-[292px]" : "w-[101px]") : shouldShowMenu ? "translate-x-0 w-[292px]" : "-translate-x-full"
                )}
                onMouseEnter={() => compactMode && setIsHovered(true)}
                onMouseLeave={() => compactMode && setIsHovered(false)}
            >
                <nav className="flex flex-col h-full justify-between p-5">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-4xl font-radley">
                            <Image src="/logo.svg" width={50} height={50} alt="logo" />
                            {(!compactMode || shouldShowMenu) && (
                                <h1 className={clsx("overflow-hidden transition-all duration-300 whitespace-nowrap", !compactMode || shouldShowMenu ? "w-auto opacity-100 ml-2" : "w-0 opacity-0")}>Sludgify</h1>
                            )}
                        </div>
                        <Separator className="my-4 bg-[#D1D5DB] h-[1px]" />
                        <div className="flex flex-col gap-4">
                            {menu.map((item, index) => {
                                const isActive = pathname === item.link;
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const [isItemHovered, setIsItemHovered] = useState(false); // lokal per item

                                return (
                                    <Link
                                        href={item.link}
                                        key={index}
                                        onMouseEnter={() => setIsItemHovered(true)}
                                        onMouseLeave={() => setIsItemHovered(false)}
                                        className={clsx(isActive && "bg-black text-white rounded-lg", "flex items-center gap-5 text-2xl p-2 min-h-[64px] hover:bg-black hover:text-white hover:rounded-lg")}
                                    >
                                        <div className="flex-shrink-0">{typeof item.icon === "function" ? item.icon(isActive, isItemHovered) : item.icon}</div>
                                        <span className={clsx("overflow-hidden transition-all duration-300 whitespace-nowrap", !compactMode || shouldShowMenu ? "w-auto opacity-100 ml-2" : "w-0 opacity-0")}>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {menu2.map((item, index) => (
                            <Link
                                href={item.link}
                                key={index}
                                className={clsx(pathname === item.link && "bg-black text-white rounded-lg", "flex items-center gap-5 text-2xl p-2 min-h-[64px] hover:bg-black hover:text-white hover:rounded-lg")}
                            >
                                <div className="flex-shrink-0">{item.icon}</div>
                                <span className={clsx("overflow-hidden transition-all duration-300 whitespace-nowrap", !compactMode || shouldShowMenu ? "w-auto opacity-100 ml-2" : "w-0 opacity-0")}>{item.name}</span>
                            </Link>
                        ))}
                        <div className="flex gap-2 items-center mt-4 min-h-[64px]">
                            <Image src="/Ellipse 2.svg" alt="Ellipse 2" width={50} height={50} />
                            {(!compactMode || shouldShowMenu) && (
                                <div className={clsx("overflow-hidden transition-all duration-300 whitespace-nowrap", !compactMode || shouldShowMenu ? "w-auto opacity-100 ml-2" : "w-0 opacity-0")}>
                                    <h1 className="text-2xl">Kim Gimyung</h1>
                                    <p className="text-sm">ecosolution@gmail.com</p>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};
