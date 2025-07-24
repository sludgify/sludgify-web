import React from "react";
import { ClientNavbar } from "@/components/client-navbar";
import PickupForm from "@/components/pickup-form";
import { ClientNavbarMobile } from "@/components/client-navbar-mobile";

export default function Page() {
    return (
        <div className="flex gap-10 h-screen">
            <ClientNavbar />
            <div className="h-screen lg:w-[599px] p-6 lg:p-0 flex flex-col gap-7 md:gap-0 lg:justify-center">
                <div className="flex lg:hidden border-b border-[#d9d9d9] pb-5 items-start w-full justify-between">
                    <div className="">
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold font-calibri">Pick Up Your Sludge Today</h1>
                        <p className="md:textbase text-xs text-[#505050]">We manage both B3 and non-B3 sludge responsibly using a zero-waste approach delivered through our licensed partnership with Pituku.</p>
                    </div>
                    <ClientNavbarMobile />
                </div>

                <div className="border border-[#d9d9d9] rounded-lg p-5 shadow-md">
                    <div className="hidden lg:block">
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold font-calibri">Pick Up Your Sludge Today</h1>
                        <p className="text-[#505050]">We manage both B3 and non-B3 sludge responsibly using a zero-waste approach delivered through our licensed partnership with Pituku.</p>
                    </div>
                    <PickupForm />
                </div>
            </div>
        </div>
    );
}
