import { ClientNavbar } from "@/components/client-navbar";
import React from "react";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body>
            <ClientNavbar />
            {children}
        </body>
    );
}
