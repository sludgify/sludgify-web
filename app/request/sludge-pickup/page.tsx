import React from "react";
import { ClientNavbar } from "@/components/client-navbar";
import Image from "next/image";
import PickupForm from "@/components/pickup-form";

export default function Page() {
    return (
        <div className="flex gap-10 h-screen">
            <ClientNavbar />
            <div className="flex py-8 gap-10">
                <div className="w-[35%] space-y-3">
                    <h1 className="text-4xl font-radley">Pick Up Your Sludge Today</h1>
                    <p className="text-[#505050]">We manage both B3 and non-B3 sludge responsibly using a zero-waste approach delivered through our licensed partnership with Pituku.</p>
                    <PickupForm />
                </div>
                <div>
                    <Image src={"/pickup.svg"} alt={"pickup"} width={511} height={544} className="w-full h-full" />
                </div>
            </div>
        </div>
    );
}
