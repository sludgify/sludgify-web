import React from "react";
import { Button } from "./ui/button";

export const BannerFooter = () => {
    return (
        <div className="relative container rounded-2xl bg-[url('/banner.jpg')] bg-no-repeat bg-cover bg-center w-[335px] md:w-[1000px] h-[128px] md:h-[376px] mx-auto px-5 md:px-10 flex flex-col items-start justify-center gap-6 overflow-hidden -mb-20 z-10">
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0 rounded-2xl" />

            <div className="relative z-10 text-white text-left font-radley md:w-[522px]">
                <h1 className="text-xl md:text-5xl">Take Your First Step in ESG with Sludgify</h1>
                <Button className="md:mt-6 mt-3 bg-[#1B2F73] text-secondary font-radley text-sm md:text-2xl md:p-6 p-3 cursor-pointer">Let’s Work Together</Button>
            </div>
        </div>
    );
};
