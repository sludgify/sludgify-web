import React from "react";
import { ClientNavbar } from "@/components/client-navbar";
import Image from "next/image";
import PickupForm from "@/components/pickup-form";

export default function Page() {
    return (
        <div className="flex justify-evenly py-8 w-screen">
            <ClientNavbar />
            <div className="w-[35%] space-y-3">
                <h1 className="text-5xl font-radley">Pick Up Your Sludge Today</h1>
                <p className="text-[#505050] text-lg">We manage both B3 and non-B3 sludge responsibly using a zero-waste approach delivered through our licensed partnership with Pituku.</p>
                <PickupForm />
            </div>
            <div>
                <Image src={"/pickup.svg"} alt={"pickup"} width={511} height={544} />
            </div>
        </div>
    );
}
