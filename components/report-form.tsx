"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import Image from "next/image";
import clsx from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const ReportForm = () => {
    const [open, setOpen] = React.useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [formData, setFormData] = useState({
        companyName: "",
        industry: "",
        reportingType: "",
        reportingTime: "",
        internalDocuments: [] as File[],
        paymentMethod: "BCA",
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFormData((prev) => ({
            ...prev,
            internalDocuments: acceptedFiles,
        }));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc", ".docx"],
        },
        multiple: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, files } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files?.[0] : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleSelect = (val: string) => {
        setFormData((prev) => ({ ...prev, reportingType: val }));
        setShowPicker(false);
    };

    return (
        <form onSubmit={handleSubmit} className="font-calibri text-sm md:text-base justify-between text-[#525252] grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Company Name */}
            <div>
                <label className="block mb-1 font-medium">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border border-[#D9D9D9] rounded-md px-3 py-2 focus:outline-none" required />
            </div>

            {/* Industry / Sector */}
            <div>
                <label className="block mb-1 font-medium">Industry / Sector</label>
                <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="space-x-4 w-full border border-[#D9D9D9] rounded-md px-3 py-2 focus:outline-none" />
            </div>

            {/* Reporting Type */}
            <div>
                <label className="block mb-1 font-medium">Reporting Type</label>
                <div onClick={() => setShowPicker((prev) => !prev)} className="flex items-center justify-between w-full border border-[#D9D9D9] rounded-md px-3 py-2">
                    <h1>{formData.reportingType || "Select Reporting Type"}</h1>
                    <Image src="/icon-report.svg" alt="report" width={20} height={20} className="ml-2" />
                </div>
                <div
                    className={clsx(
                        "absolute mt-1 w-fit z-10 bg-white shadow-md border rounded transition-all duration-200 ease-in-out",
                        showPicker ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    )}
                >
                    {["Q1", "Q2", "Q3", "Annual"].map((val) => (
                        <div key={val} onClick={() => handleSelect(val)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {val}
                        </div>
                    ))}
                </div>
            </div>

            {/* Reporting Time */}
            <div>
                <label htmlFor="date" className="px-1">
                    Choose Pick Up Date
                </label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" id="date" className="w-full mt-1 justify-between font-normal">
                            {formData.reportingTime ? formData.reportingTime.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={formData.reportingTime ?? undefined}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setFormData((prev) => ({ ...prev, reportingTime: date ?? null }));
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Internal Documents */}
            <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Internal Documents</label>
                <div {...getRootProps()} className={`border  rounded-md h-[102px] p-3 text-center cursor-pointer ${isDragActive ? "border-gray-500 bg-gray-50" : "border-[#D9D9D9]"}`}>
                    <input {...getInputProps()} />
                    {formData.internalDocuments.length > 0 ? (
                        <ul className="list-disc list-inside text-left max-h-40 overflow-auto">
                            {formData.internalDocuments.map((file, index) => (
                                <li key={index}>
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex justify-between">
                            <p>EX: Company Profile, Annual Report, Environment Report, etc</p>
                            <Image src={"/upload.svg"} alt="upload" width={20} height={20} />
                        </div>
                    )}
                </div>
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

            <Button type="submit" className="md:col-span-2 cursor-pointer font-radley text-sm md:text-xl lg:text-2xl text-white py-3 md:px-4 md:py-7 rounded-md">
                {" "}
                Submit Report
            </Button>
        </form>
    );
};

export default ReportForm;
