import React from "react";
import { ClientNavbar } from "@/components/client-navbar";
import PickupForm from "@/components/pickup-form";

export default function Page() {
    return (
        <div className="flex gap-10 h-screen">
            <ClientNavbar />
            <div className="h-screen w-[599px] flex flex-col justify-center">
                <div className="border border-[#d9d9d9] rounded-lg p-5 shadow-md">
                    <h1 className="text-4xl font-radley">Pick Up Your Sludge Today</h1>
                    <p className="text-[#505050]">We manage both B3 and non-B3 sludge responsibly using a zero-waste approach delivered through our licensed partnership with Pituku.</p>
                    <PickupForm />
                </div>
            </div>
        </div>
    );
}
