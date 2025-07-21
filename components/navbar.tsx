"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react"; // ikon hamburger dan close

export const Navbar = () => {
    const pathname = usePathname();
    const parentPath = pathname.split("/")[1];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="p-6 font-radley h-[100px] flex items-center justify-between relative">
            {/* Logo */}
            <div className="flex items-center gap-2 text-2xl md:text-4xl">
                <Image src={"/logo.svg"} width={30} height={30} alt="logo" className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
                <h1>Sludgify</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 text-2xl">
                <Link href="/" className={clsx(pathname === "/" && "border-b-2 border-primary", "py-1")}>
                    About
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger className={clsx(parentPath === "services" && "border-b-2 border-primary", "py-1 outline-none")}>Services</DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <DropdownMenuItem>
                            <Link href="/services/sludge-management">Sludge Management Service</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/services/sustainability-report">Sustainability Report Service</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/media" className={clsx(pathname === "/media" && "border-b-2 border-primary", "py-1")}>
                    Media
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" className="text-xl p-5 rounded-lg">
                    <Link href="/login">Sign In</Link>
                </Button>
                <Button variant="outline" className="bg-primary text-xl p-5 rounded-lg text-secondary">
                    <Link href="/register">Sign Up</Link>
                </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
            </div>

            {/* Mobile Menu Panel */}
            <div
                className={clsx(
                    "absolute top-[100px] right-0 w-[70%] bg-white shadow-md z-50 px-6 pb-4 flex flex-col gap-4 text-lg transform transition-all duration-300 ease-in-out",
                    isOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-4 opacity-0 pointer-events-none"
                )}
            >
                <Link href="/" onClick={() => setIsOpen(false)} className={clsx(pathname === "/" && "border-b-2 w-fit border-primary", "py-1")}>
                    About
                </Link>
                <div className="flex flex-col">
                    <span className={clsx(parentPath === "services" && "border-b-2 w-fit  border-primary", "py-1 outline-none")}>Services</span>
                    <Link href="/services/sludge-management" onClick={() => setIsOpen(false)} className="text-base pl-4 py-1">
                        Sludge Management Service
                    </Link>
                    <Link href="/services/sustainability-report" onClick={() => setIsOpen(false)} className="text-base pl-4 py-1">
                        Sustainability Report Service
                    </Link>
                </div>
                <Link href="/media" onClick={() => setIsOpen(false)} className={clsx(pathname === "/media" && "border-b-2 w-fit border-primary", "py-1")}>
                    Media
                </Link>
                <div className="flex flex-col gap-2 pt-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        <Link href="/login">Sign In</Link>
                    </Button>
                    <Button variant="outline" className="bg-primary text-secondary" onClick={() => setIsOpen(false)}>
                        <Link href="/register">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
};
