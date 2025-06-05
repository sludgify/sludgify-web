"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

const PickupForm = () => {
    const [formData, setFormData] = useState({
        pickupAddress: "",
        pickupDate: "",
        pickupTime: "",
        sludgeVolume: "",
        sludgeType: "",
        notes: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                <input type="text" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} className="w-full border border-black rounded-xl px-3 py-2" required />
            </div>

            {/* Pickup Date */}
            <div>
                <label className="block mb-1 font-medium">Pickup Date</label>
                <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className="w-full border border-black rounded-xl px-3 py-2" required />
            </div>

            {/* Pickup Time */}
            <div>
                <label className="block mb-1 font-medium">Pickup Time</label>
                <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} className="w-full border border-black rounded-xl px-3 py-2" required />
            </div>

            {/* Sludge Volume */}
            <div>
                <label className="block mb-1 font-medium">Sludge Volume (liters)</label>
                <input type="number" name="sludgeVolume" value={formData.sludgeVolume} onChange={handleChange} className="w-full border border-black rounded-xl px-3 py-2" required />
            </div>

            {/* Sludge Type */}
            <div>
                <label className="block mb-1 font-medium">Sludge Type</label>
                <input type="text" name="sludgeType" value={formData.sludgeType} onChange={handleChange} className="w-full border border-black rounded-xl px-3 py-2" required />
            </div>

            {/* Notes (Optional) */}
            <div className="col-span-2">
                <label className="block mb-1 font-medium">Notes (optional)</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full border border-black rounded-xl px-3 py-2" rows={4} />
            </div>

            {/* Submit */}
            <Button type="submit" className="col-span-2 text-2xl text-white px-4 py-7 rounded-xl">
                Submit Request
            </Button>
        </form>
    );
};

export default PickupForm;
