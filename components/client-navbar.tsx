"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { User } from "@/interfaces/user";
import { LogOut, Router } from "lucide-react";
import { Button } from "./ui/button";
import { axiosInstance } from "@/lib/axios";
import { tr } from "date-fns/locale";
import { toast } from "sonner";

interface Company {
    id: string;
    country: string;
    email: string;
    phone_number: string;
    position: string;
}

interface MeData {
    user: User;
    company: Company;
}

export const ClientNavbar = () => {
    const [, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [userMe, setUserMe] = useState<MeData | null>(null);

    useEffect(() => {
        const storedOpen = localStorage.getItem("open");
        if (storedOpen !== null) {
            setOpen(JSON.parse(storedOpen));
        }
    }, []);

    useEffect(() => {
        const userMeCookie = Cookies.get("me-data");
        console.log(userMeCookie);
        if (userMeCookie) {
            try {
                const parsed = JSON.parse(userMeCookie) as MeData;
                setUserMe(parsed);
            } catch (e) {
                console.error("❌ Gagal parse me-data cookie:", e);
            }
        }
    }, []);

    const menu = [
        {
            name: "Home",
            link: "/client-menu",
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/home_white.svg" : "/home.svg"} alt="home" width={18} height={18} />,
        },
        {
            name: "Dashboard",
            link: "/client-menu/dashboard",
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/dashboard-white.svg" : "/dashboard.svg"} alt="dashboard" width={18} height={18} />,
        },
        {
            name: "AI Analyst",
            link: "/client-menu/chat",
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/AI_white.svg" : "/AI.svg"} alt="AI Analyst" width={18} height={18} />,
        },
        {
            name: "Transactions",
            link: "/client-menu/transactions",
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/cart_white.svg" : "/cart.svg"} alt="transactions" width={18} height={18} />,
        },
        {
            name: "Settings",
            link: "/client-menu/settings",
            icon: (isActive: boolean, isHovered: boolean) => <Image src={isActive || isHovered ? "/settings_white.svg" : "/settings.svg"} alt="settings" width={18} height={18} />,
        },
    ];

    const handleLogout = async () => {
        const token = localStorage.getItem("accessToken");
        console.log("token: ", token);
        try {
            await axiosInstance.post("/sludgify/logout", null, {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            toast.success("Logout berhasil!");
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (e) {
            console.error("❌ Gagal logout:", e);
        }
    };
    return (
        <div className="h-screen p-4 font-calibri w-[262px] bg-white rounded-br-md border border-[#D9D9D9]">
            <nav className="flex flex-col h-full justify-between gap-5">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-2xl font-radley">
                        <Image src="/logo.svg" width={40} height={40} alt="logo" />
                        <h1>Sludgify</h1>
                    </div>
                    <Separator className="my-4 bg-[#D1D5DB] h-[1px]" />
                    <div className="flex flex-col gap-2">
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
                                    className={clsx("flex items-center gap-5 text-lg p-2 min-h-[34px] rounded-lg transition", isActive ? "bg-black text-white" : "hover:bg-black text-[#525252] hover:text-white")}
                                >
                                    <div className={clsx("flex-shrink-0", isActive || isHovered ? "text-white" : "text-[#525252]")}>{typeof item.icon === "function" && item.icon(isActive, isHovered)}</div>
                                    <span className="ml-2 font-bold font-calibri">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center min-h-[64px]">
                        <Image src={userMe?.user.avatar || "/Ellipse 1.svg"} alt="Ellipse 2" width={45} height={45} className="rounded-full w-[45px] h-[45px] object-cover object-top" />
                        <div className="ml-2">
                            <h1 className="text-lg text-[#525252] font-bold capitalize">
                                {userMe?.user.first_name} {userMe?.user.last_name}
                            </h1>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full justify-start gap-2 py-3 text-base hover:cursor-pointer" onClick={handleLogout}>
                        <LogOut className="h-5 w-5" />
                        Log out
                    </Button>
                </div>
            </nav>
        </div>
    );
};
