"use client";
import { useState } from "react";
import { Clock } from "lucide-react";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // ini dari shadcn-ui

const TimePickerCustom = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [time, setTime] = useState("10:30");
    const [period, setPeriod] = useState("AM");

    const handleSelect = (val: string) => {
        setTime(val);
        setShowPicker(false);
    };

    return (
        <div className="relative w-full">
            <div className="flex items-center border border-[#D9D9D9] rounded-md px-3 relative">
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="HH:MM" className="w-full focus:outline-none" />
                <Select value={period} onValueChange={(val) => setPeriod(val)}>
                    <SelectTrigger className="border-none outline-none focus:outline-none">
                        <SelectValue placeholder="AM/PM" defaultValue={period} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                </Select>
                <Clock className="text-gray-500 cursor-pointer" onClick={() => setShowPicker((prev) => !prev)} size={18} />
            </div>

            <div
                className={clsx(
                    "absolute mt-1 w-full z-10 bg-white h-[200px] overflow-y-auto shadow-md border rounded transition-all duration-200 ease-in-out",
                    showPicker ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                )}
            >
                {Array.from({ length: 24 }, (_, i) => {
                    const hours = String(Math.floor(i / 2)).padStart(2, "0");
                    const minutes = i % 2 === 0 ? "00" : "30";
                    const time = `${hours}:${minutes}`;
                    return (
                        <div key={time} onClick={() => handleSelect(time)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {time}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TimePickerCustom;
