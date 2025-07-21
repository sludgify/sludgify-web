"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import clsx from "clsx";
import { ChevronDown, MapPin } from "lucide-react";

const PickupForm = () => {
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
        <form onSubmit={handleSubmit} className="font-radley grid grid-cols-2 gap-3">
            {/* Pickup Address */}
            <div className="col-span-2">
                <label className="block mb-1 font-medium">Pickup Address</label>
                <div className="flex w-full border border-[#525252] rounded-md px-3 py-2">
                    <input type="text" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} className="w-full focus:outline-none" required />
                    <MapPin />
                </div>
            </div>

            {/* Pickup Date */}
            <div>
                <label className="block mb-1 font-medium">Pickup Date</label>
                <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className="w-full border border-[#525252] rounded-md px-3 py-2 focus:outline-none" required />
            </div>

            {/* Pickup Time */}
            <div>
                <label className="block mb-1 font-medium">Pickup Time</label>
                <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} className="w-full border border-[#525252] rounded-md px-3 py-2 focus:outline-none" required />
            </div>

            {/* Sludge Volume */}
            <div>
                <label className="block mb-1 font-medium">Sludge Volume (liters)</label>
                <input type="number" name="sludgeVolume" value={formData.sludgeVolume} onChange={handleChange} className="w-full border border-[#525252] rounded-md px-3 py-2 focus:outline-none" required />
            </div>

            {/* Sludge Type */}
            <div className="relative">
                <label className="block mb-1 font-medium">Sludge Type</label>
                <select name="sludgeType" value={formData.sludgeType} onChange={handleChange} className="w-full appearance-none border border-[#525252] rounded-md px-3 pr-10 py-2 focus:outline-none" required>
                    <option value="">-- Select Type --</option>
                    <option value="B3">B3</option>
                    <option value="Non B3">Non B3</option>
                </select>

                <div className="pointer-events-none absolute top-9 right-3 text-gray-700">
                    <ChevronDown />
                </div>
            </div>

            {/* Notes (Optional) */}
            <div className="col-span-2">
                <label className="block mb-1 font-medium">Notes (optional)</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full border border-[#525252] rounded-md px-3 py- focus:outline-none" rows={4} />
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
            <Button type="submit" className="col-span-2 text-2xl text-white px-4 py-7 rounded-md">
                Submit Request
            </Button>
        </form>
    );
};

export default PickupForm;
