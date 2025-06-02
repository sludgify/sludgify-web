"use client";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between p-6 font-radley">
            <div className="flex items-center gap-2  text-4xl ">
                <Image src={"/logo.svg"} width={50} height={50} alt="logo"></Image>
                <h1>Sludgify</h1>
            </div>
            <div className="flex items-center gap-6 text-2xl">
                <h1 className={clsx(pathname === "/" && "border-b-1 border-primary", "py-1 cursor-pointer")}>
                    <Link href={"/"}>About</Link>
                </h1>
                <h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer outline-none">Service</DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>Sludge Management</DropdownMenuItem>
                            <DropdownMenuItem>Sustainablitiy Reporting</DropdownMenuItem>
                            <DropdownMenuItem>Carbon Consulting</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </h1>
                <h1 className={clsx(pathname === "/media" && "border-b-1 border-primary", "py-1 cursor-pointer")}>
                    <Link href={"/media"}>Media</Link>
                </h1>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="text-xl p-5 rounded-lg ">
                    <Link href={"/login"}>Sign In</Link>
                </Button>
                <Button variant="outline" className="bg-primary text-xl p-5 rounded-lg text-secondary">
                    <Link href={"/register"}>Sign Up</Link>
                </Button>
            </div>
        </nav>
    );
};
