"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { User } from "@/interfaces/user";
import { Company } from "@/interfaces/company";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        [field: string]: string[];
    };
}

interface PersonalInformationFormErrors {
    first_name: string[];
    last_name: string[];
    country: string[];
    position: string[];
    email: string[];
    phone_number: string[];
    avatar: string[];
}

interface CompanyInformationFormErrors {
    country: string[];
    position: string[];
    email: string[];
    phone_number: string[];
}

export default function Page() {
    const [userMe, setUserMe] = useState<User | null>(null);
    const [companyData, setCompanyData] = useState<Company | null>(null);

    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

    const [accessToken, setAccessToken] = useState<string | null>(null);

    const [formErrorsPersonalInformation, setFormErrorsPersonalInformation] = useState<PersonalInformationFormErrors>({
        first_name: [],
        last_name: [],
        country: [],
        position: [],
        email: [],
        phone_number: [],
        avatar: [],
    })

    const [formErrorsCompanyInformation, setFormErrorsCompanyInformation] = useState<CompanyInformationFormErrors>({
        country: [],
        position: [],
        email: [],
        phone_number: [],
    })

    const handleValidationPersonalInformation = (errors: PersonalInformationFormErrors) => {
        setFormErrorsPersonalInformation(errors);
    }

    const handleValidationCompanyInformation = (errors: CompanyInformationFormErrors) => {
        setFormErrorsCompanyInformation(errors);
    }

    const { mutate } = useMutation({
        mutationFn: async ({
            formData1,
            formData2,
        }: {
            formData1: FormData;
            formData2: FormData;
        }) => {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            };

            const personalInformationResponse = await axiosInstance.patch("/sludgify/user", formData1, { headers });
            const companyInformationResponse = await axiosInstance.patch("/sludgify/company-information", formData2, { headers });

            return { personalInformationResponse, companyInformationResponse };
        },
        onSuccess: ({ personalInformationResponse, companyInformationResponse }) => {
            const personalData = personalInformationResponse.data;
            const companyData = companyInformationResponse.data;
            toast.success('successfully updated profile');
        },

        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            toast.error(err.response?.data.message);
        },
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            personal: {
                first_name: userMe?.first_name || '',
                last_name: userMe?.last_name || '',
                country: userMe?.country || '',
                position: userMe?.position || '',
                email: userMe?.email || '',
                phone_number: userMe?.phone_number || '',
                avatar: null as File | null,
            },
            company: {
                country: companyData?.country || '',
                position: companyData?.position || '',
                email: companyData?.email || '',
                phone_number: companyData?.phone_number || '',
                address: companyData?.address || '',
            },
        },
        onSubmit: ({ personal, company }, { setSubmitting }) => {
            try {
                const formData1 = new FormData();
                formData1.append("first_name", personal.first_name);
                formData1.append("last_name", personal.last_name);
                formData1.append("country", personal.country);
                formData1.append("position", personal.position);
                formData1.append("email", personal.email);
                formData1.append("phone_number", personal.phone_number);
                if (personal.avatar) {
                    formData1.append("avatar", personal.avatar);
                }

                const formData2 = new FormData();
                formData2.append("country", company.country);
                formData2.append("position", company.position);
                formData2.append("email", company.email);
                formData2.append("phone_number", company.phone_number);
                formData2.append("address", company.address);

                mutate({ formData1, formData2 });
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    })

    useEffect(() => {
        const userMeCookie = Cookies.get("me-data");
        const companyCookie = Cookies.get("company-data");
        const accessTokenCookie = Cookies.get("accessToken");

        if (accessTokenCookie) {
            setAccessToken(accessTokenCookie);
        }
        if (userMeCookie && companyCookie) {
            try {
                const parsedMe = JSON.parse(userMeCookie) as User;
                const parsedCompany = JSON.parse(companyCookie) as Company;
                setUserMe(parsedMe);
                setCompanyData(parsedCompany);
            } catch (e) {
                console.error("❌ Gagal parse me-data cookie:", e);
            }
        }
    }, []);

    return (
        <div className="py-8 px-36 space-y-6">
            <form onSubmit={formik.handleSubmit} className="border flex gap-14 items-start max-w-[1077px] border-[#D9D9D9] rounded-md p-6">
                <div className="flex flex-col gap-4 w-[50%]">
                    <h1 className="text-primary text-xl font-bold">Personal Information</h1>
                    <h1>Edit or complete your personal information</h1>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" name="personal.first_name" value={formik.values.personal.first_name} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" name="personal.last_name" value={formik.values.personal.last_name} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="country">Country</label>
                            <input type="text" name="personal.country" value={formik.values.personal.country} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="position">Position</label>
                            <input type="text" name="personal.position" value={formik.values.personal.position} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="personal.email" value={formik.values.personal.email} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" name="personal.phone_number" value={formik.values.personal.phone_number} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                    </div>
                    <h1 className="text-primary text-xl font-bold">Company Information</h1>
                    <h1>Edit or complete your company information</h1>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="country">Country</label>
                            <input type="text" name="company.country" value={formik.values.company.country} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="position">Position</label>
                            <input type="text" name="company.position" value={formik.values.company.position} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="company.email" value={formik.values.company.email} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" name="company.phone_number" value={formik.values.company.phone_number} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                        <div className="flex flex-col col-span-2 gap-2">
                            <label htmlFor="address">Address</label>
                            <input type="text" name="company.address" value={formik.values.company.address} onChange={formik.handleChange} className="border border-black rounded-md px-3 py-2 focus:outline-none " />
                        </div>
                    </div>
                </div>

                <div className=" w-[330px]">
                    <div className="flex gap-2 items-center mt-4 min-h-[64px]">
                        <Image src={previewAvatar || userMe?.avatar || "/Ellipse 2.svg"} alt="Ellipse 2" width={50} height={50} />
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
                        <input
                            id="upload-photo"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            name="avatar"
                            onChange={(event) => {
                                const file = event.currentTarget.files?.[0];
                                if (file) {
                                    formik.setFieldValue("personal.avatar", file);
                                    setPreviewAvatar(URL.createObjectURL(file));
                                }
                            }}
                        />
                        <div className="grid grid-cols-2 gap-4 mt-2 font-radley">
                            <button type="button" className="bg-[#DC0000] text-white rounded-md py-2">
                                Delete
                            </button>
                            <label htmlFor="upload-photo" className="border border-black rounded-md py-2 text-center cursor-pointer">
                                Upload
                            </label>
                            <button type="submit" className="col-span-2 bg-black rounded-md text-white py-2">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
