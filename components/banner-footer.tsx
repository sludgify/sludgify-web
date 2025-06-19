import React from "react";
import { Button } from "./ui/button";

export const BannerFooter = () => {
    return (
        <div className="relative container rounded-2xl bg-[url('/banner.jpg')] bg-no-repeat bg-cover bg-center w-[1000px] h-[376px] mx-auto px-10 flex flex-col items-start justify-center gap-6 overflow-hidden -mb-20 z-10">
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0 rounded-2xl" />

            <div className="relative z-10 text-white text-left font-radley w-[522px]">
                <h1 className="text-5xl">Take Your First Step in ESG with Sludgify</h1>
                <Button className="mt-6 bg-[#1B2F73] text-secondary font-radley text-2xl p-6 cursor-pointer">Let’s Work Together</Button>
            </div>
        </div>
    );
};
