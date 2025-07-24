"use client";
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ChevronDown, Clock, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "./ui/input";
import TimePickerCustom from "./time-picker";

const PickupForm = () => {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState({
        pickupAddress: "",
        pickupDate: "",
        pickupTime: "",
        sludgeVolume: "",
        sludgeType: "",
        notes: "",
        paymentMethod: "BCA",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="font-calibri text-sm md:text-base justify-between text-[#525252] grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Pickup Address */}
            <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Set Pick Up Address</label>
                <div className="flex w-full border border-[#D9D9D9] rounded-md px-3 py-2">
                    <input type="text" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} className="w-full focus:outline-none" required />
                    <MapPin />
                </div>
            </div>

            {/* Pickup Date */}
            <div className="">
                <label htmlFor="date" className="px-1">
                    Choose Pick Up Date
                </label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" id="date" className="w-full mt-1 justify-between font-normal">
                            {formData.pickupDate ? formData.pickupDate.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={formData.pickupDate ?? undefined}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setFormData((prev) => ({ ...prev, pickupDate: date ?? null }));
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Pickup Time */}
            <div>
                <label className="block mb-1 font-medium">Choose Pick Up Times</label>
                <TimePickerCustom />
            </div>

            {/* Sludge Volume */}
            <div>
                <label className="block mb-1 font-medium">Sludge Volume (Ton)</label>
                <Input type="number" name="sludgeVolume" value={formData.sludgeVolume} onChange={handleChange} className="w-full border border-[#D9D9D9] rounded-md px-3 py-1.5 focus:outline-none bg-background appearance-none" required />
            </div>

            {/* Sludge Type */}
            <div>
                <label className="block mb-1 font-medium">Sludge Type</label>
                <Select value={formData.sludgeType} onValueChange={(value) => setFormData((prev) => ({ ...prev, sludgeType: value }))}>
                    <SelectTrigger className="border border-[#D9D9D9] rounded-md px-3 py-2 text-base w-full">
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="B3">B3</SelectItem>
                        <SelectItem value="Non-B3">Non-B3</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Notes (Optional) */}
            <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Notes (optional)</label>
                <textarea name="notes" value={formData.notes} placeholder="Put Your Notes Here" onChange={handleChange} className="w-full border border-[#D9D9D9] rounded-md px-3 py- focus:outline-none" rows={4} />
            </div>

            {/* Payment Methods */}
            <div>
                <h1>Payment Methods</h1>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className={clsx("w-fit border border-[#D9D9D9] rounded-md px-3 py-2", formData.paymentMethod === "BCA" && "border-black")}
                        onClick={() => {
                            setFormData((prev) => ({ ...prev, paymentMethod: "BCA" }));
                        }}
                    >
                        <Image src={"/bca.svg"} alt={"pickup"} width={50} height={50} />
                    </button>
                    <button
                        type="button"
                        className={clsx("w-fit border border-[#D9D9D9] rounded-md px-3 py-2", formData.paymentMethod === "Seabank" && "border-black")}
                        onClick={() => {
                            setFormData((prev) => ({ ...prev, paymentMethod: "Seabank" }));
                        }}
                    >
                        <Image src={"/seabank.svg"} alt={"pickup"} width={50} height={50} />
                    </button>
                </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="md:col-span-2 cursor-pointer font-radley text-sm md:text-xl lg:text-2xl text-white py-3 md:px-4 md:py-7 rounded-md">
                Submit Request
            </Button>
        </form>
    );
};

export default PickupForm;
