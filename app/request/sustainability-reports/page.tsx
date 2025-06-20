import React from "react";
import { ClientNavbar } from "@/components/client-navbar";
import Image from "next/image";
import ReportForm from "@/components/report-form";

export default function Page() {
    return (
        <div className="flex justify-evenly py-10 w-screen">
            <ClientNavbar />
            <div className="w-[35%] space-y-5">
                <h1 className="text-5xl font-radley">Request Your Reports Today</h1>
                <p className="text-[#505050] text-lg">We help businesses create sustainability reports aligned with GRI, ESG, and SDG standards, clear, compliant, and impactful.</p>
                <ReportForm />
            </div>
            <div>
                <Image src={"/reports.svg"} alt={"reports"} width={511} height={744} />
            </div>
        </div>
    );
}
