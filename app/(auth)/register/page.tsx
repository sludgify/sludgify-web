"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";

export default function Page() {
    const { push } = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
                const response = await axiosInstance.post("/short.me/login", {
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
        mutationFn: async (data: FormData) => {
            console.log("data", data);
            const response = await axiosInstance.post("/sludgify/register", data);
            console.log("response", response);
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    first_name: err.response?.data?.errors?.first_name ?? [],
                    last_name: err.response?.data?.errors?.last_name ?? [],
                    company_name: err.response?.data?.errors?.company_name ?? [],
                    email: err.response?.data?.errors?.email ?? [],
                    password: err.response?.data?.errors?.password ?? [],
                    confirm_password: err.response?.data?.errors?.confirm_password ?? [],
                    password_security: err.response?.data?.errors?.password_security ?? [],
                    password_match: err.response?.data?.errors?.password_match ?? [],
                });
                console.log(err?.response?.data);
                toast.error(err?.response?.data?.message);
                return;
            }
            console.log(err?.response?.data?.message);
            toast(err?.response?.data?.message);
            return;
        },
        onSuccess: async (data) => {
            const dataApi = data.data;
            console.log("dataApi: ", dataApi);
            toast(dataApi.message);
            push(`/sludgify/auth/account-active/status/${dataApi.token.token_web}`);
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

    return (
        <div className="flex font-radley h-screen w-screen p-7">
            <div className="flex flex-col justify-center items-center w-[50vw]">
                <div className="absolute top-7 left-7 flex items-center gap-2  text-white text-4xl ">
                    <Image src={"/logo.svg"} width={50} height={50} alt="logo"></Image>
                    <h1>Sludgify</h1>
                </div>
                <div className=" flex justify-end items-center mr-[10%]">
                    <div className="bg-white right-0 space-y-2 rounded-[25px] p-12  w-[500px] h-[652px]">
                        <h1 className="text-4xl">Create Account</h1>
                        <form className="grid grid-cols-2 gap-2 " onSubmit={formik.isSubmitting ? () => {} : formik.handleSubmit}>
                            <div>
                                <label className="block text-sm text-gray-900 mb-2">First Name </label>
                                <input
                                    name="first_name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    type="text"
                                    className={clsx(formErrors.first_name.length > 0 ? "border-red-500" : "border-primary", "w-full p-2 border rounded-md focus:outline-none")}
                                />
                                {formErrors.first_name.map((error, index) => (
                                    <p key={index} className="text-red-500 text-sm">
                                        {error === "FIELD_REQUIRED" && "First name is required"}
                                        {error === "TOO_SHORT" && "First name is too short"}
                                    </p>
                                ))}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-900 mb-2">Last Name </label>
                                <input
                                    name="last_name"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    type="text"
                                    className={clsx(formErrors.last_name.length > 0 ? "border-red-500" : "border-primary", "w-full p-2 border rounded-md focus:outline-none")}
                                />
                                {formErrors.last_name.map((error, index) => (
                                    <p key={index} className="text-red-500 text-sm">
                                        {error === "FIELD_REQUIRED" && "Last name is required"}
                                        {error === "TOO_SHORT" && "Last name is too short"}
                                    </p>
                                ))}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-900 mb-2">Company Name </label>
                                <input
                                    name="company_name"
                                    value={formik.values.company_name}
                                    onChange={formik.handleChange}
                                    type="text"
                                    className={clsx(formErrors.company_name.length > 0 ? "border-red-500" : "border-primary", "w-full p-2 border rounded-md focus:outline-none")}
                                />
                                {formErrors.last_name.map((error, index) => (
                                    <p key={index} className="text-red-500 text-sm">
                                        {error === "FIELD_REQUIRED" && "Company name is required"}
                                        {error === "TOO_SHORT" && "Company name is too short"}
                                    </p>
                                ))}
                            </div>
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
                                <label className="block text-sm text-gray-900 mb-2">Create Password</label>
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
                            <div>
                                <label className="block text-sm text-gray-900 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        name="confirm_password"
                                        value={formik.values.confirm_password}
                                        onChange={formik.handleChange}
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={clsx(
                                            formErrors.confirm_password.length > 0 || formErrors.password_security.length > 0 || formErrors.password_match.length > 0 ? "border-red-500" : "border-primary",
                                            "w-full p-2 border rounded-md focus:outline-none"
                                        )}
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showConfirmPassword ? <Lock className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-primary" />}
                                    </button>
                                </div>
                                {formErrors.confirm_password.map((error, index) =>
                                    error === "FIELD_REQUIRED" ? (
                                        <p key={index} className="text-red-500 text-sm">
                                            confirm password is required
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

                            <Link href="#" className="text-sm text-primary col-span-2">
                                Forgot password?
                            </Link>

                            <button type="submit" className="w-full col-span-2 border border-primary text-primary py-3 px-6 rounded-md ">
                                Save & Continue
                            </button>
                        </form>
                        <div className="my-3 flex items-center">
                            <div className="flex-1 border-t border-primary"></div>
                            <span className="px-4 text-sm text-gray-500">or</span>
                            <div className="flex-1 border-t border-primary"></div>
                        </div>
                        <button onClick={() => login()} className="w-full bg-primary border border-primary text-secondary py-3 px-6 rounded-md  flex items-center justify-center">
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="flex items-center justify-center gap-1 mt-6">
                            <p>Already have an account?</p>
                            <Link href="/login" className="text-[#173863]">
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Image src={"/bg-auth.svg"} alt="Background Auth" width={800} height={800} className="absolute right-0 top-0 h-screen w-[50vw] object-cover" />
        </div>
    );
}
