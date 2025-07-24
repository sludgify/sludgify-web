"use client";
import React, { use, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { useMediaQuery } from "react-responsive";
import BackgroundResponsiveMobileLogin from "../../../public/responsive-login-mobile.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Group16 from "../../../public/Group 16.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function Page() {
    const isXl = useMediaQuery({ minWidth: 1280 });
    const isLg = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
    const isMd = useMediaQuery({ minWidth: 640, maxWidth: 767 });
    const isSm = useMediaQuery({ minWidth: 465, maxWidth: 639 });
    const isDefault = useMediaQuery({ maxWidth: 464 });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    console.log("Token from search params:", token);

    const { push } = useRouter();

    const [formErrors, setFormErrors] = useState<FormErrors>({
        new_password: [],
        confirm_password: [],
    });

    const handleValidation = (errors: { new_password: string[]; confirm_password: string[] }) => {
        setFormErrors({
            new_password: errors.new_password || [],
            confirm_password: errors.confirm_password || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (formData: FormData) => {
            console.log("Form data:", formData);
            const response = await axiosInstance.patch(`/sludgify/auth/reset-password/password-changed/${token}`, formData);
            return response.data;
        },

        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            const res = err.response;

            if (res?.status === 400 && res.data.errors) {
                handleValidation({
                    new_password: res.data.errors.email ?? [],
                    confirm_password: res.data.errors.email ?? [],
                });

                toast.error(res.data.message || "Validasi gagal");
                return;
            }

            toast.error(res?.data?.message || "Terjadi kesalahan saat reset password");
            console.error("Reset error:", res?.data);
        },

        onSuccess: (data) => {
            toast.success(data.message || "Berhasil Reset Password");
            setTimeout(() => {
                push("/login");
            }, 2000);
        },
    });

    const formik = useFormik({
        initialValues: {
            new_password: "",
            confirm_password: "",
        },

        onSubmit: (values, { setSubmitting }) => {
            try {
                const { new_password, confirm_password } = values;
                mutate({
                    new_password,
                    confirm_password,
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
                        <div className="text-center space-y-1 mb-8">
                            <h1 className="text-xl font-radley">Enter and Confirm Your <br /> New Password </h1>
                        </div>
                        <form onSubmit={formik.isSubmitting ? () => {} : formik.handleSubmit}>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col">
                                    <Label htmlFor="new Password" className="text-sm font-normal">
                                        New Password
                                    </Label>
                                    <div className={clsx((formErrors.new_password?.length ?? 0) > 0 ? "border-red-500" : "border-[#525252]", "w-full flex p-2 border rounded-md focus:outline-none")}>
                                        <input name="new_password" value={formik.values.new_password} onChange={formik.handleChange} type={showNewPassword ? "text" : "password"} className="w-full focus:outline-none" />
                                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="text-gray-400 hover:text-gray-600">
                                            {showNewPassword ? <Lock className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-primary" />}
                                        </button>
                                    </div>
                                </div>
                                {formErrors.new_password?.map((error, index) =>
                                    error === "IS_REQUIRED" ? (
                                        <p key={index} className="text-red-500 text-sm">
                                            new_password is required
                                        </p>
                                    ) : null
                                )}
                                {formErrors.new_password?.map((error, index) =>
                                    error === "IS_INVALID" ? (
                                        <p key={index} className="text-red-500 text-sm">
                                            new_password is invalid
                                        </p>
                                    ) : null
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col mt-2">
                                    <Label htmlFor="new Password" className="text-sm font-normal">
                                        Confirm Password
                                    </Label>
                                    <div className={clsx((formErrors.confirm_password?.length ?? 0) > 0 ? "border-red-500" : "border-[#525252]", "w-full flex p-2 border rounded-md focus:outline-none")}>
                                        <input name="confirm_password" value={formik.values.confirm_password} onChange={formik.handleChange} type={showPassword ? "text" : "password"} className="w-full focus:outline-none" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                                            {showPassword ? <Lock className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-primary" />}
                                        </button>
                                    </div>
                                </div>
                                {formErrors.confirm_password?.map((error, index) =>
                                    error === "IS_REQUIRED" ? (
                                        <p key={index} className="text-red-500 text-sm">
                                            confirm_password is required
                                        </p>
                                    ) : null
                                )}
                                {formErrors.confirm_password?.map((error, index) =>
                                    error === "IS_INVALID" ? (
                                        <p key={index} className="text-red-500 text-sm">
                                            confirm_password is invalid
                                        </p>
                                    ) : null
                                )}
                                <button type="submit" className="w-full bg-primary mt-6 font-radley text-white py-2 px-6 rounded-md ">
                                    Reset Password
                                </button>
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
                    <div className="h-screen w-full flex items-center justify-center p-12">
                        <div className="space-y-2 w-[446px]">
                            <div className="text-center space-y-1  font-radley">
                                <h1 className={`${isXl ? "text-4xl" : "text-2xl"}`}>Enter and Confirm Your New Password </h1>
                            </div>
                            <form className={`space-y-5 ${isXl ? "" : "me-15 ms-15"}`} onSubmit={formik.isSubmitting ? () => {} : formik.handleSubmit}>
                                <div>
                                    <label className="block text-sm text-gray-900 mb-2">New Password </label>
                                    <div className={clsx((formErrors.new_password?.length ?? 0) > 0 ? "border-red-500" : "border-[#525252]", "w-full flex p-2 border rounded-md focus:outline-none")}>
                                        <input name="new_password" value={formik.values.new_password} onChange={formik.handleChange} type={showNewPassword ? "text" : "password"} className="w-full focus:outline-none" />
                                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="text-gray-400 hover:text-gray-600">
                                            {showNewPassword ? <Lock className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-primary" />}
                                        </button>
                                    </div>
                                    {formErrors.new_password?.map((error, index) =>
                                        error === "IS_REQUIRED" ? (
                                            <p key={index} className="text-red-500 text-sm">
                                                new_password is required
                                            </p>
                                        ) : null
                                    )}
                                    {formErrors.new_password?.map((error, index) =>
                                        error === "IS_INVALID" ? (
                                            <p key={index} className="text-red-500 text-sm">
                                                new_password is invalid
                                            </p>
                                        ) : null
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-900 mb-2">Confirm Password </label>
                                    <div className={clsx((formErrors.confirm_password?.length ?? 0) > 0 ? "border-red-500" : "border-[#525252]", "w-full flex p-2 border rounded-md focus:outline-none")}>
                                        <input name="confirm_password" value={formik.values.confirm_password} onChange={formik.handleChange} type={showPassword ? "text" : "password"} className="w-full focus:outline-none" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                                            {showPassword ? <Lock className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-primary" />}
                                        </button>
                                    </div>

                                    {formErrors.confirm_password?.map((error, index) =>
                                        error === "IS_REQUIRED" ? (
                                            <p key={index} className="text-red-500 text-sm">
                                                confirm_password is required
                                            </p>
                                        ) : null
                                    )}
                                    {formErrors.confirm_password?.map((error, index) =>
                                        error === "IS_INVALID" ? (
                                            <p key={index} className="text-red-500 text-sm">
                                                new_password is invalid
                                            </p>
                                        ) : null
                                    )}
                                </div>

                                <button type="submit" className="w-full bg-primary mt-6 font-radley text-white py-2 px-6 rounded-md ">
                                    Reset Password
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
