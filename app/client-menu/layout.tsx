import { ClientNavbar } from "@/components/client-navbar";
import React from "react";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex lg:flex-nowrap w-screen h-screen overflow-hidden">
            <ClientNavbar />
            <main className="overflow-y-auto overflow-x-hidden flex-1">{children}</main>
        </div>
    );
}
