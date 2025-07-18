"use client";
import React, { useState } from "react";
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
import Cookies from "js-cookie";
import { axiosInstance } from "@/lib/axios";
import { useMediaQuery } from 'react-responsive';

export default function Page() {
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const [showPassword, setShowPassword] = useState(false);
    const { push } = useRouter();

    const [formErrors, setFormErrors] = useState<FormErrors>({
        first_name: [],
        last_name: [],
        company_name: [],
        email: [],
        password: [],
        confirm_password: [],
        password_security: [],
        password_match: [],
    });

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await axiosInstance.post("sludgify/login", {
                    provider: "google",
                    token: tokenResponse.access_token,
                });
                toast.success(response.data.message);
            } catch (err) {
                const error = err as AxiosError<ErrorResponse>;
                toast.error(error.response?.data.message);
            }
        },
    });

    const handleValidation = (errors: { email: string[]; password: string[]; confirm_password: string[]; first_name: string[]; last_name: string[]; company_name: string[]; password_security: string[]; password_match: string[] }) => {
        setFormErrors({
            first_name: errors.first_name || [],
            last_name: errors.last_name || [],
            company_name: errors.company_name || [],
            email: errors.email || [],
            password: errors.password || [],
            confirm_password: errors.confirm_password || [],
            password_security: errors.password_security || [],
            password_match: errors.password_match || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axiosInstance.post("/sludgify/login", formData);
            return response.data;
        },

        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            const res = err.response;

            if (res?.status === 400 && res.data.errors) {
                handleValidation({
                    first_name: res.data.errors.first_name ?? [],
                    last_name: res.data.errors.last_name ?? [],
                    company_name: res.data.errors.company_name ?? [],
                    email: res.data.errors.email ?? [],
                    password: res.data.errors.password ?? [],
                    confirm_password: res.data.errors.confirm_password ?? [],
                    password_security: res.data.errors.password_security ?? [],
                    password_match: res.data.errors.password_match ?? [],
                });

                toast.error(res.data.message || "Validasi gagal");
                return;
            }

            toast.error(res?.data?.message || "Terjadi kesalahan saat login");
            console.error("Login error:", res?.data);
        },

        onSuccess: (data) => {
            toast.success(data.message || "Login berhasil");
            Cookies.set("accessToken", data.token.access_token);
            setTimeout(() => {
                push("/client-menu");
            }, 1000);
        },
    });

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            company_name: "",
            email: "",
            password: "",
            confirm_password: "",
            provider: "auth_internal",
        },

        onSubmit: (values, { setSubmitting }) => {
            try {
                const { first_name, last_name, company_name, email, password, confirm_password } = values;
                mutate({
                    first_name,
                    last_name,
                    company_name,
                    email,
                    password,
                    confirm_password,
                    provider: "auth_internal",
                } as FormData);
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (isDesktop) {
        return (
            <div className="flex h-screen w-screen">
                <div className="flex w-1/2 items-center justify-center relative"><div className="absolute top-7 left-7 flex items-center gap-2 h-10 text-black  ">
                        <Image src={"/logo.svg"} width={50} height={50} alt="logo"></Image>
                        <h1 className="text-4xl">Sludgify</h1>
                        <Separator orientation="vertical" className="w-[10px] h-full bg-black mx-4" />
                        <p>
                            One Platform for ESG, Waste, <br /> and Carbon Impact
                        </p>
                    </div>
                    <div className="mt-10 flex justify-center items-center p-12">
                        <div className="right-0 space-y-2 w-[446px] h-[582px]">
                            <div className="text-center space-y-1">
                                <h1 className="text-4xl">Welcome Back!</h1>
                                <h2>Kindly enter your email address and password to sign in</h2>
                            </div>
                            <form className="space-y-5" onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                                <div>
                                    <label className="block text-sm text-gray-900 mb-2">Email </label>
                                    <input
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        type="email"
                                        className={clsx(formErrors.email.length > 0 ? "border-red-500" : "border-primary", "w-full p-2 border rounded-md focus:outline-none")}
                                    />
                                    {formErrors.email.map((error, index) =>
                                        error === "FIELD_REQUIRED" ? (
                                            <p key={index} className="text-red-500 text-sm">
                                                email is required
                                            </p>
                                        ) : null
                                    )}
                                    {formErrors.email.map((error, index) =>
                                        error === "FIELD_INVALID" ? (
                                            <p key={index} className="text-red-500 text-sm">
                                                email is invalid
                                            </p>
                                        ) : null
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-900 mb-2">Password</label>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            type={showPassword ? "text" : "password"}
                                            className={clsx(
                                                formErrors.password.length > 0 || formErrors.password_security.length > 0 || formErrors.password_match.length > 0 ? "border-red-500" : "border-primary",
                                                "w-full p-2 border rounded-md focus:outline-none"
                                            )}
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            {showPassword ? <Lock className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-primary" />}
                                        </button>
                                    </div>
                                    {formErrors.password.map((error, index) =>
                                        error === "FIELD_REQUIRED" ? (
                                            <p key={index} className="text-red-500 text-sm">
                                                password is required
                                            </p>
                                        ) : null
                                    )}
                                    {formErrors.password_security.map((error, index) => (
                                        <p key={index} className="text-red-500 text-sm">
                                            {error === "NO_CAPITAL" && "Password harus memiliki huruf kapital"}
                                            {error === "NO_SYMBOL" && "Password harus memiliki simbol"}
                                        </p>
                                    ))}
                                    {formErrors.password_match.map((error, index) =>
                                        error === "IS_MISMATCH" ? (
                                            <p key={index} className="text-red-500 text-sm">
                                                password is not match
                                            </p>
                                        ) : null
                                    )}
                                </div>

                                <Link href="#" className="text-sm text-primary mb-7">
                                    Forgot password?
                                </Link>

                                <button type="submit" className="w-full bg-primary mt-6 text-white py-2 px-6 rounded-md ">
                                    Sign In
                                </button>
                            </form>
                            <div className="my-3 flex items-center">
                                <div className="flex-1 border-t border-primary"></div>
                                <span className="px-4 text-sm text-gray-500">or</span>
                                <div className="flex-1 border-t border-primary"></div>
                            </div>
                            <button onClick={() => login()} className="w-full bg-primary border border-primary text-secondary py-2 px-6 rounded-md  flex items-center justify-center">
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>
                            <div className="flex items-center  gap-1 mt-6">
                                <p>Does not have an account?</p>
                                <Link href="/register" className="text-[#173863]">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Image src={"/bg-auth.svg"} alt="Background Auth" width={800} height={800} className="absolute right-0 top-0 h-screen w-[50vw] object-cover" />
            </div>
        );
    }
}