"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import Image from "next/image";
import clsx from "clsx";

const ReportForm = () => {
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

    return (
        <form onSubmit={handleSubmit} className="font-radley grid grid-cols-2 gap-3">
            {/* Company Name */}
            <div>
                <label className="block mb-1 font-medium">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border border-black rounded-md px-3 py-2 focus:outline-none" required />
            </div>

            {/* Industry / Sector */}
            <div>
                <label className="block mb-1 font-medium">Industry / Sector</label>
                <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="space-x-4 w-full border border-black rounded-md px-3 py-2 focus:outline-none" />
            </div>

            {/* Reporting Type */}
            <div>
                <label className="block mb-1 font-medium">Reporting Type</label>
                <div className="flex items-center justify-between w-full border border-black rounded-md px-3 py-2">
                    <select name="reportingType" value={formData.reportingType} onChange={handleChange} className="border-none appearance-none focus:outline-none pl-3 pr-6 w-full" required>
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                        <option value="Annual">Annual</option>
                    </select>
                    <Image src="/icon-report.svg" alt="report" width={20} height={20} className="ml-2" />
                </div>
            </div>

            {/* Reporting Time */}
            <div>
                <label className="block mb-1 font-medium">Reporting Time</label>
                <input type="date" name="reportingTime" value={formData.reportingTime} onChange={handleChange} className="w-full border border-black rounded-md  px-3 py-2 focus:outline-none" required />
            </div>

            {/* Internal Documents */}
            <div className="col-span-2">
                <label className="block mb-1 font-medium">Internal Documents</label>
                <div {...getRootProps()} className={`border  rounded-md h-[102px] p-3 text-center cursor-pointer ${isDragActive ? "border-gray-500 bg-gray-50" : "border-black"}`}>
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

            <Button type="submit" className=" col-span-2 text-2xl text-white px-4 py-7 rounded-md">
                Submit Report
            </Button>
        </form>
    );
};

export default ReportForm;
