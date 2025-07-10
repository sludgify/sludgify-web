import { ClientNavbar } from "@/components/client-navbar";
import React from "react";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-nowrap w-screen h-screen overflow-hidden">
            <ClientNavbar />
            <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
        </div>
    );
}
