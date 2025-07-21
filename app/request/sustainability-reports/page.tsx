import React from "react";
import { ClientNavbar } from "@/components/client-navbar";
import ReportForm from "@/components/report-form";

export default function Page() {
    return (
        <div className="flex gap-10 h-screen">
            <ClientNavbar />
            <div className="h-screen w-[599px] flex flex-col justify-center">
                <div className="border border-[#d9d9d9] rounded-lg p-5 shadow-md">
                    <h1 className="text-5xl font-radley">Request Your Reports Today</h1>
                    <p className="text-[#505050] text-lg">We help businesses create sustainability reports aligned with GRI, ESG, and SDG standards, clear, compliant, and impactful.</p>
                    <ReportForm />
                </div>
            </div>
        </div>
    );
}
