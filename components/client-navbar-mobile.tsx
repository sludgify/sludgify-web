"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

const MenuItem = ({ item, pathname, onClick }: any) => {
    const isActive = pathname === item.link;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={item.link}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx("flex items-center gap-5 text-lg p-2 min-h-[34px] rounded-lg transition", isActive ? "bg-black text-white" : "hover:bg-black text-[#525252] hover:text-white")}
        >
            <div className="flex-shrink-0">{item.icon(isActive, isHovered)}</div>
            <span className="ml-2 font-bold">{item.name}</span>
        </Link>
    );
};

export const ClientNavbarMobile = () => {
    const [, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [userMe, setUserMe] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const storedOpen = localStorage.getItem("open");
        if (storedOpen !== null) {
            setOpen(JSON.parse(storedOpen));
        }
    }, []);

    useEffect(() => {
        const userMeCookie = Cookies.get("me-data");
        const companyCookie = Cookies.get("company-data");
        const accessTokenCookie = Cookies.get("accessToken");

        if (userMeCookie && companyCookie) {
            console.log("userMeCookie", userMeCookie);
            try {
                const parsedMe = JSON.parse(userMeCookie) as User;
                setUserMe(parsedMe);
            } catch (e) {
                console.error("❌ Gagal parse me-data cookie:", e);
            }
        }

        if (accessTokenCookie) {
            console.log("accessTokenCookie", accessTokenCookie);
            setAccessToken(accessTokenCookie);
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
        console.log("accessToken", accessToken);
        try {
            const response = await axiosInstance.post("/sludgify/logout", null, {
                headers: {
                    Authorization: `bearer ${accessToken}`,
                },
            });
            if (response.status === 201) {
                Cookies.remove("accessToken");
                toast.success("Logout berhasil!");
                ["accessToken", "me-data", "company-data", "me-etag", "company-etag"].forEach((cookie) => Cookies.remove(cookie));
                setTimeout(() => {
                    router.push("/");
                }, 1000);
            }
        } catch (e) {
            console.error("❌ Gagal logout:", e);
        }
    };
    return (
        <aside className="relative md:hidden font-calibri">
            {/* Mobile Toggle */}
            <div className="md:hidden p-4">
                <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={clsx(
                    "md:hidden absolute top-[80px] right-0 z-50 w-[250px] h-[500px] bg-white px-6 py-4 shadow-md flex flex-col justify-between transform transition-all duration-300 ease-in-out",
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
                )}
            >
                <div>
                    <div className="flex items-center gap-2 text-2xl font-radley mb-4">
                        <Image src="/logo.svg" width={40} height={40} alt="logo" />
                        <h1>Sludgify</h1>
                    </div>
                    <Separator className="my-4 bg-[#D1D5DB] h-[1px]" />
                    <div className="flex flex-col gap-2">
                        {menu.map((item, idx) => (
                            <MenuItem key={idx} item={item} pathname={pathname} onClick={() => setIsOpen(false)} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-center mt-4">
                    <div className="flex items-center gap-2">
                        <Image src={userMe?.avatar || "/Ellipse 1.svg"} alt="avatar" width={45} height={45} className="rounded-full object-cover" />
                        <p className="font-bold capitalize text-[#525252]">
                            {userMe?.first_name} {userMe?.last_name}
                        </p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className=" gap-2 py-2 px-4 text-sm">
                        <LogOut size={18} /> Logout
                    </Button>
                </div>
            </div>
        </aside>
    );
};
