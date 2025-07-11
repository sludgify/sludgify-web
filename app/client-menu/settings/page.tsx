"use client";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { User } from "@/interfaces/user";

interface Company {
    id: string;
    country: string;
    email: string;
    phone_number: string;
    position: string;
}

interface MeData {
    user: User;
    company: Company;
}

export default function Page() {
    const [userMe, setUserMe] = useState<MeData | null>(null);
    const [companyData, setCompanyData] = useState({});
    const [formData, setFormData] = useState({});
    const [photo, setPhoto] = useState();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const userMeCookie = Cookies.get("me-data");
        if (userMeCookie) {
            try {
                const parsed = JSON.parse(userMeCookie) as MeData;
                setUserMe(parsed);
            } catch (e) {
                console.error("❌ Gagal parse me-data cookie:", e);
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, isCompany: boolean) => {
        const { name, value } = e.target;
        if (isCompany) {
            setCompanyData((prev) => ({ ...prev, [name]: value }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDelete = () => {
        setPhoto(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Reset nilai input file
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const userForm = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                userForm.append(key, value as string | Blob);
            });
            if (photo) {
                userForm.append("avatar", photo);
            }

            await axiosInstance.patch("/sludgify/user", userForm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("user form: ", formData);
            console.log(Object.fromEntries(userForm.entries()));
            await axiosInstance.patch("/sludgify/user", userForm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const companyForm = new FormData();
            Object.entries(companyData).forEach(([key, value]) => {
                companyForm.append(key, value as string | Blob);
            });

            console.log(Object.fromEntries(companyForm.entries()));

            await axiosInstance.patch("/sludgify/company-information", companyForm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Failed to save data", err);
            alert("Failed to save data.");
        }
    };

    return (
        <div className="py-8 px-36 space-y-6">
            <div className="border flex gap-14 items-start max-w-[1077px] border-[#D9D9D9] rounded-md p-6">
                <div className="flex flex-col gap-4 w-[50%]">
                    <h1 className="text-primary text-xl font-bold">Personal Information</h1>
                    <h1>Edit or complete your personal information</h1>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" placeholder={userMe?.user.first_name || "none"} name="first_name" className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" placeholder={userMe?.user.last_name || "none"} name="last_name" className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="country">Country</label>
                            <input type="text" name="country" placeholder={userMe?.user.country || "none"} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="position">Position</label>
                            <input type="text" name="position" placeholder={userMe?.user.position || "none"} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder={userMe?.user.email || "none"} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" name="phone_number" placeholder={userMe?.user.phone_number || "none"} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                    </div>
                    <h1 className="text-primary text-xl font-bold">Company Information</h1>
                    <h1>Edit or complete your company information</h1>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="country">Country</label>
                            <input type="text" name="country" placeholder={userMe?.company.country || "none"} onChange={(e) => handleChange(e, true)} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="position">Position</label>
                            <input type="text" name="position" placeholder={userMe?.company.position || "none"} onChange={(e) => handleChange(e, true)} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder={userMe?.company.email || "none"} onChange={(e) => handleChange(e, true)} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" name="phone_number" placeholder={userMe?.company.phone_number || "none"} onChange={(e) => handleChange(e, true)} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col col-span-2 gap-2">
                            <label htmlFor="country">Country</label>
                            <input type="text" name="country" className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                    </div>
                </div>

                <div className=" w-[330px]">
                    <div className="flex gap-2 items-center mt-4 min-h-[64px]">
                        <Image src={userMe?.user.avatar || "/Ellipse 2.png"} alt="Ellipse 2" width={50} height={50} className="rounded-full w-[65px] h-[65px] object-cover object-top" />
                        <div className="overflow-hidden transition-all font-bold duration-300 whitespace-nowrap">
                            <h1 className="text-xl">Kim Gimyung</h1>
                            <p className="text-[#525252]">HSE Manager at PT Eco Solution</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 className="text-primary font-bold">Upload Your Image</h1>
                            <h1 className="text-[#525252]">Formats allowed are jpg and png. Image size up tp 10 MB</h1>
                        </div>
                        {photo && (
                            <p className="text-sm mb-2 italic text-gray-700">
                                Selected file: <span className="font-medium">{photo.name}</span>
                            </p>
                        )}

                        <input ref={fileInputRef} id="upload-photo" type="file" name="avatar" accept="image/png, image/jpeg" className="hidden" onChange={(e) => setPhoto(e?.target?.files[0])} />
                        <div className="grid grid-cols-2 gap-4 mt-2 font-radley">
                            <button type="button" onClick={handleDelete} className="bg-[#DC0000] text-white rounded-md py-2">
                                Delete
                            </button>
                            <label htmlFor="upload-photo" className="border border-black rounded-md py-2 text-center cursor-pointer">
                                Upload
                            </label>
                            <button type="button" onClick={handleSave} className="col-span-2 bg-black rounded-md text-white py-2">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
