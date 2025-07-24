"use client";
import React, { use, useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { useMediaQuery } from "react-responsive";
import BackgroundResponsiveMobileLogin from "../../../public/responsive-login-mobile.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Group16 from "../../../public/Group 16.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
    const isXl = useMediaQuery({ minWidth: 1280 });
    const isLg = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
    const isMd = useMediaQuery({ minWidth: 640, maxWidth: 767 });
    const isSm = useMediaQuery({ minWidth: 465, maxWidth: 639 });
    const isDefault = useMediaQuery({ maxWidth: 464 });

    const { push } = useRouter();

    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: [],
    });

    const handleValidation = (errors: { email: string[] }) => {
        setFormErrors({
            email: errors.email || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (formData: FormData) => {
            console.log("Form data:", formData);
            const response = await axiosInstance.post("/sludgify/auth/reset-password/request", formData);
            return response.data;
        },

        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            const res = err.response;

            if (res?.status === 400 && res.data.errors) {
                handleValidation({
                    email: res.data.errors.email ?? [],
                });

                toast.error(res.data.message || "Validasi gagal");
                return;
            }

            toast.error(res?.data?.message || "Terjadi kesalahan saat mengirim email verifikasi");
            console.error("Email error:", res?.data);
        },

        onSuccess: (data) => {
            toast.success(data.message || "Email berhasil dikirim");
        },
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },

        onSubmit: (values, { setSubmitting }) => {
            try {
                const { email } = values;
                mutate({
                    email,
                } as FormData);
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (isSm || isMd || isDefault) {
        return (
            <div className="h-screen bg-cover bg-center pt-10" style={{ backgroundImage: `url(${BackgroundResponsiveMobileLogin.src})` }}>
                <Card
                    className={clsx("w-[80%] mx-auto", {
                        "h-[65%]": isMd,
                    })}
                >
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-center items-center gap-4">
                            <div className="flex flex-row items-center gap-2">
                                <Image src={Group16} alt="logo" width={28} height={15} />
                                <p className="text-sm font-semibold text-black">Sludgify</p>
                            </div>

                            <div className="flex items-center">
                                <div className="h-5 w-px bg-gray-400 mx-2" />
                                <p className="text-sm text-black">One Platform for ESG, Waste, and Carbon Impact</p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center space-y-1 ms-12 me-12">
                            <h1 className="text-xl font-radley">Please Enter Your Email </h1>
                        </div>
                        <form onSubmit={formik.isSubmitting ? () => {} : formik.handleSubmit}>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col mt-2">
                                    <Label htmlFor="email" className="text-sm font-normal">
                                        Email
                                    </Label>
                                    <Input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} className={`${(formErrors.email?.length ?? 0) > 0 ? "border-red-500" : "border-[#525252]"}`} />
                                </div>
                                {formErrors.email?.map((error, index) =>
                                    error === "IS_REQUIRED" ? (
                                        <p key={index} className="text-red-500 text-sm">
                                            email is required
                                        </p>
                                    ) : null
                                )}
                                {formErrors.email?.map((error, index) =>
                                    error === "IS_INVALID" ? (
                                        <p key={index} className="text-red-500 text-sm">
                                            email is invalid
                                        </p>
                                    ) : null
                                )}
                                <Button type="submit" className="w-full mt-4">
                                    Send Reset Password Link
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isLg || isXl) {
        return (
            <div className="flex h-screen w-screen">
                <div className="flex w-1/2 items-center justify-center relative">
                    <div className="absolute top-7 left-7 flex items-center gap-2 h-10 text-black">
                        <Image src={"/logo.svg"} width={isXl ? 50 : 30} height={isXl ? 50 : 30} alt="logo"></Image>
                        <h1 className={`${isXl ? "text-4xl" : "text-2xl"}`}>Sludgify</h1>
                        <Separator orientation="vertical" className="w-[10px] h-full bg-black mx-4" />
                        <p className={`${isXl ? "text-md" : "text-sm"}`}>
                            One Platform for ESG, Waste, <br /> and Carbon Impact
                        </p>
                    </div>
                    <div className="flex justify-center items-center p-12">
                        <div className=" space-y-4 w-[446px]">
                            <div className="text-center space-y-1  font-radley">
                                <h1 className={`${isXl ? "text-4xl" : "text-2xl"}`}>Please Enter Your Email </h1>
                            </div>
                            <form className={`space-y-5 ${isXl ? "" : "me-15 ms-15"}`} onSubmit={formik.isSubmitting ? () => {} : formik.handleSubmit}>
                                <div>
                                    <label className="block text-sm text-gray-900 mb-2">Email </label>
                                    <input
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        type="email"
                                        className={clsx((formErrors.email?.length ?? 0) > 0 ? "border-red-500" : "border-[#525252]", "w-full p-2 border rounded-md focus:outline-none")}
                                    />
                                    {formErrors.email?.map((error, index) =>
                                        error === "IS_REQUIRED" ? (
                                            <p key={index} className="text-red-500 text-sm">
                                                email is required
                                            </p>
                                        ) : null
                                    )}
                                    {formErrors.email?.map((error, index) =>
                                        error === "IS_INVALID" ? (
                                            <p key={index} className="text-red-500 text-sm">
                                                email is invalid
                                            </p>
                                        ) : null
                                    )}
                                </div>

                                <button type="submit" className="w-full bg-primary font-radley text-white py-2 px-6 rounded-md ">
                                    Send Reset Password Link
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <Image src={"/bg-auth.svg"} alt="Background Auth" width={800} height={800} className="absolute right-0 top-0 h-screen w-[50vw] object-cover" />
            </div>
        );
    }
}
