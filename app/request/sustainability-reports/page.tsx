import React from "react";
import { ClientNavbar } from "@/components/client-navbar";
import ReportForm from "@/components/report-form";
import { ClientNavbarMobile } from "@/components/client-navbar-mobile";

export default function Page() {
    return (
        <div className="flex gap-10 h-screen">
            <ClientNavbar />
            <div className="h-screen lg:w-[599px] lg:p-0 flex flex-col gap-7 md:gap-0 lg:justify-center">
                <div className="flex lg:hidden items-start w-full justify-between">
                    <div className="px-6">
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold font-calibri">Request Your Reports Today</h1>
                        <p className="md:textbase text-xs text-[#505050]">We help businesses create sustainability reports aligned with GRI, ESG, and SDG standards, clear, compliant, and impactful.</p>
                    </div>
                    <ClientNavbarMobile />
                </div>
                <div className="px-6">
                    <div className="border-t border-[#d9d9d9]">
                        <div className="border mt-3 border-[#d9d9d9] rounded-lg p-5 shadow-md">
                            <div className="hidden lg:block">
                                <h1 className="text-4xl font-calibri font-bold">Request Your Reports Today</h1>
                                <p className="text-[#505050] text-lg">We help businesses create sustainability reports aligned with GRI, ESG, and SDG standards, clear, compliant, and impactful.</p>
                            </div>
                            <ReportForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
